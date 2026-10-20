'use client';

import Link from '@/components/site/LocaleLink';
import { Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { useI18n } from '@/lib/i18n/LanguageProvider';
import { Logo } from './Logo';
import { trackContactClick } from '@/lib/analytics';

export function Footer() {
  const { dict } = useI18n();

  return (
    <footer className="relative z-10 border-t border-[#dedbd3] bg-[#eef2ec] text-[#1d2521]">
      <div className="container-page py-6 sm:py-8 lg:py-6">
        <div className="grid gap-5 sm:gap-8 md:grid-cols-12 md:gap-7">
          <div className="md:col-span-4 lg:col-span-3">
            <Logo />
            <p className="mt-2 max-w-xs text-sm leading-snug text-[#626a66] sm:mt-3 sm:leading-relaxed">
              {dict.footer.description}
            </p>
          </div>

          <div className="md:col-span-4 lg:col-span-6">
            <h3 className="eyebrow text-[#858b87]">{dict.footer.navTitle}</h3>
            <ul className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1.5 sm:mt-3 sm:gap-y-2 lg:flex lg:flex-wrap lg:gap-x-4 lg:gap-y-2 xl:flex-nowrap">
              {dict.nav.slice(0, 5).map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-[#626a66] transition-colors hover:text-brand">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4 lg:col-span-3">
            <h3 className="eyebrow text-[#858b87]">{dict.footer.contactTitle}</h3>
            <ul className="mt-2 space-y-1.5 text-sm text-[#626a66] sm:mt-3 sm:space-y-2.5">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-brand" />
                <a
                  href="tel:+971501607600"
                  onClick={() => trackContactClick('phone', 'footer')}
                  className="transition-colors hover:text-brand"
                >
                  +971 50 160 7600
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-brand" />
                <span>Dubai · Bur Dubai</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-brand" />
                <a
                  href="mailto:Founder@damasavero.com"
                  onClick={() => trackContactClick('email', 'footer')}
                  className="transition-colors hover:text-brand"
                >
                  Founder@damasavero.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Linkedin className="h-4 w-4 text-brand" />
                <a
                  href="https://www.linkedin.com/company/damasavero"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${dict.footer.followTitle}: LinkedIn`}
                  onClick={() => trackContactClick('linkedin', 'footer')}
                  className="transition-colors hover:text-brand"
                >
                  LinkedIn
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Instagram className="h-4 w-4 text-brand" />
                <a
                  href="https://www.instagram.com/osamatello0/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${dict.footer.followTitle}: Instagram`}
                  onClick={() => trackContactClick('instagram', 'footer')}
                  className="transition-colors hover:text-brand"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-2.5 border-t border-[#dedbd3] pt-4 text-xs text-[#858b87] sm:mt-6 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:pt-4 lg:mt-4 lg:pt-3">
          <p>© 2026 {dict.brand.name}. {dict.footer.rights}</p>
          <div className="flex flex-wrap gap-x-3 gap-y-1.5 sm:gap-x-4 sm:gap-y-2">
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
