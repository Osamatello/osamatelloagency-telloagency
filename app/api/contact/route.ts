import { NextResponse } from 'next/server';

/**
 * Contact form ingestion.
 *
 * The browser posts here; this route validates, normalises and stamps the
 * trusted metadata, then forwards to the n8n webhook which writes into the
 * Outreach CRM. The webhook URL and its shared secret stay server-side, so no
 * CRM or Supabase credential ever reaches the client bundle.
 */

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const MAX_BODY_BYTES = 16 * 1024;
const EMAIL_PATTERN = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

const LIMITS = {
  fullName: 200,
  email: 254,
  phone: 40,
  company: 200,
  service: 160,
  budget: 80,
  message: 3000,
} as const;

// Best-effort in-process throttle. Serverless instances are ephemeral and may
// scale out, so this trims obvious floods rather than guaranteeing a limit.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(key: string) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) {
    hits.forEach((stamps: number[], k: string) => {
      if (!stamps.some((t: number) => now - t < WINDOW_MS)) hits.delete(k);
    });
  }
  return recent.length > MAX_PER_WINDOW;
}

function clientIp(request: Request) {
  const forwarded = request.headers.get('x-forwarded-for');
  return (forwarded?.split(',')[0] ?? request.headers.get('x-real-ip') ?? 'unknown').trim();
}

const text = (value: unknown) => (typeof value === 'string' ? value.trim().replace(/\s+/g, ' ') : '');

// Instant lead alert to Telegram. Best-effort: a failure here is logged and
// never blocks the submission, which the CRM webhook already holds.
async function notifyTelegram(alert: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    console.warn('[contact] telegram skipped: TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is not set');
    return;
  }

  try {
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text: alert.slice(0, 4000), disable_web_page_preview: true }),
      signal: AbortSignal.timeout(8_000),
      cache: 'no-store',
    });
    if (!response.ok) {
      const detail = await response.text().catch(() => '');
      console.error('[contact] telegram rejected', response.status, detail.slice(0, 300));
    }
  } catch (error) {
    console.error('[contact] telegram unreachable', error);
  }
}

export async function POST(request: Request) {
  const webhook = process.env.N8N_CONTACT_WEBHOOK_URL;
  if (!webhook) {
    console.error('[contact] N8N_CONTACT_WEBHOOK_URL is not configured');
    return NextResponse.json({ error: 'SERVER_CONFIGURATION_ERROR' }, { status: 500 });
  }

  if (rateLimited(clientIp(request))) {
    return NextResponse.json({ error: 'RATE_LIMITED' }, { status: 429 });
  }

  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) {
    return NextResponse.json({ error: 'PAYLOAD_TOO_LARGE' }, { status: 413 });
  }

  let body: Record<string, unknown>;
  try {
    body = JSON.parse(raw) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: 'INVALID_JSON' }, { status: 400 });
  }

  // Honeypot: real people never fill a hidden field.
  if (text(body.website)) {
    return NextResponse.json({ ok: true }, { status: 202 });
  }

  const fullName = text(body.fullName).slice(0, LIMITS.fullName);
  const email = text(body.email).toLowerCase().slice(0, LIMITS.email);
  const phone = text(body.phone).slice(0, LIMITS.phone);
  const company = text(body.company).slice(0, LIMITS.company);
  const service = text(body.service).slice(0, LIMITS.service);
  const budget = text(body.budget).slice(0, LIMITS.budget);
  const message = typeof body.message === 'string' ? body.message.trim().slice(0, LIMITS.message) : '';
  const consent = body.consent === true;
  const language = body.language === 'ar' ? 'AR' : 'EN';

  const fields: string[] = [];
  if (!fullName) fields.push('fullName');
  if (!email || !EMAIL_PATTERN.test(email)) fields.push('email');
  if (!phone || phone.replace(/\D/g, '').length < 7) fields.push('phone');
  if (!service) fields.push('service');
  if (!budget) fields.push('budget');
  if (!message) fields.push('message');
  if (!consent) fields.push('consent');
  if (fields.length) {
    return NextResponse.json({ error: 'INVALID_PAYLOAD', fields }, { status: 400 });
  }

  // Server-generated — never trusted from the browser.
  const submittedAt = new Date().toISOString();

  const note = [
    'Website contact form — DAMASAVERO',
    `Submitted: ${submittedAt}`,
    `Language: ${language}`,
    `Requirement area: ${service}`,
    `Budget: ${budget}`,
    company ? `Company: ${company}` : null,
    'Consent: yes',
    '',
    'Message:',
    message,
  ]
    .filter((line) => line !== null)
    .join('\n')
    .slice(0, 4000);

  const payload = {
    full_name: fullName,
    email,
    phone,
    company_name: company || undefined,
    source: 'DAMASAVERO Website',
    source_detail: `Contact form · /contact · ${language}`.slice(0, 300),
    notes: note,
    requirement_area: service,
    budget,
    message,
    language,
    source_page: '/contact',
    submitted_at: submittedAt,
  };

  const alert = notifyTelegram(
    [
      'New website lead — DAMASAVERO',
      '',
      `Name: ${fullName}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      company ? `Company: ${company}` : null,
      `Service: ${service}`,
      `Budget: ${budget}`,
      `Language: ${language}`,
      `Submitted: ${submittedAt}`,
      '',
      'Message:',
      message,
    ]
      .filter((line) => line !== null)
      .join('\n'),
  );

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15_000);
    const response = await fetch(webhook, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        // Lets n8n reject anything that did not come from this server.
        ...(process.env.N8N_CONTACT_WEBHOOK_SECRET
          ? { 'x-damasavero-signature': process.env.N8N_CONTACT_WEBHOOK_SECRET }
          : {}),
        'idempotency-key': `damasavero-contact:${email}:${submittedAt}`,
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
      cache: 'no-store',
    });
    clearTimeout(timeout);

    if (!response.ok) {
      const detail = await response.text().catch(() => '');
      console.error('[contact] webhook rejected', response.status, detail.slice(0, 500));
      return NextResponse.json({ error: 'UPSTREAM_ERROR' }, { status: 502 });
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    console.error('[contact] webhook unreachable', error);
    return NextResponse.json({ error: 'UPSTREAM_UNAVAILABLE' }, { status: 502 });
  } finally {
    // Serverless can freeze once the response is sent; let the alert land first.
    await alert;
  }
}
