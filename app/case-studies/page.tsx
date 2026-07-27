'use client';

import { ShieldCheck } from 'lucide-react';
import { useI18n } from '@/lib/i18n/LanguageProvider';
import { PageHero } from '@/components/site/PageHero';
import { Breadcrumbs } from '@/components/site/Breadcrumbs';
import { SectionHeading } from '@/components/site/SectionHeading';
import { CaseStudyCard } from '@/components/site/CaseStudyCard';
import { CTASection } from '@/components/site/CTASection';

export default function CaseStudiesPage() {
  const { dict } = useI18n();
  const cs = dict.caseStudies;

  return (
    <>
      <PageHero
        eyebrow={cs.hero.eyebrow}
        title={cs.hero.title}
        subtitle={cs.hero.subtitle}
      />
      <Breadcrumbs items={[{ label: cs.hero.eyebrow, href: '/case-studies' }]} />

      {/* Confidentiality note */}
      <section className="pt-10">
        <div className="container-tello">
          <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4">
            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[hsl(var(--neon))]" />
            <div>
              <p className="text-sm font-semibold text-white">{cs.disclaimer.label}</p>
              <p className="mt-1 text-sm leading-relaxed text-white/60">{cs.disclaimer.text}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Case studies grid */}
      <section className="py-16 lg:py-20">
        <div className="container-tello">
          <div className="grid gap-6 lg:grid-cols-2">
            {cs.items.map((study, i) => (
              <CaseStudyCard key={study.title} study={study} index={i} />
            ))}
          </div>
        </div>
      </section>

      <CTASection
        className="py-20 lg:py-24"
        eyebrow={cs.cta.eyebrow}
        title={cs.cta.title}
        subtitle={cs.cta.subtitle}
        primaryCta={cs.cta.primaryCta}
        secondaryCta={cs.cta.secondaryCta}
        primaryHref="/consult"
        secondaryHref="/services"
      />
    </>
  );
}
