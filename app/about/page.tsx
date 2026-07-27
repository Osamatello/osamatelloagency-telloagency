'use client';

import { useI18n } from '@/lib/i18n/LanguageProvider';
import { PageHero } from '@/components/site/PageHero';
import { Breadcrumbs } from '@/components/site/Breadcrumbs';
import { SectionHeading } from '@/components/site/SectionHeading';
import { FeatureCard } from '@/components/site/FeatureCard';
import { FounderCard } from '@/components/site/FounderCard';
import { CTASection } from '@/components/site/CTASection';

export default function AboutPage() {
  const { dict } = useI18n();
  const about = dict.about;

  return (
    <>
      <PageHero
        eyebrow={about.hero.eyebrow}
        title={about.hero.title}
        subtitle={about.hero.subtitle}
      />
      <Breadcrumbs items={[{ label: about.hero.eyebrow, href: '/about' }]} />

      {/* Story */}
      <section className="py-20 lg:py-24">
        <div className="container-tello grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow={about.story.eyebrow}
              title={about.story.title}
              align="left"
            />
          </div>
          <div className="space-y-4 lg:col-span-7">
            {about.story.paragraphs.map((p, i) => (
              <p key={i} className="text-base leading-relaxed text-white/70">
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Mission + Vision */}
      <section className="border-y border-white/5 bg-[hsl(0_0%_3%)] py-20 lg:py-24">
        <div className="container-tello grid gap-8 md:grid-cols-2">
          <div className="card-tello p-8">
            <span className="eyebrow">{about.mission.eyebrow}</span>
            <h2 className="mt-4 text-2xl font-bold text-white">{about.mission.title}</h2>
            <p className="mt-3 text-base leading-relaxed text-white/65">{about.mission.body}</p>
          </div>
          <div className="card-tello p-8">
            <span className="eyebrow">{about.vision.eyebrow}</span>
            <h2 className="mt-4 text-2xl font-bold text-white">{about.vision.title}</h2>
            <p className="mt-3 text-base leading-relaxed text-white/65">{about.vision.body}</p>
          </div>
        </div>
      </section>

      {/* Why TELLO */}
      <section className="py-20 lg:py-24">
        <div className="container-tello">
          <SectionHeading
            eyebrow={about.why.eyebrow}
            title={about.why.title}
            subtitle={about.why.subtitle}
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {about.why.items.map((item) => (
              <FeatureCard key={item.title} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="border-t border-white/5 bg-[hsl(0_0%_3%)] py-20 lg:py-24">
        <div className="container-tello">
          <SectionHeading
            eyebrow={about.founder.eyebrow}
            title={about.founder.title}
            align="left"
            className="max-w-3xl"
          />
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/60">
            {about.founder.intro}
          </p>
          <div className="mt-12">
            <FounderCard founder={about.founder} />
          </div>
        </div>
      </section>

      <CTASection
        className="py-20 lg:py-24"
        eyebrow={about.cta.eyebrow}
        title={about.cta.title}
        subtitle={about.cta.subtitle}
        primaryCta={about.cta.primaryCta}
        secondaryCta={about.cta.secondaryCta}
        primaryHref="/consult"
        secondaryHref="/services"
      />
    </>
  );
}
