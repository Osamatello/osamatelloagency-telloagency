'use client';

import { useI18n } from '@/lib/i18n/LanguageProvider';
import { useInView } from '@/lib/useInView';
import { cn } from '@/lib/utils';

type Variant = 'integrations' | 'capabilities' | 'shift' | 'path' | 'method' | 'faq' | 'cta';

const ROUTES: Record<Variant, { paths: string[]; dots: [number, number][] }> = {
  integrations: {
    paths: ['M720 0 V72 L650 118 H430 L390 150', 'M390 150 H710 L760 190', 'M390 150 L330 220 H180', 'M760 190 L700 275 H420', 'M180 220 L260 310 H590 L620 360', 'M420 275 L500 330 H590', 'M620 360 L580 430 V500'],
    dots: [[390, 150], [760, 190], [180, 220], [420, 275], [590, 330], [620, 360]],
  },
  capabilities: {
    paths: ['M580 0 V42 L520 82 H405', 'M405 82 L350 125 H285', 'M520 82 L575 155 H650', 'M350 205 H255 L210 245', 'M575 255 H690 L735 295', 'M300 350 H420 L470 390', 'M735 295 L680 420 V500'],
    dots: [[520, 82], [350, 125], [575, 155], [350, 205], [575, 255], [470, 390], [680, 420]],
  },
  shift: { paths: ['M680 0 V28 L610 62 H90 L60 92'], dots: [[610, 62], [60, 92]] },
  path: { paths: ['M60 0 V28 L105 58 H60 V92'], dots: [[105, 58], [60, 92]] },
  method: {
    paths: ['M60 0 V42 L130 82 H520', 'M520 82 L570 130 V210', 'M570 210 L620 250 V330', 'M620 330 L670 370 V440 L710 500'],
    dots: [[130, 82], [520, 82], [570, 210], [620, 330], [670, 440]],
  },
  faq: { paths: ['M710 0 V38 L760 72 V130', 'M760 370 V430 L700 500'], dots: [[760, 72], [760, 430]] },
  cta: { paths: ['M700 0 V52 L760 96 H820', 'M820 96 L760 170 H650', 'M650 170 L720 250 H820'], dots: [[760, 96], [650, 170], [820, 250]] },
};

export function NetRoute({ variant, className }: { variant: Variant; className?: string }) {
  const { dir } = useI18n();
  const { ref, inView } = useInView();
  const route = ROUTES[variant];

  return (
    <div ref={ref} aria-hidden="true" className={cn('net-route pointer-events-none absolute inset-0 z-0', className)}>
      <svg
        className={cn('h-full w-full', dir === 'rtl' && '-scale-x-100')}
        viewBox={variant === 'shift' || variant === 'path' ? '0 0 1000 100' : '0 0 1000 500'}
        preserveAspectRatio={variant === 'shift' || variant === 'path' ? 'xMidYMid meet' : 'xMidYMid slice'}
        fill="none"
      >
        <g className="net-route-base">
          {route.paths.map((path) => <path key={path} d={path} />)}
        </g>
        <g className={cn('net-route-active', inView && 'is-in')}>
          {route.paths.map((path) => <path key={path} d={path} pathLength="1" />)}
        </g>
        <g className={cn('net-route-dots', inView && 'is-in')}>
          {route.dots.map(([cx, cy], index) => (
            <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="3.5" style={{ transitionDelay: `${160 + index * 65}ms` }} />
          ))}
        </g>
      </svg>
    </div>
  );
}
