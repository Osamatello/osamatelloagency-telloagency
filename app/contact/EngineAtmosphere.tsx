'use client';

import { useEffect, useRef } from 'react';

type Fragment = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  kind: number;
  color: string;
  rotation: number;
  spin: number;
  phase: number;
};

type Zone = {
  left: number;
  top: number;
  right: number;
  bottom: number;
};

const COLORS = ['#173e32', '#315f4d', '#78917f', '#a8b5a8', '#c9cec5'];

function seeded(seed: number) {
  const value = Math.sin(seed * 91.713) * 43758.5453;
  return value - Math.floor(value);
}

function makeFragments(count: number): Fragment[] {
  return Array.from({ length: count }, (_, index) => {
    const a = seeded(index + 3);
    const b = seeded(index + 71);
    const c = seeded(index + 151);
    const d = seeded(index + 229);
    const angle = a * Math.PI * 2;
    const speed = 5 + c * 10;

    return {
      x: a,
      y: b,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed * 0.65,
      size: 4 + d * 8,
      kind: index % 5,
      color: COLORS[index % COLORS.length],
      rotation: c * Math.PI * 2,
      spin: (d - 0.5) * 0.18,
      phase: b * Math.PI * 2,
    };
  });
}

export function EngineAtmosphere() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let width = 0;
    let height = 0;
    let frame = 0;
    let previous = 0;
    let fragments: Fragment[] = [];
    let zones: Zone[] = [];

    const measureZones = () => {
      const page = document.getElementById('contact-page');
      if (!page) return;
      zones = Array.from(page.querySelectorAll('[data-contact-content], form')).map((element) => {
        const rect = element.getBoundingClientRect();
        const pad = 22;
        return {
          left: rect.left - pad,
          top: rect.top - pad,
          right: rect.right + pad,
          bottom: rect.bottom + pad,
        };
      });
    };

    const attenuation = (x: number, y: number) => {
      for (const zone of zones) {
        if (x >= zone.left && x <= zone.right && y >= zone.top && y <= zone.bottom) return 0.08;
      }
      return 1;
    };

    const drawShape = (fragment: Fragment) => {
      const s = fragment.size;
      if (fragment.kind === 0) {
        context.beginPath();
        context.moveTo(0, -s);
        context.lineTo(s, 0);
        context.lineTo(0, s);
        context.lineTo(-s, 0);
        context.closePath();
        context.fill();
        return;
      }
      if (fragment.kind === 1) {
        context.strokeRect(-s * 0.65, -s * 0.65, s * 1.3, s * 1.3);
        return;
      }
      if (fragment.kind === 2) {
        context.fillRect(-s * 1.3, -s * 0.16, s * 2.6, s * 0.32);
        return;
      }
      if (fragment.kind === 3) {
        context.beginPath();
        context.moveTo(-s * 1.2, -s * 0.18);
        context.lineTo(s, -s * 0.48);
        context.lineTo(s * 0.75, s * 0.2);
        context.lineTo(-s, s * 0.42);
        context.closePath();
        context.fill();
        return;
      }
      context.beginPath();
      context.moveTo(0, -s);
      context.lineTo(s, -s * 0.25);
      context.lineTo(s * 0.8, s * 0.7);
      context.lineTo(0, s);
      context.lineTo(-s * 0.8, s * 0.35);
      context.lineTo(-s, -s * 0.55);
      context.closePath();
      context.stroke();
    };

    const draw = (time: number) => {
      context.clearRect(0, 0, width, height);
      fragments.forEach((fragment) => {
        const x = fragment.x * width + Math.sin(time * 0.18 + fragment.phase) * 7;
        const y = fragment.y * height + Math.cos(time * 0.15 + fragment.phase) * 5;
        const alpha = (0.08 + fragment.size * 0.004) * attenuation(x, y);
        if (alpha < 0.01) return;

        context.save();
        context.translate(x, y);
        context.rotate(fragment.rotation);
        context.globalAlpha = alpha;
        context.fillStyle = fragment.color;
        context.strokeStyle = fragment.color;
        context.lineWidth = 1;
        drawShape(fragment);
        context.restore();
      });
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      const count = width < 640 ? 14 : Math.max(20, Math.min(48, Math.round((width * height) / 43000)));
      fragments = makeFragments(count);
      measureZones();
      draw(performance.now() / 1000);
    };

    const step = (now: number) => {
      const dt = previous ? Math.min((now - previous) / 1000, 0.05) : 0.016;
      previous = now;

      fragments.forEach((fragment) => {
        fragment.x += (fragment.vx * dt) / width;
        fragment.y += (fragment.vy * dt) / height;
        fragment.rotation += fragment.spin * dt;
        if (fragment.x < -0.08) fragment.x = 1.08;
        if (fragment.x > 1.08) fragment.x = -0.08;
        if (fragment.y < -0.08) fragment.y = 1.08;
        if (fragment.y > 1.08) fragment.y = -0.08;
      });

      draw(now / 1000);
      frame = requestAnimationFrame(step);
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('scroll', measureZones, { passive: true });
    if (!reducedMotion) frame = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', measureZones);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-[100dvh] w-screen"
    />
  );
}
