import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { services, getServiceBySlug } from '@/lib/services-data';
import { AREA_SERVED, localePath, pageMetadata } from '@/lib/seo';
import { servicesAr } from '@/lib/services-data-ar';
import type { Locale } from '@/lib/i18n';
import { ServiceDetailPage } from '@/components/site/ServiceDetailPage';

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

type Params = { lang: Locale; slug: string };

/** The service in the page's language; Arabic copy overlays the English record. */
function serviceFor({ lang, slug }: Params) {
  const base = getServiceBySlug(slug);
  if (!base) return undefined;
  const ar = lang === 'ar' ? servicesAr[slug] : undefined;
  return ar ? { ...base, ...ar } : base;
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const service = serviceFor(params);
  if (!service) return {};
  // The shared helper keeps the social card, site name, Twitter tags and the
  // hreflang pair; a bare `openGraph` here replaced the root object and dropped
  // the image. The brand suffix is written out because the services layout's
  // absolute title stops the root `%s | DAMASAVERO` template reaching here.
  return pageMetadata({
    title: `${service.metaTitle} | DAMASAVERO`,
    description: service.metaDescription,
    path: `/services/${service.slug}`,
    lang: params.lang,
  });
}

export default function ServicePage({ params }: { params: Params }) {
  const service = serviceFor(params);
  if (!service) notFound();

  // Service + FAQPage markup. The FAQ answers are already on the page, so this
  // only restates them in a form search and answer engines can quote directly.
  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: service.name,
      serviceType: service.tagline,
      description: service.metaDescription,
      url: `https://damasavero.com${localePath(`/services/${service.slug}`, params.lang)}`,
      inLanguage: params.lang,
      provider: {
        '@type': 'Organization',
        name: 'DAMASAVERO',
        url: 'https://damasavero.com',
      },
      areaServed: AREA_SERVED,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      inLanguage: params.lang,
      mainEntity: service.faq.items.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: item.a },
      })),
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <ServiceDetailPage service={getServiceBySlug(params.slug)!} />
    </>
  );
}
