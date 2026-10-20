export interface ServiceDetail {
  slug: string;
  icon: string;
  name: string;
  tagline: string;
  metaTitle: string;
  metaDescription: string;
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
  };
  painPoints: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: { title: string; description: string }[];
  };
  solution: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: { title: string; description: string }[];
  };
  workflow: {
    eyebrow: string;
    title: string;
    subtitle: string;
    steps: { step: string; title: string; description: string }[];
  };
  benefits: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: { title: string; description: string }[];
  };
  faq: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: { q: string; a: string }[];
  };
  cta: {
    eyebrow: string;
    title: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
  };
}

export const services: ServiceDetail[] = [
  {
    slug: 'ai-automation',
    icon: 'Bot',
    name: 'AI Automation & Custom Software',
    tagline: 'Workflow automation and internal tools',
    metaTitle: 'AI Automation Services in Dubai & UAE',
    metaDescription:
      'AI voice agents, CRM automation, workflow automation and custom internal tools. Based in Dubai, building for businesses across the UAE and worldwide.',
    hero: {
      eyebrow: 'AI Automation',
      title: 'AI automation that runs the work behind your business',
      subtitle:
        'We build AI voice agents, CRM automation, workflow automation and custom internal tools — from Dubai, for companies across the UAE and worldwide — so enquiries, handoffs and follow-up move without anyone chasing them.',
    },
    painPoints: {
      eyebrow: 'The Problem',
      title: 'Your team is absorbing work software should handle',
      subtitle: 'Every day, hours of staff time disappear into steps a system could run on its own.',
      items: [
        { title: 'Missed calls and enquiries', description: 'An unanswered call is a customer who contacts a competitor instead. Most teams have no system that catches them after hours.' },
        { title: 'Manual scheduling and reminders', description: 'Confirming, rescheduling and reminding by hand consumes hours of coordination time every week.' },
        { title: 'Leads going cold', description: 'Enquiries from the website, WhatsApp and social channels sit unanswered while the team is busy with live work.' },
        { title: 'Information scattered across tools', description: 'Contacts, jobs and notes live in separate systems, so follow-up depends on whoever remembers to check.' },
      ],
    },
    solution: {
      eyebrow: 'The Solution',
      title: 'One connected automation layer across your tools',
      subtitle: 'AI agents, CRM workflows and integrations combined into a single system that runs continuously.',
      items: [
        { title: 'AI voice agents and chat', description: 'Answer calls and messages, qualify the request and capture details around the clock, in English and Arabic.' },
        { title: 'Scheduling automation', description: 'Automated booking, confirmations and reminders that cut no-shows and remove the back-and-forth.' },
        { title: 'WhatsApp and SMS follow-up', description: 'Reach people on the channels they already use, with follow-up that sends itself on the right trigger.' },
        { title: 'Unified CRM and records', description: 'Every enquiry, job and conversation lands in one connected system instead of four.' },
      ],
    },
    workflow: {
      eyebrow: 'How It Works',
      title: 'From first contact to closed loop, automated',
      subtitle: 'Each step runs on its own, and every step leaves a record.',
      steps: [
        { step: '01', title: 'Enquiry arrives', description: 'Someone calls, messages on WhatsApp, or submits a form on your website.' },
        { step: '02', title: 'AI agent responds', description: 'The agent answers immediately, qualifies the request and captures contact details.' },
        { step: '03', title: 'Routing or booking', description: 'The request is routed to the right person, or the customer books a slot directly.' },
        { step: '04', title: 'CRM updated', description: 'The record is written to your CRM automatically, with full context attached.' },
        { step: '05', title: 'Automated follow-up', description: 'Reminders and follow-up messages go out on schedule without anyone queuing them.' },
        { step: '06', title: 'Visible and reviewable', description: 'Every automated decision is logged, so the system can be checked and adjusted.' },
      ],
    },
    benefits: {
      eyebrow: 'Why It Matters',
      title: 'What changes once it is running',
      subtitle: 'Practical outcomes that compound as coverage widens.',
      items: [
        { title: 'Less manual admin', description: 'Repetitive handling moves to the system so your team spends its time on judgement work.' },
        { title: 'Round-the-clock coverage', description: 'Enquiries are answered and captured outside business hours, weekends included.' },
        { title: 'Faster response times', description: 'Instant, consistent replies turn more enquiries into real conversations.' },
        { title: 'One source of truth', description: 'A connected CRM keeps every lead, job and message in a single place.' },
      ],
    },
    faq: {
      eyebrow: 'FAQ',
      title: 'Common questions about AI automation',
      subtitle: 'Everything worth knowing before a consultation.',
      items: [
        { q: 'What is AI automation for a business?', a: 'AI automation uses software to handle repetitive operational work — answering enquiries, qualifying leads, updating the CRM, sending reminders and follow-up — so staff time goes to work that needs judgement. It sits on top of the tools a business already uses rather than replacing them.' },
        { q: 'Does DAMASAVERO work with businesses outside the UAE?', a: 'Yes. DAMASAVERO is based in Dubai and works across every emirate — Abu Dhabi, Sharjah, Ajman, Ras Al Khaimah, Fujairah and Umm Al Quwain — as well as with clients worldwide. Automation systems are built on top of cloud tools you already use, so delivery is remote by nature — location only affects how we schedule discovery and handover sessions, not what can be built.' },
        { q: 'Will AI replace my staff?', a: 'No. The automation handles repetitive handling so your team can focus on the work that needs a person. For anything carrying risk or cost, the system prepares the work and a person approves it.' },
        { q: 'Which tools do you integrate with?', a: 'We work with n8n, Make, Zapier, OpenAI, Anthropic, Vapi, ElevenLabs, Gmail, Google Calendar, WhatsApp, Slack, HubSpot, Salesforce and Stripe, plus most CRM and calendar systems. If a system exposes an API, a webhook or a database, it can usually be connected.' },
        { q: 'How long does an automation project take?', a: 'A single workflow typically takes 1–2 weeks. A full system with several connected workflows takes 3–6 weeks depending on scope and how many tools are involved.' },
      ],
    },
    cta: {
      eyebrow: 'Ready When You Are',
      title: 'Let’s automate the work behind your operation',
      subtitle: 'Book a free consultation and we will map where automation saves the most time.',
      primaryCta: 'Book a Free Consultation',
      secondaryCta: 'Explore Capabilities',
    },
  },
  {
    slug: 'website-development',
    icon: 'Globe',
    name: 'Website Design & Development',
    tagline: 'Modern, fast, conversion-focused sites',
    metaTitle: 'Business Website Design & Development in Dubai',
    metaDescription:
      'Fast, modern business websites and landing pages. Built to capture enquiries, perform on mobile and rank in search — from Dubai, for clients worldwide.',
    hero: {
      eyebrow: 'Website Development',
      title: 'A website that turns visitors into enquiries',
      subtitle:
        'We design and build business websites and landing pages for companies in Dubai, across the UAE and worldwide — fast, responsive, and built to capture leads, with search and performance foundations in place from day one.',
    },
    painPoints: {
      eyebrow: 'The Problem',
      title: 'Your current website is costing you enquiries',
      subtitle: 'Most business sites were built years ago and are quietly losing leads.',
      items: [
        { title: 'Slow and dated', description: 'A sluggish, old-looking site makes people question your work before they ever contact you.' },
        { title: 'No clear way to enquire', description: 'Visitors cannot contact or book easily, so they leave and go to whoever makes it simple.' },
        { title: 'Invisible in search', description: 'Without proper structure and metadata, you do not appear when people search for what you do in your city.' },
        { title: 'Broken on mobile', description: 'Most visits happen on a phone. A site that does not hold up on mobile loses the majority of its traffic.' },
      ],
    },
    solution: {
      eyebrow: 'The Solution',
      title: 'Built for conversion, not just appearance',
      subtitle: 'Sites that are fast, responsive, search-ready, and designed to turn visits into conversations.',
      items: [
        { title: 'Conversion-focused design', description: 'Clear calls to action and enquiry forms placed where people actually look.' },
        { title: 'Performance first', description: 'Optimised images, clean code and fast load times on every connection and device.' },
        { title: 'SEO foundations built in', description: 'Correct heading structure, metadata, canonicals and schema so search engines can read and rank the site.' },
        { title: 'Mobile-first and bilingual ready', description: 'Designed and tested on mobile first, with English and Arabic layouts supported where needed.' },
      ],
    },
    workflow: {
      eyebrow: 'How It Works',
      title: 'From first sketch to launched website',
      subtitle: 'A clear, collaborative process with no black boxes.',
      steps: [
        { step: '01', title: 'Discovery and structure', description: 'We map your services, the visitor journey, and the pages the site actually needs.' },
        { step: '02', title: 'Design and review', description: 'You review a design concept and refine it before any code is written.' },
        { step: '03', title: 'Build and optimise', description: 'We build a fast, responsive site with search foundations and accessible forms.' },
        { step: '04', title: 'Enquiry integration', description: 'Contact and booking forms are wired into your CRM, inbox or automation layer.' },
        { step: '05', title: 'Launch and measure', description: 'The site goes live with analytics in place and a structure that can keep growing.' },
      ],
    },
    benefits: {
      eyebrow: 'Why It Matters',
      title: 'A website that works as hard as you do',
      subtitle: 'Your site is the front desk that never closes.',
      items: [
        { title: 'More enquiries', description: 'A fast, clear site with an obvious next step converts more of the traffic you already have.' },
        { title: 'Credibility on arrival', description: 'A considered, modern design earns trust before anyone speaks to you.' },
        { title: 'Findable in search', description: 'Technical SEO foundations help you appear for the services people search for locally.' },
        { title: 'Built to extend', description: 'A modular structure means pages, services and languages can be added over time.' },
      ],
    },
    faq: {
      eyebrow: 'FAQ',
      title: 'Common questions about website projects',
      subtitle: 'Everything worth knowing before starting.',
      items: [
        { q: 'How long does a business website take to build?', a: 'A single landing page takes 1–2 weeks. A full multi-page business website takes 3–6 weeks depending on the number of pages, languages and integrations involved.' },
        { q: 'Do you build websites in Arabic as well as English?', a: 'Yes. We build bilingual sites with proper right-to-left layouts for Arabic, rather than a translated copy forced into a left-to-right design. We also build single-language sites for clients outside the region.' },
        { q: 'Is SEO included?', a: 'Technical SEO foundations are built into every site — heading structure, metadata, canonical URLs, sitemap, robots rules and structured data. Ongoing content and ranking work is a separate engagement.' },
        { q: 'Can we update the website ourselves?', a: 'Yes. Sites are built so your team can edit content without a developer, and we run a handover session covering how.' },
        { q: 'Do you redesign existing websites?', a: 'Yes. We either rebuild from scratch or redesign what exists, depending on the state of the current site and what is worth keeping.' },
      ],
    },
    cta: {
      eyebrow: 'Ready When You Are',
      title: 'Let’s build a website that brings you work',
      subtitle: 'Book a free consultation and tell us what the site needs to do.',
      primaryCta: 'Book a Free Consultation',
      secondaryCta: 'Explore Capabilities',
    },
  },
  {
    slug: 'lead-generation',
    icon: 'Search',
    name: 'AI Lead Finder & Generation',
    tagline: 'Find and enrich qualified leads',
    metaTitle: 'AI Lead Generation & CRM Automation in Dubai',
    metaDescription:
      'AI lead research, decision-maker discovery, email verification and automated outreach. Dubai-based, building pipeline for clients in the UAE and worldwide.',
    hero: {
      eyebrow: 'Lead Generation',
      title: 'A steady pipeline of qualified leads, on autopilot',
      subtitle:
        'We use AI to research decision-makers, verify contact details, enrich lead records and prepare automated outreach — so pipeline stops depending on referrals and word of mouth.',
    },
    painPoints: {
      eyebrow: 'The Problem',
      title: 'You cannot grow on word of mouth alone',
      subtitle: 'Without a system that finds and captures leads, growth stays unpredictable.',
      items: [
        { title: 'No predictable lead flow', description: 'With nothing generating pipeline, growth rises and falls with whoever happened to refer you this month.' },
        { title: 'Manual research is slow', description: 'Finding the right contacts and verifying their details by hand costs hours with no guarantee of a usable list.' },
        { title: 'Outreach is inconsistent', description: 'Leads get found but never contacted, or contacted far too late, because follow-up depends on free time.' },
        { title: 'Nothing to scale', description: 'When you want more volume, there is no system to turn up — only more hours.' },
      ],
    },
    solution: {
      eyebrow: 'The Solution',
      title: 'AI-driven research, enrichment and outreach',
      subtitle: 'Research, verification and sequencing combined into one system that keeps the pipeline moving.',
      items: [
        { title: 'AI lead research', description: 'Prospects and decision-makers are found against your target criteria, not a generic list.' },
        { title: 'Email discovery and verification', description: 'Contact details are discovered and verified before delivery, so outreach reaches real inboxes.' },
        { title: 'Lead enrichment', description: 'Each record is enriched with the context that makes outreach specific instead of generic.' },
        { title: 'CRM delivery', description: 'Enriched leads land in your CRM, organised and ready for automated or manual follow-up.' },
      ],
    },
    workflow: {
      eyebrow: 'How It Works',
      title: 'From target definition to outreach-ready leads',
      subtitle: 'A clear path from your ideal customer profile to real, verified contacts.',
      steps: [
        { step: '01', title: 'Target defined', description: 'You describe the companies and roles worth reaching, and what disqualifies a lead.' },
        { step: '02', title: 'AI research', description: 'The system finds matching organisations and the decision-makers inside them.' },
        { step: '03', title: 'Verification and enrichment', description: 'Contact details are verified and each record is enriched with usable context.' },
        { step: '04', title: 'CRM delivery', description: 'Enriched leads are written to your CRM, deduplicated against what is already there.' },
        { step: '05', title: 'Automated outreach', description: 'Sequences run automatically, or the list is handed to your team to work manually.' },
      ],
    },
    benefits: {
      eyebrow: 'Why It Matters',
      title: 'A pipeline that does not depend on luck',
      subtitle: 'Predictable lead generation is what makes growth plannable.',
      items: [
        { title: 'Steady lead flow', description: 'Research runs continuously, so pipeline keeps building beyond referrals.' },
        { title: 'Hours back every week', description: 'Manual finding and verifying is replaced by automated research and enrichment.' },
        { title: 'Outreach-ready records', description: 'Every lead arrives verified and enriched, ready to contact immediately.' },
        { title: 'Scales on demand', description: 'Need more volume? The same system runs wider without hiring for it.' },
      ],
    },
    faq: {
      eyebrow: 'FAQ',
      title: 'Common questions about lead generation',
      subtitle: 'Everything worth knowing before a consultation.',
      items: [
        { q: 'How does AI lead generation work?', a: 'AI tools research prospects against your criteria, identify the decision-makers inside each organisation, verify their contact details, and deliver enriched records into your CRM ready for outreach. The criteria and the disqualifiers are set by you.' },
        { q: 'Are the leads verified before delivery?', a: 'Yes. Contact details are verified before a record is delivered, so outreach reaches real people at working addresses rather than bouncing.' },
        { q: 'Do you handle the outreach as well?', a: 'Either way. We can build and run automated outreach sequences, or deliver enriched leads for your team to contact manually.' },
        { q: 'How many leads can you generate per month?', a: 'Volume depends entirely on how narrow your target market is. A tightly defined niche yields fewer but better-matched records. We agree realistic numbers during the consultation rather than promising a figure upfront.' },
        { q: 'Is this compliant with data and outreach rules?', a: 'We follow accepted practice for lead research and B2B outreach — honouring opt-outs and keeping records of consent where it applies. Because we work with clients worldwide, the rules that apply to your market and sector, such as GDPR in Europe, are confirmed before we build.' },
      ],
    },
    cta: {
      eyebrow: 'Ready When You Are',
      title: 'Let’s fill your pipeline with qualified leads',
      subtitle: 'Book a free consultation and tell us who you need to reach.',
      primaryCta: 'Book a Free Consultation',
      secondaryCta: 'Explore Capabilities',
    },
  },
];

export function getServiceBySlug(slug: string): ServiceDetail | undefined {
  return services.find((s) => s.slug === slug);
}
