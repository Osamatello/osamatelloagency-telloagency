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
    metaTitle: 'AI Automation & Custom Software for Clinics',
    metaDescription:
      'AI receptionists, CRM automation, appointment workflows, and custom dashboards built for modern clinics. Reduce manual work and grow faster.',
    hero: {
      eyebrow: 'AI Automation',
      title: 'AI automation that runs your clinic while you focus on patients',
      subtitle:
        'We build AI assistants, CRM automation, appointment workflows, and custom dashboards that handle repetitive work — so your team never misses a call, a lead, or a follow-up.',
    },
    painPoints: {
      eyebrow: 'The Problem',
      title: 'Your team is drowning in repetitive work',
      subtitle: 'Every day, hours of staff time disappear into tasks that software should handle.',
      items: [
        { title: 'Missed calls, lost patients', description: 'Every unanswered call is a patient who books with a competitor. Most clinics have no system to catch them.' },
        { title: 'Manual appointment juggling', description: 'Confirming, rescheduling, and reminding patients by hand eats hours of front-desk time every week.' },
        { title: 'Leeds slipping through the cracks', description: 'Inquiries from your website and social channels go cold while your team is busy with patients in the clinic.' },
        { title: 'Data scattered everywhere', description: 'Contact details, appointments, and notes live in different tools, making follow-up disorganized and unreliable.' },
      ],
    },
    solution: {
      eyebrow: 'The Solution',
      title: 'A connected automation system tailored to your clinic',
      subtitle: 'We combine AI assistants, CRM workflows, and smart automation into one system that works while you sleep.',
      items: [
        { title: 'AI receptionist & chatbots', description: 'Answer patient questions and capture leads 24/7, even outside business hours.' },
        { title: 'Appointment automation', description: 'Automated booking, confirmations, and reminders that reduce no-shows and save staff time.' },
        { title: 'WhatsApp & SMS follow-up', description: 'Reach patients where they already are with instant, automated follow-up messages.' },
        { title: 'Unified CRM', description: 'Every lead, appointment, and conversation organized in a single connected system.' },
      ],
    },
    workflow: {
      eyebrow: 'How It Works',
      title: 'A patient journey, fully automated',
      subtitle: 'From the first inquiry to the post-visit review request — every step handled by your automation system.',
      steps: [
        { step: '01', title: 'Patient inquiry', description: 'A visitor asks a question through your website chatbot or WhatsApp.' },
        { step: '02', title: 'AI receptionist', description: 'The AI answers, qualifies the patient, and captures their contact details.' },
        { step: '03', title: 'Calendar booking', description: 'The patient is shown available slots and books directly — no staff involvement.' },
        { step: '04', title: 'CRM update', description: 'The new appointment and patient record are saved to your CRM automatically.' },
        { step: '05', title: 'Automated follow-up', description: 'Reminders are sent before the visit; a follow-up message checks in after.' },
        { step: '06', title: 'Review request', description: 'Happy patients receive an automated review request, building your online reputation.' },
      ],
    },
    benefits: {
      eyebrow: 'Why It Matters',
      title: 'Real outcomes for your clinic',
      subtitle: 'Practical results that save time and support steady, predictable growth.',
      items: [
        { title: '40%+ less manual admin', description: 'Automation handles repetitive tasks so your team focuses on patient care.' },
        { title: '24/7 patient coverage', description: 'Your AI receptionist answers inquiries and captures leads around the clock.' },
        { title: '2x faster lead response', description: 'Instant replies turn more inquiries into booked appointments.' },
        { title: 'Organized patient data', description: 'A connected CRM keeps every lead, appointment, and message in one place.' },
      ],
    },
    faq: {
      eyebrow: 'FAQ',
      title: 'Common questions about AI automation',
      subtitle: 'Everything you need to know before booking a consultation.',
      items: [
        { q: 'What does AI automation mean for my clinic?', a: 'AI automation uses software to handle repetitive tasks like appointment reminders, lead follow-up, and patient communication, so your team can focus on care.' },
        { q: 'Will the AI replace my front-desk staff?', a: 'No. The AI handles repetitive tasks so your staff can focus on in-person patient care. It augments your team, it does not replace them.' },
        { q: 'What tools do you integrate with?', a: 'We work with n8n, OpenAI, Vapi, ElevenLabs, Google, HubSpot, and most CRM and calendar systems. If you use a specific tool, ask us during the consultation.' },
        { q: 'How long does an automation project take?', a: 'A single workflow typically takes 1–2 weeks. A full automation system with multiple workflows takes 3–6 weeks depending on scope.' },
        { q: 'Do I need technical knowledge to use it?', a: 'No. We build systems that are simple to use, with documentation and a handover session so your team feels confident.' },
      ],
    },
    cta: {
      eyebrow: 'Ready When You Are',
      title: 'Let’s automate your clinic together',
      subtitle: 'Book a free 20-minute consultation and discover where automation can save your team time.',
      primaryCta: 'Book a Free Consultation',
      secondaryCta: 'See Full Pricing',
    },
  },
  {
    slug: 'website-development',
    icon: 'Globe',
    name: 'Website Design & Development',
    tagline: 'Modern, fast, conversion-focused sites',
    metaTitle: 'Clinic Website Design & Development',
    metaDescription:
      'Modern, fast, conversion-focused clinic websites and landing pages. Built to capture leads, look great on every device, and rank on Google.',
    hero: {
      eyebrow: 'Website Development',
      title: 'A website that turns visitors into patients',
      subtitle:
        'We design and build clinic websites and landing pages that are fast, beautiful, and built to capture leads. Every site is optimized for mobile, speed, and search engines from day one.',
    },
    painPoints: {
      eyebrow: 'The Problem',
      title: 'Your current website is costing you patients',
      subtitle: 'Most clinic websites were built years ago and are actively losing leads.',
      items: [
        { title: 'Slow and outdated', description: 'A slow, dated website makes patients question your quality before they ever walk in.' },
        { title: 'No lead capture', description: 'Visitors cannot book or contact you easily, so they leave and book with a competitor.' },
        { title: 'Invisible on Google', description: 'Without SEO foundations, your clinic does not appear when patients search for services nearby.' },
        { title: 'Broken on mobile', description: 'More than half of patients visit on their phone. If your site is not mobile-friendly, you are losing them.' },
      ],
    },
    solution: {
      eyebrow: 'The Solution',
      title: 'A website built for conversion, not just looks',
      subtitle: 'We design and develop sites that are fast, responsive, SEO-ready, and designed to turn visitors into booked appointments.',
      items: [
        { title: 'Conversion-focused design', description: 'Clear calls to action, easy booking, and lead capture forms placed where patients actually look.' },
        { title: 'Lightning-fast performance', description: 'Built for speed with optimized images, clean code, and fast load times on every device.' },
        { title: 'SEO foundations built in', description: 'Proper structure, metadata, and semantic markup so search engines can find and rank your clinic.' },
        { title: 'Mobile-first responsive', description: 'Every page is designed and tested on mobile first, because that is where your patients are.' },
      ],
    },
    workflow: {
      eyebrow: 'How It Works',
      title: 'From first sketch to launched website',
      subtitle: 'A clear, collaborative process that delivers a website that works.',
      steps: [
        { step: '01', title: 'Discovery & structure', description: 'We map out your services, patient journey, and the pages you need.' },
        { step: '02', title: 'Design & review', description: 'You receive a design concept to review and refine before any code is written.' },
        { step: '03', title: 'Build & optimize', description: 'We build a fast, responsive site with SEO basics and accessible forms.' },
        { step: '04', title: 'Lead capture integration', description: 'Contact and booking forms are connected to your CRM or email.' },
        { step: '05', title: 'Launch & analytics', description: 'The site goes live with analytics tracking and a foundation for ongoing improvement.' },
      ],
    },
    benefits: {
      eyebrow: 'Why It Matters',
      title: 'A website that works as hard as you do',
      subtitle: 'Your website is your 24/7 front desk. Make it count.',
      items: [
        { title: 'More inquiries', description: 'A fast, clear website with easy booking converts more visitors into patients.' },
        { title: 'Professional first impression', description: 'A clean, modern design builds trust before a patient ever walks in.' },
        { title: 'Found on Google', description: 'SEO foundations help your clinic appear in local search results.' },
        { title: 'Grows with you', description: 'A modular structure means you can add pages, services, and features over time.' },
      ],
    },
    faq: {
      eyebrow: 'FAQ',
      title: 'Common questions about website projects',
      subtitle: 'Everything you need to know before getting started.',
      items: [
        { q: 'How long does a website take?', a: 'A landing page takes 1–2 weeks. A full multi-page clinic website takes 3–6 weeks depending on the number of pages and features.' },
        { q: 'Will my website work on mobile?', a: 'Yes. Every site we build is mobile-first and tested across devices, because the majority of patients visit on their phone.' },
        { q: 'Do you handle SEO?', a: 'We build SEO foundations into every site — proper structure, metadata, and semantic markup. Ongoing SEO optimization is available as a separate service.' },
        { q: 'Can I update the website myself?', a: 'Yes. We build on modern platforms that let you update content easily, and we provide a handover session to show you how.' },
        { q: 'Do you redesign existing websites?', a: 'Yes. We can redesign your current site or build a new one from scratch, depending on what makes the most sense for your clinic.' },
      ],
    },
    cta: {
      eyebrow: 'Ready When You Are',
      title: 'Let’s build a website that books patients',
      subtitle: 'Book a free consultation and tell us what you need.',
      primaryCta: 'Book a Free Consultation',
      secondaryCta: 'See Full Pricing',
    },
  },
  {
    slug: 'lead-generation',
    icon: 'Search',
    name: 'AI Lead Finder & Generation',
    tagline: 'Find and enrich qualified leads',
    metaTitle: 'AI Lead Generation for Clinics',
    metaDescription:
      'AI-powered lead research, decision-maker discovery, email enrichment, and automated outreach. Keep your pipeline full of qualified opportunities.',
    hero: {
      eyebrow: 'Lead Generation',
      title: 'A steady pipeline of qualified leads, on autopilot',
      subtitle:
        'We use AI to research decision-makers, discover verified emails, enrich lead records, and prepare automated outreach — so your calendar stays full beyond word of mouth.',
    },
    painPoints: {
      eyebrow: 'The Problem',
      title: 'You cannot grow on word of mouth alone',
      subtitle: 'Without a system to find and capture leads, growth is unpredictable.',
      items: [
        { title: 'No predictable lead flow', description: 'Without a system to find leads, your growth depends on referrals and luck.' },
        { title: 'Manual research is slow', description: 'Finding the right contacts and verifying their details by hand takes hours with no guarantee of results.' },
        { title: 'Outreach is inconsistent', description: 'Leads are found but never contacted, or contacted too late, because no one has time to follow up.' },
        { title: 'No way to scale', description: 'When you want to grow faster, there is no system to turn on and generate more leads on demand.' },
      ],
    },
    solution: {
      eyebrow: 'The Solution',
      title: 'AI-powered lead research and enrichment',
      subtitle: 'We combine AI research, data enrichment, and automated outreach into a system that fills your pipeline.',
      items: [
        { title: 'AI lead research', description: 'AI finds matching prospects and decision-makers based on your target criteria.' },
        { title: 'Email discovery & verification', description: 'Contact details are discovered and verified so you reach the right person every time.' },
        { title: 'Lead enrichment', description: 'Each lead record is enriched with relevant data for better, more personalized outreach.' },
        { title: 'CRM delivery', description: 'Enriched leads are delivered to your CRM, ready for automated or manual outreach.' },
      ],
    },
    workflow: {
      eyebrow: 'How It Works',
      title: 'From target definition to outreach-ready leads',
      subtitle: 'A clear workflow that turns your ideal patient profile into a pipeline of real contacts.',
      steps: [
        { step: '01', title: 'Target defined', description: 'You tell us the type of patients or partners you want to reach.' },
        { step: '02', title: 'AI research', description: 'The system researches and finds matching records and decision-makers.' },
        { step: '03', title: 'Enrichment', description: 'Contact details are verified and added to each lead record.' },
        { step: '04', title: 'CRM delivery', description: 'Enriched leads are delivered to your CRM, organized and ready.' },
        { step: '05', title: 'Automated outreach', description: 'Outreach sequences can be triggered automatically or managed by your team.' },
      ],
    },
    benefits: {
      eyebrow: 'Why It Matters',
      title: 'A pipeline that does not depend on luck',
      subtitle: 'Predictable lead generation means predictable growth.',
      items: [
        { title: 'Steady lead flow', description: 'AI lead research keeps your pipeline active beyond word of mouth and referrals.' },
        { title: 'Less manual research', description: 'Hours of finding and verifying contacts are replaced by automated research.' },
        { title: 'Outreach-ready records', description: 'Every lead arrives enriched and verified, ready for immediate contact.' },
        { title: 'Scalable on demand', description: 'Need more leads? The system can scale up research and enrichment whenever you need it.' },
      ],
    },
    faq: {
      eyebrow: 'FAQ',
      title: 'Common questions about lead generation',
      subtitle: 'Everything you need to know before booking a consultation.',
      items: [
        { q: 'How does AI lead generation work?', a: 'We use AI tools to research prospects based on your criteria, find decision-makers, verify contact details, and deliver enriched records to your CRM for outreach.' },
        { q: 'Are the leads verified?', a: 'Yes. Contact details are verified before delivery, so you are reaching real people at real addresses.' },
        { q: 'Do you handle the outreach too?', a: 'We can set up automated outreach sequences, or deliver the leads for your team to contact manually. You choose what works best.' },
        { q: 'How many leads can you generate?', a: 'Volume depends on your target market and criteria. We discuss realistic numbers during the consultation based on your goals.' },
        { q: 'Is this compliant with regulations?', a: 'We follow best practices for lead research and outreach. We discuss any specific regulatory concerns for your region during the consultation.' },
      ],
    },
    cta: {
      eyebrow: 'Ready When You Are',
      title: 'Let’s fill your pipeline with qualified leads',
      subtitle: 'Book a free consultation and tell us who you want to reach.',
      primaryCta: 'Book a Free Consultation',
      secondaryCta: 'See Full Pricing',
    },
  },
];

export function getServiceBySlug(slug: string): ServiceDetail | undefined {
  return services.find((s) => s.slug === slug);
}
