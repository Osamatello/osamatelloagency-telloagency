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
      ? { title: 'خدمات الأتمتة بالذكاء الاصطناعي وأنظمة الأعمال — DAMASAVERO', description: 'قدرات DAMASAVERO في الأتمتة بالذكاء الاصطناعي وأنظمة الأعمال وتطوير المواقع: أتمتة تدفقات العمل، وعمليات العملاء، وأنظمة الإيرادات، والتكاملات.' }
      : {
          title: 'AI Automation & Business Systems Services — DAMASAVERO',
          description:
            'DAMASAVERO’s AI automation, business systems and web development capabilities: workflow automation, customer operations, revenue systems and integrations.',
        };
  return pageMetadata({ ...copy, path: '/services', lang: params.lang });
}

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
