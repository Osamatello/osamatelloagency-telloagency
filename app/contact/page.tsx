'use client';

import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react';
import { useI18n } from '@/lib/i18n/LanguageProvider';
import { ContactForm } from '@/components/site/ContactForm';
import { EngineAtmosphere } from './EngineAtmosphere';

export default function ContactPage() {
  const { locale, dir } = useI18n();

  const copy = locale === 'ar'
    ? {
        eyebrow: 'ابدأ المحادثة',
        title: 'أخبرنا بما لا يعمل كما يجب.',
        body:
          'لا تحتاج إلى معرفة الأداة أو نوع النظام الذي تحتاجه. صف لنا العملية، وأين يتعطل العمل، والنتيجة التي تريدها — ومن هناك نحدّد النظام الذي ينبغي بناؤه.',
        detailsLabel: 'معلومات التواصل',
        phoneLabel: 'الهاتف',
        locationLabel: 'الموقع',
        emailLabel: 'البريد الإلكتروني',
        locationValue: 'دبي - بر دبي',
        note: 'كل مشروع يبدأ بفهم المتطلّب، لا ببيع خدمة جاهزة.',
      }
    : {
        eyebrow: 'Start the conversation',
        title: 'Tell us what is not working.',
        body:
          'You do not need to know which tool or type of system you need. Describe the process, where the work breaks down and the outcome you want — from there we can determine the system that should be built.',
        detailsLabel: 'Contact details',
        phoneLabel: 'Phone',
        locationLabel: 'Location',
        emailLabel: 'Email',
        locationValue: 'Dubai - Bur Dubai',
        note: 'Every engagement starts with understanding the requirement, not selling a predefined service.',
      };

  const details = [
    { Icon: Phone, label: copy.phoneLabel, value: '+971 50 160 7600', href: 'tel:+971501607600', ltr: true },
    { Icon: MapPin, label: copy.locationLabel, value: copy.locationValue },
    { Icon: Mail, label: copy.emailLabel, value: 'Founder@damasavero.com', href: 'mailto:Founder@damasavero.com', ltr: true },
  ];

  return (
    <div id="contact-page" dir={dir} className="relative isolate overflow-hidden bg-paper text-ink">
      <EngineAtmosphere />

      {/* No hero — the page opens straight into the contact experience. */}
      <main className="relative z-10">
        <div className="container-page grid gap-12 py-14 sm:py-18 lg:grid-cols-12 lg:gap-12 lg:py-24 xl:gap-16">
          <aside data-contact-content className="lg:col-span-5 xl:col-span-4">
            <p className="eyebrow text-brand">{copy.eyebrow}</p>
            <h1 className="text-display mt-5 max-w-[13ch] text-[clamp(2.1rem,4.2vw,3.4rem)] leading-[1.04] text-ink">
              {copy.title}
            </h1>
            <p className="mt-6 max-w-md text-[0.98rem] leading-relaxed text-ink-muted">{copy.body}</p>

            <p className="eyebrow mt-12 text-ink-faint">{copy.detailsLabel}</p>
            <div className="mt-4 border-t border-line">
              {details.map(({ Icon, label, value, href, ltr }) => {
                const inner = (
                  <div className="group flex items-center gap-4 py-4">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line text-brand">
                      <Icon className="h-4 w-4" strokeWidth={1.7} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-ink-faint">{label}</p>
                      <p
                        className="mt-0.5 text-[0.95rem] leading-6 text-ink"
                        dir={ltr ? 'ltr' : undefined}
                        style={ltr ? { textAlign: 'start' } : undefined}
                      >
                        {value}
                      </p>
                    </div>
                    {href ? (
                      <ArrowUpRight className="h-4 w-4 shrink-0 text-ink-faint transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand" />
                    ) : null}
                  </div>
                );
                return href ? (
                  <a
                    key={label}
                    href={href}
                    {...(href.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {})}
                    className="block border-b border-line"
                  >
                    {inner}
                  </a>
                ) : (
                  <div key={label} className="border-b border-line">{inner}</div>
                );
              })}
            </div>

            <p className="mt-8 max-w-sm ps-4 text-[0.85rem] leading-6 text-ink-faint [border-inline-start:1px_solid_hsl(var(--brand))]">
              {copy.note}
            </p>
          </aside>

          <div data-contact-content className="lg:col-span-7 xl:col-span-8">
            <ContactForm />
          </div>
        </div>
      </main>
    </div>
  );
}
