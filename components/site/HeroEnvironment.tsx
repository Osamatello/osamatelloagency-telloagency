'use client';

import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

type Point = { x: number; y: number; scale: number; rotation: number; z: number };
type Fragment = { depth: number; kind: number; color: string; phase: number; speed: number; states: Point[] };

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
    const localCluster = index % 6 === 0;
    const scatterX = localCluster ? [0.12, 0.82, 0.68][group] + (a - 0.5) * 0.16 : 0.02 + a * 0.96;
    const scatterY = localCluster ? [0.76, 0.2, 0.68][group] + (b - 0.5) * 0.15 : 0.03 + b * 0.92;
    const orbitRadius = 0.08 + (index % 8) * 0.018 + c * 0.035;

    return {
      depth,
      kind: index % 7,
      color: COLORS[index % COLORS.length],
      phase: a * Math.PI * 2,
      speed: 0.22 + b * 0.38,
      states: [
        { x: scatterX, y: scatterY, scale: 0.42 + depth * 0.62, rotation: angle, z: 0.18 + c * 1.65 },
        { x: clusterX + Math.cos(angle) * (0.018 + a * 0.105), y: clusterY + Math.sin(angle) * (0.018 + b * 0.09), scale: 0.65 + depth * 0.62, rotation: angle * 0.25, z: 0.25 + rand(index + 310) * 1.45 },
        { x: 0.1 + lane * 0.8, y: 0.2 + band * 0.19 + (b - 0.5) * 0.055, scale: 0.48 + depth * 0.4, rotation: band % 2 ? Math.PI / 4 : -Math.PI / 4, z: 0.42 + band * 0.22 + c * 0.42 },
        { x: (pair ? 0.73 : 0.27) + Math.cos(angle) * orbitRadius, y: 0.49 + Math.sin(angle) * orbitRadius * 1.65, scale: 0.48 + depth * 0.82, rotation: angle + (pair ? Math.PI / 2 : -Math.PI / 2), z: 0.16 + ((index + pair * 3) % 9) * 0.19 },
        { x: 0.01 + lane * 0.98, y: 0.72 - lane * 0.42 + Math.sin(lane * Math.PI * (2.4 + stream * 0.4) + stream * 1.7) * (0.13 + stream * 0.045), scale: 0.42 + depth * 0.9, rotation: angle * 0.16 + lane * Math.PI, z: 0.12 + ((index + stream) % 10) * 0.18 },
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
    let elapsed = 0;

    const measure = () => {
      anchors = Array.from(document.querySelectorAll<HTMLElement>('[data-visual-state]')).map(
        (element) => element.getBoundingClientRect().top + window.scrollY + element.offsetHeight * 0.5 - window.innerHeight * 0.5
      );
      if (anchors.length) {
        const pageEnd = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
        anchors[anchors.length - 1] = Math.max(anchors[anchors.length - 1], pageEnd * 0.86);
      }
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const ratio = Math.min(window.devicePixelRatio || 1, 1.6);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      fragments = createFragments(width < 640 ? 72 : 258);
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
      const idleX = reduced ? 0 : Math.sin(elapsed * 0.00016) * width * 0.004;
      const idleY = reduced ? 0 : Math.cos(elapsed * 0.00013) * height * 0.004;
      context.save();
      context.translate(idleX, idleY);
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
        const idleStrength = reduced ? 0 : (1.2 + point.z * 2.8);
        const idlePhase = fragment.phase + elapsed * 0.0001 * fragment.speed;
        const idleX = Math.sin(idlePhase * 1.7) * idleStrength;
        const idleY = Math.cos(idlePhase * 1.13) * idleStrength * 0.72;
        const breath = reduced ? 1 : 1 + Math.sin(idlePhase * 0.82) * 0.025 * point.z;
        const x = point.x * width + idleX;
        const y = point.y * height + parallax + idleY;
        const quiet = point.x > 0.08 && point.x < 0.57 && point.y > 0.08 && point.y < 0.72;
        const base = width < 640 ? 2.8 : 3.6;
        const foregroundBoost = fragment.kind === 6 && point.z > 1.15 ? 1.7 : 1;
        const size = (base + point.z * (width < 640 ? 4.4 : 9.4)) * point.scale * foregroundBoost * breath;
        context.save();
        context.translate(x, y);
        context.rotate(point.rotation + (target - progress) * point.z * 0.75 + (reduced ? 0 : elapsed * 0.000018 * fragment.speed * point.z));
        context.globalAlpha = (quiet ? 0.035 : 0.14 + point.z * 0.105) * calm;
        context.fillStyle = fragment.color;
        context.strokeStyle = fragment.color;
        context.lineWidth = 1;
        if (fragment.kind === 4) {
          context.fillRect(-size, -size * 0.22, size * 2, size * 0.44);
        } else if (fragment.kind === 5) {
          context.beginPath();
          context.moveTo(-size * 1.45, -size * 0.13);
          context.lineTo(size * 1.25, -size * 0.42);
          context.lineTo(size * 0.8, size * 0.18);
          context.lineTo(-size * 1.2, size * 0.38);
          context.closePath();
          context.fill();
        } else if (fragment.kind === 6) {
          const inset = size * 0.55;
          context.beginPath();
          context.moveTo(0, -size);
          context.lineTo(size, -size * 0.35);
          context.lineTo(size, size * 0.7);
          context.lineTo(0, size);
          context.lineTo(-size, size * 0.35);
          context.lineTo(-size, -size * 0.7);
          context.closePath();
          context.moveTo(0, -size);
          context.lineTo(0, size);
          context.moveTo(-size, -size * 0.7);
          context.lineTo(inset, -size * 0.12);
          context.lineTo(size, -size * 0.35);
          context.stroke();
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

    const animate = (time: number) => {
      elapsed = time;
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
