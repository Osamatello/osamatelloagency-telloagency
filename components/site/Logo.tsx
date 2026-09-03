'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useI18n } from '@/lib/i18n/LanguageProvider';
import { cn } from '@/lib/utils';

/**
 * Header lockup:  [official DS mark]  DAMASAVERO
 *
 * The mark is the supplied official DAMASAVERO logo — a transparent-background
 * PNG at `public/brand/damasavero-logo.png` — rendered as-is at its native
 * proportions (`h-8 w-auto`). It is NOT redrawn, recoloured or cropped.
 *
 * If the file is not present the header falls back to the wordmark alone
 * (never to a reconstruction). Swap for an official SVG later at the same path.
 */
export function Logo({
  className,
  onClick,
}: {
  className?: string;
  onClick?: () => void;
}) {
  const { brand } = useI18n().dict;
  const [markOk, setMarkOk] = useState(true);

  return (
    <Link
      href="/"
      onClick={onClick}
      className={cn(
        'inline-flex items-center gap-3 text-ink transition-opacity duration-200 hover:opacity-70',
        className
      )}
      aria-label={brand.name}
    >
      {markOk && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src="/brand/damasavero-logo.png?v=3"
          alt=""
          className="h-8 w-auto shrink-0"
          onError={() => setMarkOk(false)}
        />
      )}
      <span className="text-[0.95rem] font-semibold uppercase tracking-[0.3em] leading-none">
        {brand.name}
      </span>
    </Link>
  );
}
