'use client';

import { useRef, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface MagneticTextProps {
  children: ReactNode;
  className?: string;
  strength?: number;
  as?: 'span' | 'div' | 'p' | 'h3';
}

export function MagneticText({
  children,
  className,
  strength = 0.35,
  as: Tag = 'span',
}: MagneticTextProps) {
  const ref = useRef<HTMLElement>(null);

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const rect = el.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    el.style.transform = `translate(${relX * strength}px, ${relY * strength}px)`;
  };

  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = 'translate(0, 0)';
  };

  return (
    <Tag
      ref={ref as React.Ref<any>}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={cn('inline-block transition-transform duration-300 ease-out will-change-transform', className)}
    >
      {children}
    </Tag>
  );
}
