'use client';

import { useI18n } from '@/lib/i18n/LanguageProvider';
import { cn } from '@/lib/utils';
import { PipelineTracks } from '@/components/site/PipelineTracks';

type Variant = 'integrations' | 'capabilities' | 'shift' | 'path' | 'method' | 'faq' | 'cta';

const ROUTES: Record<Variant, string[]> = {
  integrations: [
    'M18 0 L22 7 L18 11 H10',
    'M46 0 V8 L42 12 H34',
    'M72 0 L70 3 L76 9 H86',
  ],
  capabilities: [
    'M58 0 V7 L54 11 H42',
    'M13 24 H20 L24 28',
    'M78 40 H84 L88 44',
    'M12 58 H19 L23 62',
    'M79 76 H85 L89 80',
    'M68 93 L68 100',
  ],
  shift: ['M68 0 V3 L62 7 H12 L7 12'],
  path: ['M7 0 V4 L11 8 H7 V12'],
  method: [
    'M7 0 V8 L13 14 H38',
    'M68 27 H74 L78 31',
    'M72 50 H78 L82 54',
    'M68 73 H74 L78 77',
    'M78 77 L73 89 V100',
  ],
  faq: ['M73 0 V5 L78 9 V15', 'M76 92 L70 100'],
  cta: ['M70 0 V10 L76 18 H86', 'M86 18 L79 32 H70', 'M70 32 L77 46 H87'],
};

export function NetRoute({ variant, className }: { variant: Variant; className?: string }) {
  const { dir } = useI18n();

  return (
    <div
      aria-hidden="true"
      className={cn(
        'net-route pointer-events-none absolute inset-0 z-0',
        variant === 'integrations' && 'net-route--integration',
        className
      )}
    >
      <PipelineTracks
        className={cn('h-full w-full', dir === 'rtl' && '-scale-x-100')}
        paths={ROUTES[variant]}
        viewBox={variant === 'integrations' ? '0 0 100 65' : undefined}
      />
    </div>
  );
}
