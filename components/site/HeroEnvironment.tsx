'use client';

import { useEffect, useRef } from 'react';
import { useI18n } from '@/lib/i18n/LanguageProvider';
import { cn } from '@/lib/utils';
import { PipelineTracks } from '@/components/site/PipelineTracks';

/**
 * The automation environment living behind the hero typography.
 *
 * Operational signals rendered as spatial typography (never cards) across three
 * depth layers: slow independent drift + scroll-linked parallax + a whisper of
 * pointer parallax on the nearest layer. Faint flow lines thread the space, and
 * one label keeps flipping manual → automated. Everything is charcoal/forest at
 * 4–13% opacity so the headline stays fully legible.
 *
 * Transform/opacity only. Fully static under prefers-reduced-motion. RTL-aware
 * via logical inset positioning.
 */

const SIGNALS = {
  en: [
    'Lead captured',
    'Qualified',
    'CRM updated',
    'Message received',
    'Call booked',
    'Data synced',
    'Follow-up sent',
    'Workflow running',
    'Invoice sent',
    'Report generated',
    'Reply drafted',
  ],
  ar: [
    'تم التقاط عميل',
    'تم التأهيل',
    'تحديث CRM',
    'رسالة واردة',
    'تم حجز مكالمة',
    'مزامنة البيانات',
    'إرسال متابعة',
    'سير العمل نشط',
    'إرسال فاتورة',
    'إنشاء تقرير',
    'صياغة رد',
  ],
} as const;

// top %, inline-start %, depth layer, drift keyframe, fire delay (s), keep on mobile
const PLACEMENT = [
  { top: 13, side: 4, layer: 0, drift: 'drift-a', delay: 0, m: true },
  { top: 20, side: 40, layer: 1, drift: 'drift-c', delay: 3.6, m: false }, // behind headline
  { top: 30, side: 72, layer: 1, drift: 'drift-b', delay: 1.3, m: false },
  { top: 40, side: 87, layer: 0, drift: 'drift-a', delay: 5.5, m: true },
  { top: 46, side: 2, layer: 2, drift: 'drift-c', delay: 3.0, m: false }, // behind headline
  { top: 55, side: 29, layer: 0, drift: 'drift-b', delay: 6.2, m: true },
  { top: 58, side: 66, layer: 1, drift: 'drift-a', delay: 2.1, m: false },
  { top: 66, side: 46, layer: 2, drift: 'drift-b', delay: 5.1, m: false }, // behind headline
  { top: 74, side: 10, layer: 1, drift: 'drift-c', delay: 4.0, m: true },
  { top: 82, side: 57, layer: 2, drift: 'drift-a', delay: 0.7, m: false },
  { top: 90, side: 30, layer: 0, drift: 'drift-b', delay: 7.4, m: true },
] as const;

export function HeroEnvironment({ className }: { className?: string }) {
  const { dir, locale } = useI18n();
  const labels = SIGNALS[locale === 'ar' ? 'ar' : 'en'];
  const rtl = dir === 'rtl';

  const layer0 = useRef<HTMLDivElement>(null);
  const layer1 = useRef<HTMLDivElement>(null);
  const layer2 = useRef<HTMLDivElement>(null);
  const layerRefs = [layer0, layer1, layer2];

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reduce.matches) return;

    const fine = window.matchMedia('(pointer: fine)').matches;
    // near → far: layer 2 (near) moves most
    const scrollF = [0.03, 0.06, 0.1];
    const mouseF = [0, 0.004, 0.01];
    const dirSign = rtl ? -1 : 1;

    let sy = window.scrollY;
    let mx = 0;
    let raf = 0;

    const apply = () => {
      raf = 0;
      for (let i = 0; i < layerRefs.length; i++) {
        const el = layerRefs[i].current;
        if (!el) continue;
        const ty = sy * scrollF[i];
        const tx = mx * mouseF[i] * dirSign;
        el.style.transform = `translate3d(${tx.toFixed(2)}px, ${ty.toFixed(2)}px, 0)`;
      }
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(apply);
    };
    const onScroll = () => {
      sy = window.scrollY;
      schedule();
    };
    const onMove = (e: MouseEvent) => {
      mx = e.clientX - window.innerWidth / 2;
      schedule();
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    if (fine) window.addEventListener('mousemove', onMove, { passive: true });
    apply();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('mousemove', onMove);
      if (raf) cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rtl]);

  const grouped: number[][] = [[], [], []];
  PLACEMENT.forEach((p, i) => grouped[p.layer].push(i));

  return (
    <div
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute inset-0 z-0 overflow-hidden [contain:paint]',
        className
      )}
    >
      {/* flow lines — faint automation paths threading the space */}
      <PipelineTracks
        className="hero-env-flow absolute inset-0 h-full w-full"
        paths={[
          'M2 9 L34 13 L70 10 L97 19',
          'M97 19 L88 45 L93 70 L80 93',
          'M2 61 L30 69 L52 65 L46 90 M30 69 L7 86',
          'M80 93 L52 65',
          'M46 90 L58 95 L72 100 M80 93 L72 100',
        ]}
      />

      {grouped.map((idxs, layer) => (
        <div
          key={layer}
          ref={layerRefs[layer]}
          className="absolute inset-0 will-change-transform"
        >
          {idxs.map((i) => {
            const p = PLACEMENT[i];
            return (
              <div
                key={i}
                className={cn('absolute', p.drift, !p.m && 'hidden sm:block')}
                style={{
                  top: `${p.top}%`,
                  insetInlineStart: `${p.side}%`,
                  animationDelay: `${(p.delay * 1.7).toFixed(1)}s`,
                }}
              >
                <span
                  className={cn('hero-signal', `sig-${p.layer}`)}
                  style={{ animationDelay: `${p.delay}s` }}
                >
                  {labels[i]}
                </span>
              </div>
            );
          })}

          {/* manual → automated lives on the mid layer */}
          {layer === 1 && (
            <div
              className="drift-b absolute"
              style={{ top: '28%', insetInlineStart: '8%', animationDelay: '2s' }}
            >
              <ManualToAuto rtl={rtl} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function ManualToAuto({ rtl }: { rtl: boolean }) {
  return (
    <span className="hero-signal relative inline-block whitespace-nowrap">
      <span className="invisible">{rtl ? 'مؤتمت' : 'Automated'}</span>
      <span className="mta-manual absolute inset-0">{rtl ? 'يدوي' : 'Manual'}</span>
      <span className="mta-auto absolute inset-0 text-brand">
        {rtl ? 'مؤتمت' : 'Automated'}
      </span>
    </span>
  );
}
