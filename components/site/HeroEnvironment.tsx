'use client';

import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

type Point = { x: number; y: number; scale: number; rotation: number; z: number };
type Fragment = { depth: number; kind: number; color: string; states: Point[] };

const COLORS = ['#173e32', '#315f4d', '#78917f', '#a8b5a8', '#c9cec5'];
const rand = (seed: number) => {
  const value = Math.sin(seed * 91.713) * 43758.5453;
  return value - Math.floor(value);
};
const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));
const smooth = (value: number) => value * value * (3 - 2 * value);

function createFragments(count: number): Fragment[] {
  return Array.from({ length: count }, (_, index) => {
    const a = rand(index + 1);
    const b = rand(index + 71);
    const c = rand(index + 149);
    const depth = 0.25 + c * 1.15;
    const angle = index * 2.39996;
    const group = index % 3;
    const lane = (index % 13) / 12;
    const pair = index % 2;
    const band = index % 4;
    const latticeX = (index % 11) / 10;
    const latticeY = (Math.floor(index / 11) % 8) / 7;
    const clusterX = [0.2, 0.73, 0.5][group];
    const clusterY = [0.7, 0.34, 0.78][group];
    const stream = index % 3;

    return {
      depth,
      kind: index % 5,
      color: COLORS[index % COLORS.length],
      states: [
        { x: 0.02 + a * 0.96, y: 0.03 + b * 0.92, scale: 0.55 + depth * 0.5, rotation: angle, z: 0.35 + c * 1.15 },
        { x: clusterX + Math.cos(angle) * (0.018 + a * 0.105), y: clusterY + Math.sin(angle) * (0.018 + b * 0.09), scale: 0.65 + depth * 0.62, rotation: angle * 0.25, z: 0.25 + rand(index + 310) * 1.45 },
        { x: 0.1 + lane * 0.8, y: 0.2 + band * 0.19 + (b - 0.5) * 0.055, scale: 0.48 + depth * 0.4, rotation: band % 2 ? Math.PI / 4 : -Math.PI / 4, z: 0.42 + band * 0.22 + c * 0.42 },
        { x: 0.13 + pair * 0.72 + (a - 0.5) * 0.075, y: 0.08 + lane * 0.84, scale: 0.58 + depth * 0.7, rotation: pair ? Math.PI / 4 : -Math.PI / 4, z: pair ? 1.3 - c * 0.45 : 0.38 + c * 0.5 },
        { x: 0.04 + lane * 0.92, y: 0.5 + Math.sin(lane * Math.PI * (2.2 + stream * 0.34) + stream * 1.55) * (0.16 + stream * 0.045), scale: 0.55 + depth * 0.72, rotation: angle * 0.16 + lane * Math.PI, z: 0.25 + ((index + stream) % 7) * 0.2 },
        { x: 0.14 + latticeX * 0.72 + (latticeY % 2) * 0.035, y: 0.1 + latticeY * 0.78, scale: 0.42 + depth * 0.46, rotation: (latticeX + latticeY) * Math.PI * 0.25, z: 0.38 + ((index % 6) / 5) * 1.05 },
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
    let anchors: number[] = [];
    let width = 0;
    let height = 0;
    let target = reduced ? 0 : 0;
    let progress = target;
    let calm = 1;
    let frame = 0;

    const measure = () => {
      anchors = Array.from(document.querySelectorAll<HTMLElement>('[data-visual-state]')).map(
        (element) => element.getBoundingClientRect().top + window.scrollY + element.offsetHeight * 0.5 - window.innerHeight * 0.5
      );
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const ratio = Math.min(window.devicePixelRatio || 1, 1.6);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      fragments = createFragments(width < 640 ? 68 : 210);
      measure();
      updateTarget();
      draw();
    };

    const updateTarget = () => {
      if (reduced || anchors.length < 2) return;
      const scroll = window.scrollY;
      let state = anchors.length - 1;
      for (let index = 0; index < anchors.length - 1; index++) {
        if (scroll <= anchors[index + 1]) {
          const local = clamp((scroll - anchors[index]) / Math.max(anchors[index + 1] - anchors[index], 1));
          state = index + smooth(local);
          break;
        }
      }
      target = clamp(state, 0, 5);
      calm = 1 - clamp((scroll - anchors[5]) / Math.max(height * 1.4, 1)) * 0.72;
    };

    const pointAt = (fragment: Fragment) => {
      const state = Math.min(4, Math.floor(progress));
      const amount = smooth(progress - state);
      const from = fragment.states[state];
      const to = fragment.states[state + 1];
      return {
        x: from.x + (to.x - from.x) * amount,
        y: from.y + (to.y - from.y) * amount,
        scale: from.scale + (to.scale - from.scale) * amount,
        rotation: from.rotation + (to.rotation - from.rotation) * amount,
        z: from.z + (to.z - from.z) * amount,
      };
    };

    const drawWireframe = () => {
      const phase = progress / 5;
      context.save();
      context.globalAlpha = 0.105 * calm;
      context.strokeStyle = '#315f4d';
      context.lineWidth = 1;
      context.beginPath();
      context.moveTo(width * (0.57 + phase * 0.05), height * 0.17);
      context.lineTo(width * 0.9, height * (0.27 + phase * 0.05));
      context.lineTo(width * (0.82 - phase * 0.08), height * 0.76);
      context.lineTo(width * 0.5, height * (0.68 - phase * 0.08));
      context.closePath();
      context.moveTo(width * 0.57, height * 0.17);
      context.lineTo(width * 0.72, height * 0.49);
      context.lineTo(width * 0.9, height * (0.27 + phase * 0.05));
      context.moveTo(width * (0.08 + phase * 0.12), height * 0.72);
      context.lineTo(width * (0.27 + phase * 0.08), height * 0.61);
      context.lineTo(width * (0.39 - phase * 0.08), height * 0.82);
      context.lineTo(width * (0.18 - phase * 0.05), height * 0.9);
      context.closePath();
      context.stroke();
      context.restore();
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);
      context.fillStyle = '#fbfaf7';
      context.fillRect(0, 0, width, height);
      drawWireframe();
      fragments.forEach((fragment) => {
        const point = pointAt(fragment);
        const parallax = (target - progress) * 38 * point.z;
        const x = point.x * width;
        const y = point.y * height + parallax;
        const quiet = point.x > 0.08 && point.x < 0.57 && point.y > 0.08 && point.y < 0.72;
        const base = width < 640 ? 3.2 : 4.2;
        const size = (base + point.z * (width < 640 ? 4.5 : 8.2)) * point.scale;
        context.save();
        context.translate(x, y);
        context.rotate(point.rotation + (target - progress) * point.z * 0.75);
        context.globalAlpha = (quiet ? 0.035 : 0.14 + point.z * 0.105) * calm;
        context.fillStyle = fragment.color;
        context.strokeStyle = fragment.color;
        context.lineWidth = 1;
        if (fragment.kind === 4) {
          context.fillRect(-size, -size * 0.22, size * 2, size * 0.44);
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

    const animate = () => {
      progress += (target - progress) * 0.09;
      draw();
      frame = requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('scroll', updateTarget, { passive: true });
    if (!reduced) frame = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', updateTarget);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={cn('pointer-events-none fixed inset-0 z-0 h-screen w-screen', className)}
    />
  );
}
