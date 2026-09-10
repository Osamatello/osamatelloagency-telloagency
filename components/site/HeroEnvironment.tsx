'use client';

import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

/**
 * The homepage background — one population of fragments, one continuous story.
 *
 * They begin locked in the zigzag formation across the hero. As the hero leaves
 * the viewport the formation releases and each fragment hands over to its own
 * free drift, so the atmosphere below the hero *is* the zigzag, disassembled —
 * not a second system fading in over it.
 *
 * After the release the per-frame work is just integrate-and-draw: no formation
 * machine, no visual states, no geometry morphing.
 */

type Fragment = {
  homeX: number; homeY: number;          // zigzag slot, normalised
  x: number; y: number;                  // free drift position, normalised
  vx: number; vy: number;                // px per second once released
  scale: number; rotation: number; spin: number; z: number;
  kind: number; color: string; phase: number; speed: number;
  swaySpeed: number; swayAmp: number;
};
type Zone = { left: number; top: number; right: number; bottom: number; soft: number; fade: number };

const COLORS = ['#2f6f55', '#3f8a68', '#6fae8d', '#96b8a5', '#c4d4c9'];
const HERO_VISIBILITY = 2.15;
const ATMOSPHERE_VISIBILITY = 1.85;
const rand = (seed: number) => {
  const value = Math.sin(seed * 91.713) * 43758.5453;
  return value - Math.floor(value);
};
const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));
const smooth = (value: number) => value * value * (3 - 2 * value);

