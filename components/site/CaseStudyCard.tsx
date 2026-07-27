'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getIcon } from '@/lib/icons';
import { useI18n } from '@/lib/i18n/LanguageProvider';
import type { Dictionary } from '@/lib/i18n/dictionary';

type CaseStudy = Dictionary['caseStudies']['items'][number];

export function CaseStudyCard({
  study,
  index,
}: {
  study: CaseStudy;
  index: number;
}) {
  const { dict } = useI18n();
  const [open, setOpen] = useState(false);
  const Icon = getIcon(study.icon);
  const cs = dict.caseStudies;

  return (
    <article className="card-tello card-tello-hover overflow-hidden p-7">
      <div className="flex items-start gap-4">
        <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[hsl(var(--neon))/0.3] bg-[hsl(var(--neon))/0.1] text-[hsl(var(--neon))]">
          <Icon className="h-6 w-6" />
        </div>
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-[hsl(var(--neon))/0.3] bg-[hsl(var(--neon))/0.1] px-2.5 py-0.5 text-xs font-semibold text-[hsl(var(--neon))]">
              {study.tag}
            </span>
            <span className="text-xs text-white/50">{study.category}</span>
          </div>
          <h3 className="mt-2 text-xl font-bold text-white">{study.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-white/60">{study.description}</p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {study.tags.map((t) => (
          <span
            key={t}
            className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/60"
          >
            {t}
          </span>
        ))}
      </div>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-white transition-colors hover:text-[hsl(var(--neon))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--neon))]"
      >
        {open ? dict.actions.closeMenu : dict.actions.learnMore}
        {open ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </button>

      <div
        className={cn(
          'grid transition-all duration-300',
          open ? 'mt-4 grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        )}
      >
        <div className="overflow-hidden">
          <div className="border-t border-white/10 pt-5">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-[hsl(var(--neon))]">
              {cs.overviewLabel}
            </h4>
            <p className="mt-2 text-sm leading-relaxed text-white/70">{study.overview}</p>

            <h4 className="mt-6 text-sm font-semibold uppercase tracking-wider text-[hsl(var(--neon))]">
              {cs.workflowLabel}
            </h4>
            <ol className="mt-3 space-y-3">
              {study.workflow.map((s) => (
                <li key={s.step} className="flex gap-3">
                  <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-[hsl(var(--neon))/0.3] bg-[hsl(var(--neon))/0.1] text-xs font-bold text-[hsl(var(--neon))]">
                    {s.step}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-white">{s.title}</p>
                    <p className="text-sm text-white/60">{s.description}</p>
                  </div>
                </li>
              ))}
            </ol>

            <h4 className="mt-6 text-sm font-semibold uppercase tracking-wider text-[hsl(var(--neon))]">
              {cs.outcomesLabel}
            </h4>
            <ul className="mt-3 space-y-2">
              {study.outcomes.map((o) => (
                <li key={o} className="flex items-start gap-2 text-sm text-white/70">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[hsl(var(--neon))]" />
                  <span>{o}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </article>
  );
}
