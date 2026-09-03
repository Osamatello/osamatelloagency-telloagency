'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useI18n } from '@/lib/i18n/LanguageProvider';
import { cn } from '@/lib/utils';
import { Logo } from './Logo';
import { LanguageSwitcher } from './LanguageSwitcher';

export function Header() {
  const { dict } = useI18n();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  const primaryNav = dict.nav.slice(0, 7);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500',
        scrolled
          ? 'border-b border-line bg-paper/80 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent'
      )}
    >
      <div
        className={cn(
          'container-page flex items-center justify-between gap-8 transition-[height] duration-500',
          scrolled ? 'h-16' : 'h-20 lg:h-24'
        )}
      >
        <Logo />

        {/* Desktop nav */}
        <nav
          className="hidden items-center gap-7 lg:flex xl:gap-9"
          aria-label="Primary"
        >
          {primaryNav.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'group relative py-1 text-sm transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand',
                  active ? 'text-ink' : 'text-ink-muted hover:text-ink'
                )}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className={cn(
                    'absolute -bottom-0.5 start-0 h-px bg-brand transition-[width] duration-300',
                    active ? 'w-full' : 'w-0 group-hover:w-full'
                  )}
                />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-4">
          <LanguageSwitcher className="hidden sm:inline-flex" />
          <Link
            href="/consult"
            className="btn-primary hidden px-5 py-2.5 text-sm lg:inline-flex"
          >
            {dict.actions.bookConsultation}
          </Link>

          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink transition-colors hover:bg-[hsl(var(--ds-ink)/0.04)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand lg:hidden"
            aria-label={mobileOpen ? dict.actions.closeMenu : dict.actions.menu}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile overlay */}
      <div
        id="mobile-menu"
        className={cn(
          'fixed inset-0 z-40 flex flex-col bg-paper lg:hidden',
          'transition-[opacity,transform] duration-300',
          mobileOpen
            ? 'visible opacity-100 translate-y-0'
            : 'invisible -translate-y-2 opacity-0'
        )}
      >
        <div className="container-page flex h-20 shrink-0 items-center justify-between">
          <Logo onClick={() => setMobileOpen(false)} />
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink transition-colors hover:bg-[hsl(var(--ds-ink)/0.04)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            aria-label={dict.actions.closeMenu}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav
          className="container-page flex flex-1 flex-col justify-center gap-1 py-8"
          aria-label="Mobile"
        >
          {dict.nav.map((item, i) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                aria-current={active ? 'page' : undefined}
                style={{ transitionDelay: mobileOpen ? `${80 + i * 45}ms` : '0ms' }}
                className={cn(
                  'reveal-up border-b border-line py-4 text-2xl transition-colors',
                  mobileOpen && 'is-in',
                  active ? 'text-brand' : 'text-ink hover:text-brand'
                )}
              >
                <span className="text-display">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="container-page flex shrink-0 items-center justify-between gap-4 pb-10">
          <LanguageSwitcher />
          <Link
            href="/consult"
            className="btn-primary flex-1"
            onClick={() => setMobileOpen(false)}
          >
            {dict.actions.bookConsultation}
          </Link>
        </div>
      </div>
    </header>
  );
}
