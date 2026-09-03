'use client';

import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

type Point = { x: number; y: number };
type Fragment = { depth: number; rotation: number; kind: number; states: [Point, Point, Point, Point] };

const COLORS = ['#173e32', '#315f4d', '#78917f', '#a8b5a8', '#c9cec5'];
const rand = (seed: number) => {
  const value = Math.sin(seed * 91.713) * 43758.5453;
  return value - Math.floor(value);
};
const smooth = (value: number) => value * value * (3 - 2 * value);

function createFragments(count: number): Fragment[] {
  return Array.from({ length: count }, (_, index) => {
    const a = rand(index + 1);
    const b = rand(index + 71);
    const c = rand(index + 149);
    const angle = index * 2.39996;
    const radius = 0.06 + Math.sqrt(a) * 0.25;
    const lane = (index % 9) / 8;
    return {
      depth: 0.35 + c * 0.85,
      rotation: b * Math.PI,
      kind: index % 4,
      states: [
        { x: 0.04 + a * 0.92, y: 0.06 + b * 0.86 },
        { x: 0.73 + Math.cos(angle) * radius, y: 0.47 + Math.sin(angle) * radius * 1.18 },
        { x: 0.08 + lane * 0.86, y: 0.53 + Math.sin(lane * Math.PI * 2.4 + b) * 0.16 },
        { x: 0.58 + Math.cos(angle * 0.72) * (0.12 + a * 0.31), y: 0.49 + Math.sin(angle * 1.13) * (0.1 + b * 0.32) },
      ],
    };
  });
}

export function HeroEnvironment({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let fragments: Fragment[] = [];
    let width = 0;
    let height = 0;
    let target = reduced ? 0.33 : 0;
    let progress = target;
    let frame = 0;
    let visible = true;

    const positionAt = (fragment: Fragment) => {
      const scaled = Math.min(2.999, Math.max(0, progress * 3));
      const state = Math.floor(scaled);
      const amount = smooth(scaled - state);
      const from = fragment.states[state];
      const to = fragment.states[Math.min(state + 1, 3)];
      return { x: from.x + (to.x - from.x) * amount, y: from.y + (to.y - from.y) * amount };
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);
      context.save();
      context.strokeStyle = 'rgba(49, 95, 77, 0.085)';
      context.lineWidth = 1;
      context.beginPath();
      context.moveTo(width * 0.59, height * (0.16 + progress * 0.04));
      context.lineTo(width * 0.91, height * (0.29 - progress * 0.02));
      context.lineTo(width * 0.82, height * (0.73 + progress * 0.02));
      context.lineTo(width * 0.54, height * (0.68 - progress * 0.02));
      context.closePath();
      context.stroke();
      context.restore();

      fragments.forEach((fragment, index) => {
        const point = positionAt(fragment);
        const x = point.x * width;
        const y = point.y * height + (progress - 0.5) * 22 * fragment.depth;
        const textZone = point.x < 0.57 && point.y < 0.76;
        const size = (width < 640 ? 3.5 : 5) + fragment.depth * 5;
        context.save();
        context.translate(x, y);
        context.rotate(fragment.rotation + progress * (fragment.kind % 2 ? 0.8 : -0.55));
        context.fillStyle = COLORS[index % COLORS.length];
        context.strokeStyle = COLORS[index % COLORS.length];
        context.globalAlpha = (textZone ? 0.075 : 0.2) * fragment.depth;
        if (fragment.kind === 3) {
          context.fillRect(-size * 0.75, -size * 0.25, size * 1.5, size * 0.5);
        } else {
          context.beginPath();
          context.moveTo(0, -size);
          context.lineTo(size, 0);
          context.lineTo(0, size);
          context.lineTo(-size, 0);
          context.closePath();
          fragment.kind === 2 ? context.stroke() : context.fill();
        }
        context.restore();
      });
    };

    const resize = () => {
      const box = canvas.getBoundingClientRect();
      width = box.width;
      height = box.height;
      const ratio = Math.min(window.devicePixelRatio || 1, 1.6);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      fragments = createFragments(width < 640 ? 44 : 108);
      draw();
    };
    const updateTarget = () => {
      if (reduced) return;
      const rect = canvas.getBoundingClientRect();
      target = Math.min(1, Math.max(0, -rect.top / Math.max(rect.height * 0.82, 1)));
    };
    const animate = () => {
      if (!visible) return;
      progress += (target - progress) * 0.085;
      draw();
      frame = requestAnimationFrame(animate);
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !frame && !reduced) frame = requestAnimationFrame(animate);
      if (!visible && frame) { cancelAnimationFrame(frame); frame = 0; }
    });

    resize();
    updateTarget();
    observer.observe(canvas);
    window.addEventListener('resize', resize);
    window.addEventListener('scroll', updateTarget, { passive: true });
    if (!reduced) frame = requestAnimationFrame(animate);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', updateTarget);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className={cn('pointer-events-none absolute inset-0 z-0 h-full w-full', className)} />;
}
