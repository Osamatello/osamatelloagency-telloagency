'use client';

import { useI18n } from '@/lib/i18n/LanguageProvider';
import { useInView } from '@/lib/useInView';
import { cn } from '@/lib/utils';
import { SectionHead } from './SectionHead';

/**
 * Integrations — a slow two-row drift of recognizable platform marks,
 * resolving toward one operating layer without becoming a conventional logo grid.
 */
export function IntegrationRail() {
  const { dict } = useI18n();
  const t = dict.home.tools;
  const { ref, inView } = useInView();

  const mid = Math.ceil(t.items.length / 2);
  const rowA = t.items.slice(0, mid);
  const rowB = t.items.slice(mid);

  return (
    <div>
      <SectionHead label={t.eyebrow} title={t.title} lead={t.subtitle} />

      <div
        ref={ref}
        className={cn('reveal-fade mt-10 space-y-4 sm:mt-12', inView && 'is-in')}
      >
        <MarqueeRow items={rowA} reverse={false} />
        <MarqueeRow items={rowB} reverse />
      </div>

      <div className="mt-8 flex items-center gap-4 text-[0.68rem] font-medium uppercase tracking-[0.2em] text-ink-faint">
        <span className="h-px flex-1 bg-line" />
        <span className="whitespace-nowrap text-brand">{t.operatingLayer}</span>
        <span className="h-px flex-1 bg-line" />
      </div>
    </div>
  );
}

function MarqueeRow({ items, reverse }: { items: string[]; reverse: boolean }) {
  // Tripled so the -33.333% loop is seamless.
  const loop = [...items, ...items, ...items];
  return (
    <div className="mask-fade-edges overflow-hidden border-b border-line pb-4">
      <ul
        className={cn(
          'marquee-track flex w-max items-center gap-x-10 will-change-transform',
          reverse ? 'marquee-r' : 'marquee-l'
        )}
      >
        {loop.map((name, i) => (
          <li
            key={`${name}-${i}`}
            aria-label={name}
            className="flex items-center gap-x-10 text-brand/75"
          >
            <PlatformMark name={name} />
            <span aria-hidden="true" className="h-1 w-1 rounded-full bg-line" />
          </li>
        ))}
      </ul>
    </div>
  );
}

const ICON_PATHS: Record<string, string> = {
  OpenAI: '/integrations/openai.svg',
  Anthropic: '/integrations/anthropic.svg',
  n8n: '/integrations/n8n.svg',
  Make: '/integrations/make.svg',
  Zapier: '/integrations/zapier.svg',
  Vapi: '/integrations/vapi.svg',
  ElevenLabs: '/integrations/elevenlabs.svg',
  Gmail: '/integrations/gmail.svg',
  'Google Calendar': '/integrations/googlecalendar.svg',
  WhatsApp: '/integrations/whatsapp.svg',
  Slack: '/integrations/slack.svg',
  HubSpot: '/integrations/hubspot.svg',
  Salesforce: '/integrations/salesforce.svg',
  Stripe: '/integrations/stripe.svg',
};

function PlatformMark({ name }: { name: string }) {
  const source = ICON_PATHS[name];
  const wide = name === 'Vapi';

  return (
    <span
      aria-hidden="true"
      className={cn(
        'block shrink-0 bg-current transition-[color,transform] duration-300 hover:scale-110 hover:text-brand',
        wide ? 'h-5 w-16' : 'h-8 w-8'
      )}
      style={{
        WebkitMask: `url(${source}) center / contain no-repeat`,
        mask: `url(${source}) center / contain no-repeat`,
      }}
    />
  );
}
