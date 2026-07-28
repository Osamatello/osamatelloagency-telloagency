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
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled
          ? 'border-b border-white/10 bg-[hsl(var(--background))]/85 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent'
      )}
    >
      <div className="container-tello flex h-16 items-center justify-between gap-4 lg:h-[72px]">
        <Logo />

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {dict.nav.slice(0, 7).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'relative px-3 py-2 text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--neon))]',
                isActive(item.href)
                  ? 'text-[hsl(var(--neon))]'
                  : 'text-white/70 hover:text-white',
                'after:absolute after:bottom-0 after:left-3 after:right-3 after:h-0.5 after:bg-[hsl(var(--neon))] after:scale-x-0 after:transition-transform after:duration-200 hover:after:scale-x-100',
                isActive(item.href) && 'after:scale-x-100'
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSwitcher className="hidden sm:inline-flex" />
          <Link href="/consult" className="btn-neon hidden h-10 px-4 py-2 lg:inline-flex">
            {dict.actions.bookConsultation}
          </Link>

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/10 bg-white/5 text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--neon))] lg:hidden"
            aria-label={mobileOpen ? dict.actions.closeMenu : dict.actions.menu}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu overlay */}
      <div
        id="mobile-menu"
        className={cn(
          'fixed inset-x-0 top-16 bottom-0 z-40 lg:hidden',
          mobileOpen ? 'visible' : 'invisible'
        )}
      >
        <div
          className={cn(
            'absolute inset-0 bg-[hsl(var(--background))]/95 backdrop-blur-xl transition-opacity duration-300',
            mobileOpen ? 'opacity-100' : 'opacity-0'
          )}
          onClick={() => setMobileOpen(false)}
        />
        <nav
          className={cn(
            'absolute inset-x-0 top-0 max-h-full overflow-y-auto border-b border-white/10 bg-[hsl(var(--background))] px-5 pb-8 pt-4 transition-transform duration-300',
            mobileOpen ? 'translate-y-0' : '-translate-y-full'
          )}
          aria-label="Mobile"
        >
          <div className="mb-2 flex justify-end">
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/10 bg-white/5 text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--neon))]"
              aria-label={dict.actions.closeMenu}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="flex flex-col gap-1">
            {dict.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  'rounded-lg px-4 py-3 text-base font-medium transition-colors',
                  isActive(item.href)
                    ? 'bg-[hsl(var(--neon))/0.1] text-white'
                    : 'text-white/80 hover:bg-white/5 hover:text-white'
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="mt-5 flex items-center justify-between gap-4">
            <LanguageSwitcher />
            <Link href="/consult" className="btn-neon flex-1" onClick={() => setMobileOpen(false)}>
              {dict.actions.bookConsultation}
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
