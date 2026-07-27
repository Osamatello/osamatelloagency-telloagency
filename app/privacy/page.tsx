'use client';

import { useI18n } from '@/lib/i18n/LanguageProvider';
import { LegalPage } from '@/components/site/LegalPage';

export default function PrivacyPage() {
  const { dict } = useI18n();
  return (
    <LegalPage
      doc={dict.legal.privacy}
      slug="privacy"
      breadcrumbLabel={dict.legal.privacy.title}
    />
  );
}
