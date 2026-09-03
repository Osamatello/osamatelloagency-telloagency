'use client';

import Link from 'next/link';
import { Globe2, MapPin, Phone } from 'lucide-react';
import { useI18n } from '@/lib/i18n/LanguageProvider';
import { Logo } from './Logo';

export function Footer() {
  const { dict } = useI18n();
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-line bg-paper text-ink">
      <div className="container-page py-10 sm:py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-12 lg:gap-7">
          <div className="lg:col-span-4">
            <Logo />
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-muted">
              {dict.footer.description}
            </p>
          </div>

          <div className="lg:col-span-2">
            <h3 className="eyebrow text-ink-faint">{dict.footer.navTitle}</h3>
            <ul className="mt-3 space-y-2">
              {dict.nav.slice(0, 4).map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-ink-muted transition-colors hover:text-brand">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="eyebrow text-ink-faint">{dict.footer.servicesTitle}</h3>
            <ul className="mt-3 space-y-2">
              {dict.nav.slice(4, 7).map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-ink-muted transition-colors hover:text-brand">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h3 className="eyebrow text-ink-faint">{dict.footer.contactTitle}</h3>
            <ul className="mt-3 space-y-2.5 text-sm text-ink-muted">
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-brand" />
                <a href="tel:+971501607600" className="transition-colors hover:text-brand">+971 50 160 7600</a>
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin className="h-4 w-4 text-brand" />
                <span>Dubai · Bur Dubai · Rolla St</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Globe2 className="h-4 w-4 text-brand" />
                <a href="https://www.damasavero.com" className="transition-colors hover:text-brand">www.damasavero.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-9 flex flex-col gap-4 border-t border-line pt-5 text-xs text-ink-faint sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {dict.brand.name}. {dict.footer.rights}</p>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {dict.footer.legal.map((item) => (
              <Link key={item.label} href={item.href} className="transition-colors hover:text-brand">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
