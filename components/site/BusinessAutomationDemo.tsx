'use client';

import { useEffect, useState } from 'react';
import { useI18n } from '@/lib/i18n/LanguageProvider';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

/**
 * The automation shown as a sequence woven into the hero — not a dashboard.
 * One inbound enquiry runs through six steps; a forest line threads them as
 * the "playhead" advances, the raw enquiry text resolves into the automated
 * outcome, and a quiet status tag ticks over to "system live". Loops.
 */

const COPY = {
  en: {
    idle: 'Idle',
    running: 'Running',
    live: 'System live',
    automated: 'automated',
    raw: '“Can someone call me about a quote this week?”',
    outcome: 'Booked · Wed 14:00 · confirmed · logged to CRM',
    steps: [
      'New enquiry',
      'Qualify',
      'Update CRM',
      'Book call',
      'Confirm',
      'Follow-up',
    ],
  },
  ar: {
    idle: 'متوقّف',
    running: 'قيد التشغيل',
    live: 'النظام يعمل',
    automated: 'مؤتمتة',
    raw: '«هل يمكن لأحد الاتصال بي بخصوص عرض سعر هذا الأسبوع؟»',
    outcome: 'تم الحجز · الأربعاء 14:00 · تأكيد · مُسجّل في CRM',
    steps: [
      'طلب جديد',
      'تأهيل',
      'تحديث CRM',
      'حجز مكالمة',
      'تأكيد',
      'متابعة',
    ],
  },
} as const;

export function BusinessAutomationDemo({ className }: { className?: string }) {
  const { dir } = useI18n();
  const t = dir === 'rtl' ? COPY.ar : COPY.en;
  const total = t.steps.length;

  // -1 idle · 0..total-1 running · total = done/live
  const [active, setActive] = useState(-1);
  const [mounted, setMounted] = useState(false);
  const atStart = active === -1;

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    timers.push(setTimeout(() => setActive(0), 700));
    for (let i = 1; i < total; i++) {
      timers.push(setTimeout(() => setActive(i), 700 + i * 1150));
    }
    timers.push(setTimeout(() => setActive(total), 700 + total * 1150));
    timers.push(setTimeout(() => setActive(-1), 700 + total * 1150 + 3600));
    return () => timers.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [atStart, total]);

  const done = active >= total;
  // count always equals the number of filled nodes (i <= active)
  const count = done ? total : Math.min(Math.max(active + 1, 0), total);
  const fillPct = done ? 100 : Math.max(0, (active / (total - 1)) * 100);
  const status = active < 0 ? t.idle : done ? t.live : t.running;

  return (
    <div
      className={cn(
        'reveal-fade w-full max-w-sm',
        mounted && 'is-in',
        className
      )}
    >
      {/* status line */}
      <div className="flex items-center gap-3 text-[0.68rem] font-medium uppercase tracking-[0.2em] text-ink-faint">
        <span
          className={cn(
            'h-1.5 w-1.5 rounded-full transition-colors duration-300',
            active < 0 ? 'bg-line-strong' : 'bg-brand',
            active >= 0 && !done && 'animate-pulse'
          )}
        />
        <span className={cn(done && 'text-brand')}>{status}</span>
        <span className="ms-auto tabular-nums text-ink">
          {count}/{total}{' '}
          <span className="text-ink-faint">{t.automated}</span>
        </span>
      </div>

      {/* transforming enquiry line */}
      <p className="mt-6 min-h-[3.25rem] text-[0.95rem] leading-relaxed sm:text-base">
        {done ? (
          <span className="inline-flex items-start gap-2 text-ink">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
            {t.outcome}
          </span>
        ) : (
          <span className="text-ink-muted">{t.raw}</span>
        )}
      </p>

      {/* the sequence */}
      <ol className="relative mt-7">
        <span
          aria-hidden="true"
          className="absolute top-2 bottom-2 w-px bg-line"
          style={{ insetInlineStart: '5px' }}
        />
        <span
          aria-hidden="true"
          className="absolute top-2 w-px bg-brand transition-[height] duration-500 ease-out"
          style={{ insetInlineStart: '5px', height: `calc(${fillPct}% * 0.86)` }}
        />
        {t.steps.map((label, i) => {
          const on = i <= active || done;
          return (
            <li key={label} className="relative flex items-center gap-4 py-[0.6rem]">
              <span
                className={cn(
                  'relative z-10 h-[11px] w-[11px] shrink-0 rounded-full border-2 transition-colors duration-300',
                  on
                    ? 'border-brand bg-brand'
                    : 'border-line-strong bg-[hsl(var(--ds-paper))]'
                )}
              />
              <span
                className={cn(
                  'flex-1 text-[0.7rem] font-medium uppercase tracking-[0.16em] transition-colors duration-300',
                  on ? 'text-ink' : 'text-ink-faint'
                )}
              >
                {label}
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
