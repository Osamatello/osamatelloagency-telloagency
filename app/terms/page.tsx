'use client';

import { useI18n } from '@/lib/i18n/LanguageProvider';
import { LegalPage } from '@/components/site/LegalPage';

export default function TermsPage() {
  const { dict } = useI18n();
  return (
    <LegalPage
      doc={dict.legal.terms}
      slug="terms"
      breadcrumbLabel={dict.legal.terms.title}
    />
  );
}
