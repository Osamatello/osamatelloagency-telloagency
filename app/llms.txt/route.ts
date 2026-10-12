import { services } from '@/lib/services-data';
import { articles } from '@/lib/articles-data';

export const dynamic = 'force-static';

/**
 * llms.txt — the emerging convention for telling AI crawlers and answer engines
 * what a site is, in a form they can read without parsing the whole DOM. Served
 * at /llms.txt as plain text.
 */
export function GET() {
  const site = 'https://damasavero.com';

  const body = `# DAMASAVERO

> AI automation and business systems company based in Dubai, United Arab Emirates, working with businesses across all seven emirates and with clients worldwide. DAMASAVERO designs and builds AI voice agents, CRM and lead automation, workflow automation, messaging and scheduling automation, and custom systems integration.

## What DAMASAVERO does

- AI voice agents that answer inbound calls, qualify callers and book or route them, in English and Arabic
- CRM and lead automation: record creation, enrichment, routing and automated follow-up
- Workflow automation across teams, departments and software
- Business systems integration connecting existing tools rather than replacing them
- Business websites and landing pages built for enquiries and search
- AI lead research, decision-maker discovery and verified contact enrichment

## Service area

Dubai, Abu Dhabi, Sharjah, Ajman, Ras Al Khaimah, Fujairah, Umm Al Quwain, the wider United Arab Emirates, and clients worldwide. Delivery is remote, because systems are built on top of cloud tools the client already uses.

## Typical engagement

A single automation workflow takes 1-2 weeks to build. A connected system spanning several workflows and tools takes 3-6 weeks. There are no fixed packages: cost is driven by the number of workflows, the number of integrations and the state of existing data, and is scoped during a free consultation.

## Platforms worked with

n8n, Make, Zapier, OpenAI, Anthropic, Vapi, ElevenLabs, Gmail, Google Calendar, WhatsApp, Slack, HubSpot, Salesforce, Stripe, and most CRM and calendar systems.

## Pages

- [Overview](${site}/): what DAMASAVERO builds and for whom
- [Who We Are](${site}/about): approach, principles and how engagements run
- [Capabilities](${site}/services): the six capability domains and how work runs
- [Articles](${site}/articles): practical writing on automation
- [Contact](${site}/contact): consultation enquiries

## Services

${services.map((s) => `- [${s.name}](${site}/services/${s.slug}): ${s.metaDescription}`).join('\n')}

## Articles

${articles.map((a) => `- [${a.title}](${site}/articles/${a.slug}): ${a.excerpt}`).join('\n')}

## Contact

Email: Founder@damasavero.com
Phone: +971 50 160 7600
Location: Dubai, United Arab Emirates
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
