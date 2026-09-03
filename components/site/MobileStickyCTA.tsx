'use client';

import Link from 'next/link';
import { useI18n } from '@/lib/i18n/LanguageProvider';

export function MobileStickyCTA() {
  const { dict } = useI18n();
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper/90 backdrop-blur-xl lg:hidden">
      <div className="container-page flex items-center justify-center py-3">
        <Link href="/consult" className="btn-primary w-full">
          {dict.components.mobileStickyCta}
        </Link>
      </div>
    </div>
  );
}
