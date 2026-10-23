import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import type { Locale } from '@/lib/i18n';

/**
 * Route-level metadata only. The page itself is a Client Component, so its
 * metadata lives here rather than being pushed into the component tree.
 */
export function generateMetadata({ params }: { params: { lang: Locale } }): Metadata {
  const copy =
    params.lang === 'ar'
      ? { title: 'من نحن — DAMASAVERO للأتمتة بالذكاء الاصطناعي وأنظمة الأعمال', description: 'تعرّف على طريقة DAMASAVERO في بناء أنظمة الأعمال الذكية والأتمتة والتكامل، بهندسة عملية لعمليات حقيقية.' }
      : {
          title: 'About DAMASAVERO — AI Automation & Business Systems',
          description:
            'Learn how DAMASAVERO approaches intelligent business systems, automation, integration and practical engineering for real business operations.',
        };
  return pageMetadata({ ...copy, path: '/about', lang: params.lang });
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
