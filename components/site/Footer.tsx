'use client';

import Link from 'next/link';
import { Linkedin, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import { useI18n } from '@/lib/i18n/LanguageProvider';
import { Logo } from './Logo';

export function Footer() {
  const { dict } = useI18n();
  const year = new Date().getFullYear();

  const socials = [
    { Icon: Twitter, label: 'Twitter / X', href: 'https://twitter.com/telloagency' },
    { Icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/company/telloagency' },
  ];

  return (
    <footer className="relative border-t border-white/10 bg-[hsl(0_0%_3%)]">
      <div className="container-tello py-14">
        <div className="grid gap-10 lg:grid-cols-12">
          {/* Brand + description */}
          <div className="lg:col-span-4">
            <Logo className="text-white" />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">
              {dict.footer.description}
            </p>
            <div className="mt-5 flex items-center gap-3">
              {socials.map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/70 transition-all hover:border-[hsl(var(--neon))/0.5] hover:text-[hsl(var(--neon))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--neon))]"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Nav links */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              {dict.footer.navTitle}
            </h3>
            <ul className="mt-4 space-y-2.5">
              {dict.nav.slice(0, 6).map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/60 transition-colors hover:text-[hsl(var(--neon))]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service links */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              {dict.footer.servicesTitle}
            </h3>
            <ul className="mt-4 space-y-2.5">
              {dict.nav.slice(2, 5).map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/60 transition-colors hover:text-[hsl(var(--neon))]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + legal */}
          <div className="lg:col-span-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              {dict.footer.contactTitle}
            </h3>
            <ul className="mt-4 space-y-3">
              <li className="flex items-center gap-2.5 text-sm text-white/60">
                <Mail className="h-4 w-4 text-[hsl(var(--neon))]" />
                <a href="mailto:hello@telloagency.ai" className="transition-colors hover:text-white">hello@telloagency.ai</a>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-white/60">
                <Phone className="h-4 w-4 text-[hsl(var(--neon))]" />
                <a href="tel:+971589912345" className="transition-colors hover:text-white">+971 58 991 2345</a>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-white/60">
                <MapPin className="h-4 w-4 text-[hsl(var(--neon))]" />
                <span>Dubai, United Arab Emirates — serving clinics worldwide</span>
              </li>
            </ul>
            <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2">
              {dict.footer.legal.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-xs text-white/50 transition-colors hover:text-white/80"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-center sm:flex-row sm:text-left">
          <p className="text-xs text-white/50">
            © {year} {dict.brand.name}. {dict.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
