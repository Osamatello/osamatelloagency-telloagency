'use client';

import Link from 'next/link';
import { useI18n } from '@/lib/i18n/LanguageProvider';

export function MobileStickyCTA() {
  const { dict } = useI18n();
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-[hsl(var(--background))]/95 backdrop-blur-xl lg:hidden">
      <div className="container-tello flex items-center justify-center py-3">
        <Link href="/consult" className="btn-neon w-full">
          {dict.components.mobileStickyCta}
        </Link>
      </div>
    </div>
  );
}
