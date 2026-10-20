'use client';

import NextLink from 'next/link';
import { forwardRef, type ComponentProps } from 'react';
import { useI18n } from '@/lib/i18n/LanguageProvider';
import { localePath } from '@/lib/i18n/paths';

/**
 * `next/link` that keeps the reader in their language: on an Arabic page,
 * `/services` resolves to `/ar/services`. External, hash and API hrefs pass
 * through unchanged.
 */
const LocaleLink = forwardRef<HTMLAnchorElement, ComponentProps<typeof NextLink>>(function LocaleLink(
  { href, ...rest },
  ref
) {
  const { locale } = useI18n();
  const resolved = typeof href === 'string' ? localePath(href, locale) : href;
  return <NextLink ref={ref} href={resolved} {...rest} />;
});

export default LocaleLink;
