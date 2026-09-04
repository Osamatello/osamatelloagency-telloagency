export type Locale = 'en' | 'ar';

export const locales: Locale[] = ['en', 'ar'];
export const defaultLocale: Locale = 'en';

export interface NavItem {
  label: string;
  href: string;
}

export interface FeatureItem {
  icon: string; // lucide icon name string; resolved by lib/icons.tsx
  title: string;
  description: string;
}

export interface ServiceCardData {
  icon: string;
  title: string;
  tagline: string;
  description: string;
  href: string;
  features: string[];
}

export interface IndustryData {
  slug: string;
  icon: string;
  title: string;
  description: string;
  href: string;
  featured: boolean;
  comingSoon: boolean;
  solutions?: string[];
}

export interface PricingPlanData {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  href: string;
  popular: boolean;
}

export interface StepItem {
  step: string;
  title: string;
  description: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface LegalSection {
  heading: string;
  body: string;
}

export interface LegalDoc {
  eyebrow: string;
  title: string;
  subtitle: string;
  intro: string;
  sections: LegalSection[];
  updatedLabel: string;
  updated: string;
}

export interface Dictionary {
  meta: { localeName: string; htmlLang: string };
  brand: { name: string; tagline: string };
  nav: NavItem[];
  actions: {
    bookConsultation: string;
    exploreServices: string;
    learnMore: string;
    getStarted: string;
    viewAllServices: string;
    viewAllCaseStudies: string;
    viewAllPricing: string;
    viewAllFaqs: string;
    backToServices: string;
    contactUs: string;
    menu: string;
    closeMenu: string;
    switchTo: string;
  };
  language: { en: string; ar: string; switchLabel: string };
  footer: {
    description: string;
    navTitle: string;
    servicesTitle: string;
    legalTitle: string;
    contactTitle: string;
    followTitle: string;
    legal: NavItem[];
    rights: string;
  };
  home: {
    hero: {
      eyebrow: string;
      title: string;
      titleAccent: string;
      subtitle: string;
      primaryCta: string;
      secondaryCta: string;
      stat1Value: string;
      stat1Label: string;
      stat2Value: string;
      stat2Label: string;
      stat3Value: string;
      stat3Label: string;
    };
    tools: { eyebrow: string; title: string; subtitle: string; operatingLayer: string; items: string[] };
    capabilities: {
      eyebrow: string;
      title: string;
      items: { index: string; title: string; summary: string; href: string }[];
    };
    shift: {
      eyebrow: string;
      title: string;
      lead: string;
      pairs: { problem: string; automated: string }[];
      pairsRight: { problem: string; automated: string }[];
    };
    servicesOverview: { eyebrow: string; title: string; subtitle: string; services: ServiceCardData[] };
    problems: { eyebrow: string; title: string; subtitle: string; items: FeatureItem[] };
    solutions: { eyebrow: string; title: string; subtitle: string; items: FeatureItem[] };
    workflow: { eyebrow: string; title: string; closer: string; steps: StepItem[] };
    beforeAfter: {
      eyebrow: string;
      title: string;
      beforeLabel: string;
      afterLabel: string;
      pairs: { before: string; after: string }[];
    };
    benefits: { eyebrow: string; title: string; subtitle: string; items: FeatureItem[] };
    howItWorks: { eyebrow: string; title: string; subtitle: string; steps: StepItem[] };
    pricingPreview: { eyebrow: string; title: string; subtitle: string; note: string; plans: PricingPlanData[] };
    founder: {
      eyebrow: string;
      title: string;
      intro: string;
      name: string;
      role: string;
      message: string;
      highlights: string[];
    };
    faqPreview: { eyebrow: string; title: string; subtitle: string; items: FaqItem[] };
    cta: { eyebrow: string; title: string; subtitle: string; primaryCta: string; secondaryCta: string };
  };
  about: {
    hero: { eyebrow: string; title: string; subtitle: string };
    perspective: {
      eyebrow: string;
      title: string;
      lead: string;
      steps: { title: string }[];
    };
    architecture: {
      eyebrow: string;
      title: string;
      lead: string;
      layers: { title: string; description: string }[];
    };
    founder: {
      eyebrow: string;
      title: string;
      name: string;
      role: string;
      perspectiveLabel: string;
      perspective: string;
    };
    cta: { eyebrow: string; title: string; subtitle: string; primaryCta: string; secondaryCta: string };
  };
  services: {
    hero: { eyebrow: string; title: string; subtitle: string };
    detail: {
      includes: string;
      process: string;
      processSteps: StepItem[];
    };
    cta: { eyebrow: string; title: string; subtitle: string; primaryCta: string; secondaryCta: string };
  };
  industries: {
    hero: { eyebrow: string; title: string; subtitle: string };
    overview: { eyebrow: string; title: string; subtitle: string };
    industries: IndustryData[];
    cta: { eyebrow: string; title: string; subtitle: string; primaryCta: string; secondaryCta: string };
  };
  caseStudies: {
    hero: { eyebrow: string; title: string; subtitle: string };
    disclaimer: { label: string; text: string };
    overviewLabel: string;
    workflowLabel: string;
    outcomesLabel: string;
    demoTag: string;
    conceptTag: string;
    items: {
      icon: string;
      title: string;
      category: string;
      tag: string;
      description: string;
      tags: string[];
      overview: string;
      workflow: StepItem[];
      outcomes: string[];
    }[];
    cta: { eyebrow: string; title: string; subtitle: string; primaryCta: string; secondaryCta: string };
  };
  pricing: {
    hero: { eyebrow: string; title: string; subtitle: string };
    note: string;
    featuresTitle: string;
    faqs: FaqItem[];
    cta: { eyebrow: string; title: string; subtitle: string; primaryCta: string; secondaryCta: string };
  };
  contact: {
    hero: { eyebrow: string; title: string; subtitle: string };
    info: {
      title: string;
      subtitle: string;
      emailLabel: string;
      phoneLabel: string;
      locationLabel: string;
      hoursLabel: string;
      emailValue: string;
      phoneValue: string;
      locationValue: string;
      hoursValue: string;
    };
    form: {
      title: string;
      subtitle: string;
      fullName: string;
      fullNamePlaceholder: string;
      email: string;
      emailPlaceholder: string;
      phone: string;
      phonePlaceholder: string;
      company: string;
      companyPlaceholder: string;
      serviceInterest: string;
      servicePlaceholder: string;
      budget: string;
      budgetPlaceholder: string;
      message: string;
      messagePlaceholder: string;
      consent: string;
      submit: string;
      sending: string;
      successTitle: string;
      successMessage: string;
      sendAnother: string;
      required: string;
      errors: {
        fullName: string;
        email: string;
        emailInvalid: string;
        phone: string;
        service: string;
        budget: string;
        message: string;
        consent: string;
      };
      serviceOptions: string[];
      budgetOptions: string[];
    };
  };
  consult: {
    hero: {
      eyebrow: string;
      title: string;
      subtitle: string;
      freeLabel: string;
    };
    benefits: { eyebrow: string; title: string; subtitle: string; items: FeatureItem[] };
    discuss: { eyebrow: string; title: string; subtitle: string; items: string[] };
    cta: {
      eyebrow: string;
      title: string;
      subtitle: string;
      primaryCta: string;
      secondaryCta: string;
    };
  };
  featuredLabel: string;
  legal: {
    privacy: LegalDoc;
    terms: LegalDoc;
    cookie: LegalDoc;
  };
  components: {
    breadcrumbsHome: string;
    popularBadge: string;
    comingSoon: string;
    ctaSection: { title: string; subtitle: string; primaryCta: string; secondaryCta: string };
    mobileStickyCta: string;
  };
  schema: {
    organizationName: string;
    organizationDesc: string;
    founderName: string;
    founderJobTitle: string;
  };
}
