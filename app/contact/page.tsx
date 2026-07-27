'use client';

import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { useI18n } from '@/lib/i18n/LanguageProvider';
import { PageHero } from '@/components/site/PageHero';
import { Breadcrumbs } from '@/components/site/Breadcrumbs';
import { ContactForm } from '@/components/site/ContactForm';

export default function ContactPage() {
  const { dict } = useI18n();
  const contact = dict.contact;
  const info = contact.info;

  const details = [
    { Icon: Mail, label: info.emailLabel, value: info.emailValue },
    { Icon: Phone, label: info.phoneLabel, value: info.phoneValue },
    { Icon: MapPin, label: info.locationLabel, value: info.locationValue },
    { Icon: Clock, label: info.hoursLabel, value: info.hoursValue },
  ];

  return (
    <>
      <PageHero
        eyebrow={contact.hero.eyebrow}
        title={contact.hero.title}
        subtitle={contact.hero.subtitle}
      />
      <Breadcrumbs items={[{ label: contact.hero.eyebrow, href: '/contact' }]} />

      <section className="py-20 lg:py-24">
        <div className="container-tello grid gap-10 lg:grid-cols-12">
          {/* Contact info */}
          <div className="lg:col-span-5">
            <h2 className="text-2xl font-bold text-white">{info.title}</h2>
            <p className="mt-2 text-base leading-relaxed text-white/60">{info.subtitle}</p>
            <ul className="mt-8 space-y-6">
              {details.map(({ Icon, label, value }) => (
                <li key={label} className="flex items-start gap-4">
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[hsl(var(--neon))/0.3] bg-[hsl(var(--neon))/0.1] text-[hsl(var(--neon))]">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-white/80">{label}</p>
                    <p className="mt-0.5 text-sm text-white/60">{value}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
