'use client';

import { useEffect, useRef } from 'react';

/**
 * Engine Atmosphere — the Capabilities page's secondary environment.
 *
 * Same shared DAMASAVERO fragment language as the Homepage engine (filled and
 * outlined diamonds, thin bars, slanted shards, faceted outlines, the same
 * forest/sage/neutral palette) with none of its choreography: no formations,
 * no visual states, no scroll linkage. Fragments drift, sway and rotate on
 * their own, continuously, behind the whole page.
 *
 * The Assembly stays the primary visual: it is given a wide, hard exclusion,
 * and content boxes attenuate the fragments, so the atmosphere lives in the
 * negative space around the composition.
 */

type Fragment = {
  x: number; y: number; vx: number; vy: number;
  depth: number; kind: number; color: string;
  rot: number; spin: number;
  phase: number; swaySpeed: number; swayAmp: number;
};
type Zone = { left: number; top: number; right: number; bottom: number; soft: number; fade: number };

const COLORS = ['#173e32', '#315f4d', '#78917f', '#a8b5a8', '#c9cec5'];
const VISIBILITY = 1.85;
const rand = (seed: number) => {
  const value = Math.sin(seed * 91.713) * 43758.5453;
  return value - Math.floor(value);
};

function createFragments(count: number): Fragment[] {
  return Array.from({ length: count }, (_, i) => {
    const a = rand(i + 1), b = rand(i + 71), c = rand(i + 149), d = rand(i + 233), e = rand(i + 317);
    const depth = 0.25 + c * 1.15;
    const speed = (10 + d * 20) * (0.55 + depth * 0.55);
    const heading = a * Math.PI * 2;
    return {
      x: a, y: b,
      vx: Math.cos(heading) * speed,
      vy: Math.sin(heading) * speed * 0.72,
      depth,
      kind: i % 7,
      color: COLORS[i % COLORS.length],
      rot: e * Math.PI * 2,
      spin: (d - 0.5) * 0.42,
      phase: b * Math.PI * 2,
      swaySpeed: 0.22 + e * 0.34,
      swayAmp: 5 + c * 13,
    };
  });
}

export function EngineAtmosphere() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let fragments: Fragment[] = [];
    let zones: Zone[] = [];
    let width = 0, height = 0, frame = 0, last = 0, zoneFrame = 0;

    const measureZones = () => {
      const page = document.getElementById('capabilities-page');
      if (!page) return;
      const out: Zone[] = [];
      const push = (el: Element, pad: number, soft: number, fade: number) => {
        const r = el.getBoundingClientRect();
        if (r.bottom < -pad || r.top > height + pad || r.width === 0) return;
        out.push({ left: r.left - pad, top: r.top - pad, right: r.right + pad, bottom: r.bottom + pad, soft, fade });
      };
      page.querySelectorAll('h1, h2, h3, p, li, .eyebrow, a, button').forEach(el => push(el, 8, 0.5, 26));
      // The Assembly is the primary visual — keep its air clear.
      const assembly = page.querySelector('[data-assembly]');
      if (assembly) push(assembly, Math.max(34, Math.min(80, width * 0.04)), 0.05, 90);
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

    const draw = (t: number) => {
      context.clearRect(0, 0, width, height);
      const small = width < 640;
      const base = small ? 3.4 : 4.2;
      const reach = small ? 5 : 10.5;
      for (let i = 0; i < fragments.length; i++) {
        const f = fragments[i];
        const x = f.x * width + Math.sin(t * f.swaySpeed + f.phase) * f.swayAmp;
        const y = f.y * height + Math.cos(t * f.swaySpeed * 0.83 + f.phase) * f.swayAmp * 0.7;
        const alpha = (0.1 + f.depth * 0.085) * VISIBILITY * attenuation(x, y);
        if (alpha < 0.012) continue;
        const size = (base + f.depth * reach) * (f.kind === 6 && f.depth > 1.15 ? 1.5 : 1);
        context.save();
        context.translate(x, y);
        context.rotate(f.rot);
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
      for (let i = 0; i < fragments.length; i++) {
        const f = fragments[i];
        f.x += (f.vx * dt) / width;
        f.y += (f.vy * dt) / height;
        if (f.x < -0.08) f.x += 1.16; else if (f.x > 1.08) f.x -= 1.16;
        if (f.y < -0.08) f.y += 1.16; else if (f.y > 1.08) f.y -= 1.16;
        f.rot += f.spin * dt;
      }
      draw(now / 1000);
      frame = requestAnimationFrame(step);
    };

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      const ratio = Math.min(window.devicePixelRatio || 1, 1.6);
      canvas!.width = Math.round(width * ratio);
      canvas!.height = Math.round(height * ratio);
      context!.setTransform(ratio, 0, 0, ratio, 0, 0);
      const count = width < 640 ? 24 : Math.max(38, Math.min(118, Math.round((width * height) / 24000)));
      if (fragments.length !== count) fragments = createFragments(count);
      measureZones();
      draw(performance.now() / 1000);
    }

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('scroll', scheduleZones, { passive: true });
    let ro: ResizeObserver | undefined;
    if ('ResizeObserver' in window) {
      ro = new ResizeObserver(() => {
        if (window.innerWidth !== width || window.innerHeight !== height) resize();
      });
      ro.observe(document.documentElement);
    }
    if (!reduced) frame = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(frame);
      if (zoneFrame) cancelAnimationFrame(zoneFrame);
      ro?.disconnect();
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', scheduleZones);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none fixed inset-0 z-[-1] h-[100dvh] w-screen" />;
}
