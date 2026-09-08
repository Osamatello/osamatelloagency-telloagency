'use client';

import { ArrowUpRight, MapPin, Phone, TimerReset } from 'lucide-react';
import { useI18n } from '@/lib/i18n/LanguageProvider';
import { ContactForm } from '@/components/site/ContactForm';
import { EngineAtmosphere } from './EngineAtmosphere';

export default function ContactPage() {
  const { locale, dir } = useI18n();

  const copy = locale === 'ar'
    ? {
        eyebrow: 'تواصل معنا',
        title: 'لنبدأ من المشكلة الحقيقية.',
        subtitle:
          'احكِ لنا أين يتعطل العمل، وما الذي تريد تحسينه. ندرس المتطلبات أولاً، ثم نحدد النظام المناسب قبل أن نقترح أي تقنية.',
        introEyebrow: 'ابدأ المحادثة',
        introTitle: 'صف لنا ما الذي يجب أن يعمل بشكل أفضل.',
        introBody:
          'لا تحتاج إلى معرفة اسم الأداة أو نوع الأتمتة التي تحتاجها. اشرح لنا العملية، نقاط الاحتكاك، والنتيجة التي تريد الوصول إليها — ونحن نبدأ من هناك.',
        phoneLabel: 'الهاتف',
        locationLabel: 'الموقع',
        responseLabel: 'الرد',
        responseValue: 'عادة خلال يوم عمل واحد',
        locationValue: 'دبي · بر دبي · شارع الرولة',
        phoneValue: '+971 50 160 7600',
        note: 'كل طلب يبدأ بفهم المتطلبات، وليس ببيع خدمة جاهزة.',
      }
    : {
        eyebrow: 'Contact',
        title: 'Start with the real problem.',
        subtitle:
          'Tell us where operations are slowing down and what needs to improve. We understand the requirement first, then define the right system before recommending technology.',
        introEyebrow: 'Start the conversation',
        introTitle: 'Tell us what needs to work better.',
        introBody:
          'You do not need to know which tool, platform or type of automation you need. Describe the process, the friction and the outcome you want — we start from there.',
        phoneLabel: 'Phone',
        locationLabel: 'Location',
        responseLabel: 'Response',
        responseValue: 'Usually within one business day',
        locationValue: 'Dubai · Bur Dubai · Rolla St',
        phoneValue: '+971 50 160 7600',
        note: 'Every engagement starts with understanding the requirement, not selling a predefined service.',
      };

  const details = [
    {
      Icon: Phone,
      label: copy.phoneLabel,
      value: copy.phoneValue,
      href: 'tel:+971501607600',
    },
    {
      Icon: MapPin,
      label: copy.locationLabel,
      value: copy.locationValue,
    },
    {
      Icon: TimerReset,
      label: copy.responseLabel,
      value: copy.responseValue,
    },
  ];

  return (
    <div
      id="contact-page"
      dir={dir}
      className="relative isolate overflow-hidden bg-paper text-ink"
    >
      <EngineAtmosphere />

      <main className="relative z-10">
        <section className="border-b border-line">
          <div className="container-page grid min-h-[clamp(33rem,76vh,49rem)] items-end py-16 sm:py-20 lg:grid-cols-12 lg:gap-10 lg:py-24">
            <div data-contact-content className="pb-6 lg:col-span-10 xl:col-span-9">
              <p className="eyebrow text-brand">{copy.eyebrow}</p>
              <h1 className="text-display mt-7 max-w-[11ch] text-[clamp(3.5rem,8vw,8.5rem)] font-medium leading-[0.88] tracking-[-0.055em] text-ink">
                {copy.title}
              </h1>
              <p className="mt-8 max-w-2xl text-[clamp(1rem,1.5vw,1.3rem)] leading-relaxed text-ink-muted sm:mt-10">
                {copy.subtitle}
              </p>
            </div>
          </div>
        </section>

        <section className="py-20 sm:py-24 lg:py-32">
          <div className="container-page grid gap-14 lg:grid-cols-12 lg:gap-10 xl:gap-16">
            <aside data-contact-content className="lg:col-span-5 xl:col-span-4">
              <p className="eyebrow text-brand">{copy.introEyebrow}</p>
              <h2 className="text-display mt-5 max-w-[12ch] text-[clamp(2.4rem,4.6vw,4.8rem)] font-medium leading-[0.96] tracking-[-0.045em] text-ink">
                {copy.introTitle}
              </h2>
              <p className="mt-6 max-w-md text-base leading-7 text-ink-muted sm:text-lg">
                {copy.introBody}
              </p>

              <div className="mt-10 border-t border-line">
                {details.map(({ Icon, label, value, href }) => {
                  const content = (
                    <div className="group flex items-center gap-4 py-5">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line bg-[hsl(var(--ds-paper))] text-brand">
                        <Icon className="h-4 w-4" strokeWidth={1.7} />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-ink-faint">
                          {label}
                        </p>
                        <p className="mt-1 text-sm leading-6 text-ink sm:text-[0.95rem]">{value}</p>
                      </div>
                      {href ? (
                        <ArrowUpRight className="h-4 w-4 shrink-0 text-ink-faint transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand" />
                      ) : null}
                    </div>
                  );

                  return href ? (
                    <a key={label} href={href} className="block border-b border-line">
                      {content}
                    </a>
                  ) : (
                    <div key={label} className="border-b border-line">
                      {content}
                    </div>
                  );
                })}
              </div>

              <p className="mt-8 max-w-sm text-sm leading-6 text-ink-faint">{copy.note}</p>
            </aside>

            <div data-contact-content className="lg:col-span-7 xl:col-span-8 xl:pl-8">
              <ContactForm />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
