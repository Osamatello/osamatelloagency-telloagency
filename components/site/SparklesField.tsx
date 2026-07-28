'use client';

import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface Sparkle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  baseAlpha: number;
  twinkle: number;
  twinkleSpeed: number;
}

interface SparklesFieldProps {
  className?: string;
  density?: number;
  color?: string;
}

export function SparklesField({
  className = '',
  density = 1200,
  color,
}: SparklesFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Canvas cannot resolve CSS custom properties, so read the computed value.
    const neonVar = getComputedStyle(document.documentElement)
      .getPropertyValue('--neon')
      .trim();
    const resolvedColor = color || (neonVar ? `hsl(${neonVar})` : '#22c55e');

    let sparkles: Sparkle[] = [];
    let animationId = 0;
    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const area = width * height;
      const count = Math.min(Math.floor(area / density), 180);
      sparkles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        size: Math.random() * 1.8 + 0.6,
        baseAlpha: Math.random() * 0.5 + 0.15,
        twinkle: Math.random() * Math.PI * 2,
        twinkleSpeed: Math.random() * 0.025 + 0.008,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      for (const s of sparkles) {
        s.x += s.vx;
        s.y += s.vy;
        s.twinkle += s.twinkleSpeed;

        if (s.x < -10) s.x = width + 10;
        if (s.x > width + 10) s.x = -10;
        if (s.y < -10) s.y = height + 10;
        if (s.y > height + 10) s.y = -10;

        const alpha = s.baseAlpha * (0.4 + 0.6 * Math.sin(s.twinkle));
        ctx.beginPath();
        ctx.fillStyle = resolvedColor;
        ctx.globalAlpha = alpha;
        ctx.shadowBlur = 8;
        ctx.shadowColor = resolvedColor;
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
      animationId = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, [density, color]);

  return (
    <canvas
      ref={canvasRef}
      className={cn('pointer-events-none', className)}
      aria-hidden="true"
    />
  );
}