function createFragments(count: number, compact: boolean): Fragment[] {
  return Array.from({ length: count }, (_, index) => {
    const a = rand(index + 1);
    const b = rand(index + 71);
    const c = rand(index + 149);
    const d = rand(index + 233);
    const depth = 0.25 + c * 1.15;
    const group = index % 3;
    const sequence = index / Math.max(count - 1, 1);
    const wavePhase = (sequence * (compact ? 2.35 : 3.2)) % 1;
    const zigzag = 1 - 4 * Math.abs(wavePhase - 0.5);
    const homeX = compact ? 0.5 + zigzag * 0.31 + (group - 1) * 0.022 : 0.05 + sequence * 0.9;
    const homeY = compact ? 0.08 + sequence * 0.84 : 0.5 + zigzag * 0.27 + (group - 1) * 0.026;
    // Drift speeds match the shared atmosphere on the other pages.
    const heading = a * Math.PI * 2;
    const speed = (10 + d * 20) * (0.55 + depth * 0.55);
    return {
      homeX, homeY,
      x: homeX, y: homeY,
      vx: Math.cos(heading) * speed,
      vy: Math.sin(heading) * speed * 0.72,
      scale: 0.44 + depth * 0.58,
      rotation: zigzag > 0 ? Math.PI / 4 : -Math.PI / 4,
      spin: (d - 0.5) * 0.42,
      z: 0.22 + group * 0.48 + c * 0.3,
      kind: index % 7,
      color: COLORS[index % COLORS.length],
      phase: a * Math.PI * 2,
      speed: 0.22 + b * 0.38,
      swaySpeed: 0.22 + d * 0.34,
      swayAmp: 5 + c * 13,
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
    let zones: Zone[] = [];
    let width = 0, height = 0, frame = 0, last = 0, zoneFrame = 0;

    /** 1 while the hero holds the formation, 0 once it has fully released. */
    const held = () => {
      const viewport = window.innerHeight || 1;
      return smooth(clamp(1 - (window.scrollY - viewport * 0.1) / (viewport * 0.7)));
    };

    // Content keeps its air once the fragments are loose over the page.
    const measureZones = () => {
      const page = document.getElementById('home-page')?.parentElement ?? document.body;
      const out: Zone[] = [];
      page.querySelectorAll('h1, h2, h3, p, li, dt, dd, .eyebrow, a, button').forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.bottom < -12 || r.top > height + 12 || r.width === 0) return;
        out.push({ left: r.left - 12, top: r.top - 12, right: r.right + 12, bottom: r.bottom + 12, soft: 0.17, fade: 58 });
      });
      zones = out;
    };
    const scheduleZones = () => {
      if (!zoneFrame) zoneFrame = requestAnimationFrame(() => { zoneFrame = 0; measureZones(); });
    };

    const attenuation = (x: number, y: number) => {
      let a = 1;
      for (let i = 0; i < zones.length; i++) {
        const z = zones[i];
        if (x >= z.left && x <= z.right && y >= z.top && y <= z.bottom) { if (z.soft < a) a = z.soft; continue; }
        const dx = Math.max(z.left - x, 0, x - z.right), dy = Math.max(z.top - y, 0, y - z.bottom);
        const dist = Math.hypot(dx, dy);
        if (dist < z.fade) {
          const v = z.soft + (1 - z.soft) * (dist / z.fade);
          if (v < a) a = v;
        }
      }
      return a;
    };

    const shape = (kind: number, size: number) => {
      if (kind === 4) { context.fillRect(-size, -size * 0.22, size * 2, size * 0.44); return; }
      if (kind === 5) {
        context.beginPath();
        context.moveTo(-size * 1.45, -size * 0.13); context.lineTo(size * 1.25, -size * 0.42);
        context.lineTo(size * 0.8, size * 0.18); context.lineTo(-size * 1.2, size * 0.38);
        context.closePath(); context.fill(); return;
      }
      if (kind === 6) {
        const inset = size * 0.55;
        context.beginPath();
        context.moveTo(0, -size); context.lineTo(size, -size * 0.35); context.lineTo(size, size * 0.7);
        context.lineTo(0, size); context.lineTo(-size, size * 0.35); context.lineTo(-size, -size * 0.7);
        context.closePath();
        context.moveTo(0, -size); context.lineTo(0, size);
        context.moveTo(-size, -size * 0.7); context.lineTo(inset, -size * 0.12); context.lineTo(size, -size * 0.35);
        context.stroke(); return;
      }
      context.beginPath();
      context.moveTo(0, -size); context.lineTo(size, 0); context.lineTo(0, size); context.lineTo(-size, 0);
      context.closePath();
      kind === 2 ? context.stroke() : context.fill();
    };

    const draw = (time: number, hold: number) => {
      context.clearRect(0, 0, width, height);
      const small = width < 640;
      const heroBase = small ? 3.2 : 3.6, heroReach = small ? 4.4 : 9.4;
      const atmoBase = small ? 3.4 : 4.2, atmoReach = small ? 5 : 10.5;
      const loose = 1 - hold;
      const seconds = time / 1000;

      for (const f of fragments) {
        // Position blends from the zigzag slot to the fragment's own drift.
        const idle = f.phase + time * 0.00016 * f.speed;
        const heroX = f.homeX * width + (reduced ? 0 : Math.sin(idle * 1.7) * (1.8 + f.z * 3.8));
        const heroY = f.homeY * height + (reduced ? 0 : Math.cos(idle * 1.13) * (1.8 + f.z * 3.8) * 0.72);
        const freeX = f.x * width + Math.sin(seconds * f.swaySpeed + f.phase) * f.swayAmp;
        const freeY = f.y * height + Math.cos(seconds * f.swaySpeed * 0.83 + f.phase) * f.swayAmp * 0.7;
        const x = heroX + (freeX - heroX) * loose;
        const y = heroY + (freeY - heroY) * loose;

        const size =
          (heroBase + f.z * heroReach) * f.scale * hold +
          (atmoBase + f.z * atmoReach) * loose * (f.kind === 6 && f.z > 1.15 ? 1.5 : 1);

        const heroAlpha = (0.14 + f.z * 0.105) * HERO_VISIBILITY;
        const atmoAlpha = (0.1 + f.z * 0.085) * ATMOSPHERE_VISIBILITY;
        const alpha = (heroAlpha * hold + atmoAlpha * loose) * (loose > 0.02 ? attenuation(x, y) : 1);
        if (alpha < 0.012) continue;

        context.save();
        context.translate(x, y);
        context.rotate(f.rotation);
        context.globalAlpha = alpha;
        context.fillStyle = f.color;
        context.strokeStyle = f.color;
        context.lineWidth = 1;
        shape(f.kind, size);
        context.restore();
      }
    };

    const step = (now: number) => {
      if (window.innerWidth !== width || window.innerHeight !== height) resize();
      const dt = last ? Math.min((now - last) / 1000, 0.05) : 0.016;
      last = now;
      const hold = held();
      const loose = 1 - hold;

      // Only integrate once the formation has started letting go.
      if (loose > 0.001) {
        for (const f of fragments) {
          f.x += (f.vx * dt * loose) / width;
          f.y += (f.vy * dt * loose) / height;
          if (f.x < -0.08) f.x += 1.16; else if (f.x > 1.08) f.x -= 1.16;
          if (f.y < -0.08) f.y += 1.16; else if (f.y > 1.08) f.y -= 1.16;
          f.rotation += f.spin * dt * loose;
        }
      }
      draw(now, hold);
      frame = requestAnimationFrame(step);
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const ratio = Math.min(window.devicePixelRatio || 1, 1.6);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      const count = width < 640 ? 76 : 168;
      if (fragments.length !== count) fragments = createFragments(count, width < 640);
      measureZones();
      draw(performance.now(), held());
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('scroll', scheduleZones, { passive: true });
    if (!reduced) frame = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(frame);
      if (zoneFrame) cancelAnimationFrame(zoneFrame);
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', scheduleZones);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={cn('pointer-events-none fixed inset-0 z-0 h-[100dvh] w-screen', className)}
    />
  );
}
