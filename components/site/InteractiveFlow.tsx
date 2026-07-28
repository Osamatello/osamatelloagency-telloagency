'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { useI18n } from '@/lib/i18n/LanguageProvider';
import { MousePointerClick, UserPlus, Database, MessageSquareCheck, Star, ArrowRight, ArrowLeft } from 'lucide-react';
import type { StepItem } from '@/lib/i18n/dictionary';

export function InteractiveFlow({
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
        return <MousePointerClick className="h-5 w-5" />;
      case 1:
        return <UserPlus className="h-5 w-5" />;
      case 2:
        return <Database className="h-5 w-5" />;
      case 3:
        return <MessageSquareCheck className="h-5 w-5" />;
      case 4:
        return <Star className="h-5 w-5" />;
      default:
        return <MousePointerClick className="h-5 w-5" />;
    }
  };

  return (
    <div className={cn('relative w-full overflow-hidden py-6', className)}>
      {/* Inline styles for custom dash animation */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes flowchart-flow {
          to {
            stroke-dashoffset: -20;
          }
        }
        .flow-path-animated {
          stroke-dasharray: 6 6;
          animation: flowchart-flow 1s linear infinite;
        }
      `}} />

      <div className="grid gap-8 grid-cols-1 lg:grid-cols-5 relative items-start">
        {steps.map((s, i) => {
          const isLast = i === steps.length - 1;
          return (
            <div key={s.step} className="relative flex flex-col items-center text-center group">
              {/* Card wrapper */}
              <div className="relative z-10 w-full card-tello border-white/5 bg-slate-950/40 p-5 rounded-2xl flex flex-col items-center hover:border-[hsl(var(--neon))/0.2] transition-all duration-300">
                {/* Node Step badge with glowing border */}
                <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-[hsl(var(--neon))/0.3] bg-zinc-950 text-[hsl(var(--neon))] group-hover:border-[hsl(var(--neon))] group-hover:shadow-[0_0_18px_hsl(var(--neon)/0.3)] transition-all duration-300">
                  {getStepIcon(i)}
                  <span className="absolute -top-2.5 -right-2.5 flex h-5 w-5 items-center justify-center rounded-full bg-zinc-900 border border-white/10 text-[9px] font-bold text-white/70">
                    {s.step}
                  </span>
                </div>

                <h3 className="mt-4 text-sm font-semibold text-white tracking-tight leading-tight">
                  {s.title}
                </h3>
                <p className="mt-2 text-2xs leading-relaxed text-white/50">
                  {s.description}
                </p>
              </div>

              {/* Connecting line for desktop screens */}
              {!isLast && (
                <div 
                  className={cn(
                    "absolute top-12 hidden lg:block z-0 w-full translate-y-[-50%]",
                    isRtl ? "right-[50%] left-auto" : "left-[50%] right-auto"
                  )}
                  style={{ width: 'calc(100% + 2rem)' }}
                >
                  <svg className="w-full h-4 overflow-visible" fill="none">
                    <path
                      d={isRtl ? "M 10,8 L 190,8" : "M 0,8 L 180,8"}
                      stroke="hsl(var(--neon) / 0.15)"
                      strokeWidth="2"
                    />
                    <path
                      d={isRtl ? "M 10,8 L 190,8" : "M 0,8 L 180,8"}
                      stroke="hsl(var(--neon))"
                      strokeWidth="2"
                      strokeLinecap="round"
                      className="flow-path-animated"
                    />
                  </svg>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
