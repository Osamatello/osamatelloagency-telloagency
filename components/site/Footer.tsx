'use client';

import Link from 'next/link';
import { Github, Linkedin, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import { useI18n } from '@/lib/i18n/LanguageProvider';
import { Logo } from './Logo';

export function Footer() {
  const { dict } = useI18n();
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/10 bg-[hsl(0_0%_3%)]">
      <div className="container-tello py-14">
        <div className="grid gap-10 lg:grid-cols-12">
          {/* Brand + description */}
          <div className="lg:col-span-4">
            <Logo />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">
              {dict.footer.description}
            </p>
            <div className="mt-5 flex items-center gap-3">
              {[
                { Icon: Twitter, label: 'Twitter' },
                { Icon: Linkedin, label: 'LinkedIn' },
                { Icon: Github, label: 'GitHub' },
              ].map(({ Icon, label }) => (
                <span
                  key={label}
                  aria-label={`${label} — ${dict.footer.placeholder}`}
                  title={`${label} — ${dict.footer.placeholder}`}
                  className="inline-flex h-9 w-9 cursor-default items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/40"
                >
                  <Icon className="h-4 w-4" />
                </span>
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
                <span>hello@telloagency.example</span>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-white/60">
                <Phone className="h-4 w-4 text-[hsl(var(--neon))]" />
                <span>+1 (000) 000-0000</span>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-white/60">
                <MapPin className="h-4 w-4 text-[hsl(var(--neon))]" />
                <span>{dict.footer.placeholder}</span>
              </li>
            </ul>
            <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2">
              {dict.footer.legal.map((item) => (
                <span
                  key={item.label}
                  className="text-xs text-white/40"
                  title={dict.footer.placeholder}
                >
                  {item.label}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-center sm:flex-row sm:text-left">
          <p className="text-xs text-white/50">
            © {year} {dict.brand.name}. {dict.footer.rights}
          </p>
          <p className="text-xs text-white/40">{dict.footer.builtAs}</p>
        </div>
      </div>
    </footer>
  );
}
