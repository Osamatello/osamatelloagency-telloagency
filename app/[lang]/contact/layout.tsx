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
      ? { title: 'تواصل مع DAMASAVERO — الأتمتة بالذكاء الاصطناعي وأنظمة الأعمال', description: 'تحدّث مع DAMASAVERO عن الأتمتة بالذكاء الاصطناعي، أو أنظمة الأعمال، أو ربط تدفقات العمل، أو أي تحدٍّ تشغيلي خاص.' }
      : {
          title: 'Contact DAMASAVERO — AI Automation & Business Systems',
          description:
            'Talk to DAMASAVERO about AI automation, business systems, workflow integration or a custom operational challenge.',
        };
  return pageMetadata({ ...copy, path: '/contact', lang: params.lang });
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
