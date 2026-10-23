import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { services, getServiceBySlug } from '@/lib/services-data';
import { AREA_SERVED, pageMetadata } from '@/lib/seo';
import { ServiceDetailPage } from '@/components/site/ServiceDetailPage';

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const service = getServiceBySlug(params.slug);
  if (!service) return {};
  // The shared helper keeps the social card, site name and Twitter tags; a bare
  // `openGraph` here replaced the root object and dropped the image. The brand
  // suffix is written out because the services layout's absolute title stops
  // the root `%s | DAMASAVERO` template from reaching this segment.
  return pageMetadata({
    title: `${service.metaTitle} | DAMASAVERO`,
    description: service.metaDescription,
    path: `/services/${service.slug}`,
  });
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const service = getServiceBySlug(params.slug);
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
      url: `https://damasavero.com/services/${service.slug}`,
      provider: {
        '@type': 'Organization',
        name: 'DAMASAVERO',
        url: 'https://damasavero.com',
      },
      areaServed: AREA_SERVED,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Capabilities', item: 'https://damasavero.com/services' },
        { '@type': 'ListItem', position: 2, name: service.name, item: `https://damasavero.com/services/${service.slug}` },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
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
      <ServiceDetailPage service={service} />
    </>
  );
}
