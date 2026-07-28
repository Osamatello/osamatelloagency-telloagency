'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { useI18n } from '@/lib/i18n/LanguageProvider';
import { HelpCircle, FileText, Code2, Rocket, ArrowRight, ArrowLeft } from 'lucide-react';
import type { StepItem } from '@/lib/i18n/dictionary';

export function VerticalTimeline({
  steps,
  className,
}: {
  steps: StepItem[];
  className?: string;
}) {
  const { dir } = useI18n();
  const isRtl = dir === 'rtl';

  // Map step index to an icon
  const getStepIcon = (index: number) => {
    switch (index) {
      case 0:
        return <HelpCircle className="h-5 w-5" />;
      case 1:
        return <FileText className="h-5 w-5" />;
      case 2:
        return <Code2 className="h-5 w-5" />;
      case 3:
        return <Rocket className="h-5 w-5" />;
      default:
        return <HelpCircle className="h-5 w-5" />;
    }
  };

  return (
    <div className={cn('relative w-full max-w-4xl mx-auto py-10 px-4', className)}>
      {/* Central Timeline track line */}
      <div 
        className={cn(
          "absolute top-0 bottom-0 w-0.5 bg-zinc-800 z-0",
          "left-6 md:left-1/2 md:translate-x-[-50%]",
          isRtl ? "right-6 left-auto md:right-1/2 md:translate-x-[50%]" : ""
        )}
      />

      {/* Glowing animated line on top of track */}
      <div 
        className={cn(
          "absolute top-0 h-3/4 w-0.5 bg-gradient-to-b from-[hsl(var(--neon))] to-transparent z-0 animate-pulse",
          "left-6 md:left-1/2 md:translate-x-[-50%]",
          isRtl ? "right-6 left-auto md:right-1/2 md:translate-x-[50%]" : ""
        )}
      />

      <div className="space-y-12 relative z-10">
        {steps.map((s, i) => {
          const isEven = i % 2 === 0;

          return (
            <div 
              key={s.step} 
              className={cn(
                "flex flex-col md:flex-row items-start md:items-center relative",
                isEven ? "md:flex-row-reverse" : ""
              )}
            >
              {/* Timeline Center Dot Badge */}
              <div 
                className={cn(
                  "absolute flex h-10 w-10 items-center justify-center rounded-full border-2 border-[hsl(var(--neon))] bg-zinc-950 text-[hsl(var(--neon))] shadow-[0_0_12px_hsl(var(--neon)/0.2)]",
                  "left-1 md:left-1/2 md:translate-x-[-50%]",
                  isRtl ? "right-1 left-auto md:right-1/2 md:translate-x-[50%]" : ""
                )}
              >
                {getStepIcon(i)}
              </div>

              {/* Spacer on desktop to push card to side */}
              <div className="hidden md:block md:w-1/2" />

              {/* Card Container */}
              <div 
                className={cn(
                  "w-full md:w-1/2 pl-14 md:pl-8 md:pr-8",
                  isRtl ? "pr-14 md:pr-8 md:pl-8" : "",
                  isEven ? "md:text-right md:pl-0 md:pr-8" : "md:pr-0 md:pl-8"
                )}
              >
                <div className="card-tello border-white/5 bg-slate-950/40 p-5 rounded-2xl inline-block w-full max-w-md hover:border-[hsl(var(--neon))/0.2] transition-all duration-300">
                  <span className="text-[10px] font-bold text-[hsl(var(--neon))] uppercase tracking-widest bg-[hsl(var(--neon))/0.08] px-2.5 py-0.5 rounded-full border border-[hsl(var(--neon))/0.2]">
                    {s.step}
                  </span>
                  <h3 className="mt-3 text-base font-semibold text-white tracking-tight leading-tight">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-white/50">
                    {s.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
