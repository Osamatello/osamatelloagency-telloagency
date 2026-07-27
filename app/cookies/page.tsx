'use client';

import { useI18n } from '@/lib/i18n/LanguageProvider';
import { LegalPage } from '@/components/site/LegalPage';

export default function CookiesPage() {
  const { dict } = useI18n();
  return (
    <LegalPage
      doc={dict.legal.cookie}
      slug="cookies"
      breadcrumbLabel={dict.legal.cookie.title}
    />
  );
}
