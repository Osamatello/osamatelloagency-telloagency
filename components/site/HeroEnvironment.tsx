'use client';

import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

type Point = { x: number; y: number; scale: number; rotation: number; z: number };
type Fragment = { depth: number; kind: number; color: string; phase: number; speed: number; states: Point[] };

const COLORS = ['#173e32', '#315f4d', '#78917f', '#a8b5a8', '#c9cec5'];
const VISIBILITY_BOOST = 1.78;
const AMBIENT_SPEED = 1.65;
const STATE_COUNT = 8;
const MOBILE_MASS_VERTICES = [[0.5, 0.13], [0.84, 0.34], [0.73, 0.73], [0.5, 0.89], [0.16, 0.7], [0.22, 0.32]] as const;
const DESKTOP_MASS_VERTICES = [[0.5, 0.12], [0.82, 0.28], [0.76, 0.73], [0.5, 0.88], [0.18, 0.71], [0.24, 0.27]] as const;
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
    const depth = 0.25 + c * 1.15;
    const angle = index * 2.39996;
    const group = index % 3;
    const sequence = index / Math.max(count - 1, 1);
    const layer = index % 4;
    const localCluster = index % 6 === 0;
    const scatterX = localCluster ? [0.12, 0.82, 0.68][group] + (a - 0.5) * 0.16 : 0.02 + a * 0.96;
    const scatterY = localCluster ? [0.76, 0.2, 0.68][group] + (b - 0.5) * 0.15 : 0.03 + b * 0.92;

    const nucleusCore = index % 4 === 0;
    const nucleusRadiusX = nucleusCore ? 0.018 + a * 0.055 : 0.13 + layer * 0.045 + a * 0.018;
    const nucleusRadiusY = nucleusCore ? 0.012 + b * 0.038 : (compact ? 0.055 : 0.075) + layer * (compact ? 0.021 : 0.032);
    const nucleusX = 0.5 + Math.cos(angle) * nucleusRadiusX;
    const nucleusY = (compact ? 0.54 : 0.5) + Math.sin(angle) * nucleusRadiusY;

    const wavePhase = (sequence * (compact ? 2.35 : 3.2)) % 1;
    const zigzag = 1 - 4 * Math.abs(wavePhase - 0.5);
    const waveX = compact ? 0.5 + zigzag * 0.31 + (group - 1) * 0.022 : 0.05 + sequence * 0.9;
    const waveY = compact ? 0.08 + sequence * 0.84 : 0.5 + zigzag * 0.27 + (group - 1) * 0.026;

    const planetaryCore = index % 6 === 0;
    const planetCenterX = compact ? 0.5 : 0.62;
    const planetCenterY = compact ? 0.52 : 0.48;
    const planetRadiusX = planetaryCore ? 0.018 + a * 0.05 : 0.11 + layer * 0.055 + a * 0.02;
    const planetRadiusY = planetaryCore ? 0.014 + b * 0.04 : (compact ? 0.055 : 0.07) + layer * (compact ? 0.025 : 0.035);
    const planetAngle = angle * 0.72 + layer * 0.48;
    const planetX = planetCenterX + Math.cos(planetAngle) * planetRadiusX;
    const planetY = planetCenterY + Math.sin(planetAngle) * planetRadiusY;

    const vortexRadius = 0.055 + (1 - sequence) * (compact ? 0.36 : 0.43);
    const vortexAngle = sequence * Math.PI * 7 + group * 0.42;
    const vortexX = (compact ? 0.52 : 0.48) + Math.cos(vortexAngle) * vortexRadius;
    const vortexY = (compact ? 0.52 : 0.5) + Math.sin(vortexAngle) * vortexRadius * (compact ? 0.48 : 0.67);

    const massVertices = compact ? MOBILE_MASS_VERTICES : DESKTOP_MASS_VERTICES;
    const edge = index % massVertices.length;
    const nextEdge = (edge + 1) % massVertices.length;
    const edgeSteps = Math.max(2, Math.ceil(count / massVertices.length));
    const edgeAmount = (Math.floor(index / massVertices.length) % edgeSteps) / (edgeSteps - 1);
    const edgeX = massVertices[edge][0] + (massVertices[nextEdge][0] - massVertices[edge][0]) * edgeAmount;
    const edgeY = massVertices[edge][1] + (massVertices[nextEdge][1] - massVertices[edge][1]) * edgeAmount;
    const inset = index % 4 === 0 ? 0.58 : 1;
    const massX = 0.5 + (edgeX - 0.5) * inset + (a - 0.5) * 0.018;
    const massY = 0.5 + (edgeY - 0.5) * inset + (b - 0.5) * 0.018;

    const faqAngle = sequence * Math.PI * 3.4 + group * 0.54;
    const faqRadiusX = 0.1 + layer * (compact ? 0.045 : 0.055);
    const faqRadiusY = 0.09 + layer * (compact ? 0.035 : 0.045);
    const faqCenterX = compact ? 0.52 : 0.76;
    const faqCenterY = compact ? 0.66 : 0.55;
    const faqX = faqCenterX + Math.cos(faqAngle) * faqRadiusX;
    const faqY = faqCenterY + Math.sin(faqAngle) * faqRadiusY;

    const finalAngle = angle * 0.58 + layer * 0.72;
    const finalRadiusX = 0.075 + sequence * (compact ? 0.34 : 0.3);
    const finalRadiusY = 0.04 + sequence * (compact ? 0.25 : 0.2);
    const finalCenterX = compact ? 0.5 : 0.74;
    const finalCenterY = compact ? 0.68 : 0.54;
    const finalX = finalCenterX + Math.cos(finalAngle) * finalRadiusX;
    const finalY = finalCenterY + Math.sin(finalAngle) * finalRadiusY;

    return {
      depth,
      kind: index % 7,
      color: COLORS[index % COLORS.length],
      phase: a * Math.PI * 2,
      speed: 0.22 + b * 0.38,
      states: [
        { x: scatterX, y: scatterY, scale: 0.42 + depth * 0.62, rotation: angle, z: 0.18 + c * 1.65 },
        { x: nucleusX, y: nucleusY, scale: nucleusCore ? 0.95 + depth * 0.72 : 0.42 + depth * 0.52, rotation: angle * 0.32, z: nucleusCore ? 1.25 + c * 0.55 : 0.2 + layer * 0.42 },
        { x: waveX, y: waveY, scale: 0.44 + depth * 0.58, rotation: zigzag > 0 ? Math.PI / 4 : -Math.PI / 4, z: 0.22 + group * 0.48 + c * 0.3 },
        { x: planetX, y: planetY, scale: planetaryCore ? 1.05 + depth * 0.7 : 0.4 + depth * 0.55, rotation: planetAngle, z: planetaryCore ? 1.35 + c * 0.45 : 0.16 + layer * 0.43 },
        { x: vortexX, y: vortexY, scale: 0.38 + depth * (0.45 + sequence * 0.45), rotation: vortexAngle + Math.PI / 4, z: 0.18 + sequence * 1.45 },
        { x: massX, y: massY, scale: 0.4 + depth * (inset < 1 ? 0.72 : 0.5), rotation: edge * (Math.PI / 3), z: inset < 1 ? 1.15 + c * 0.45 : 0.28 + layer * 0.34 },
        { x: faqX, y: faqY, scale: 0.4 + depth * 0.58, rotation: faqAngle, z: 0.2 + layer * 0.42 + c * 0.2 },
        { x: finalX, y: finalY, scale: 0.38 + depth * 0.55, rotation: finalAngle, z: 0.22 + layer * 0.38 + c * 0.22 },
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
    let target = 0;
    let progress = target;
    let frame = 0;
    let elapsed = 0;

    const measure = () => {
      anchors = Array.from(document.querySelectorAll<HTMLElement>('[data-visual-state]')).map(
        (element) => element.getBoundingClientRect().top + window.scrollY + element.offsetHeight * 0.5 - window.innerHeight * 0.5
      );
      if (anchors.length) {
        const pageEnd = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
        anchors[anchors.length - 1] = Math.max(anchors[anchors.length - 1], pageEnd * 0.9);
      }
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
      target = clamp(state, 0, STATE_COUNT - 1);
    };

    const pointAt = (fragment: Fragment) => {
      const state = Math.min(STATE_COUNT - 2, Math.floor(progress));
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
      const phase = progress / (STATE_COUNT - 1);
      const ambientTime = elapsed * AMBIENT_SPEED;
      const idleX = reduced ? 0 : Math.sin(ambientTime * 0.00016) * width * 0.004;
      const idleY = reduced ? 0 : Math.cos(ambientTime * 0.00013) * height * 0.004;
      context.save();
      context.translate(width * 0.5 + idleX, height * 0.5 + idleY);
      context.rotate(reduced ? 0 : Math.sin(ambientTime * 0.00008) * 0.014);
      context.translate(-width * 0.5, -height * 0.5);
      const wireBreath = reduced ? 1 : 0.94 + Math.sin(ambientTime * 0.00022) * 0.06;
      context.globalAlpha = (width < 640 ? 0.07 : 0.105) * VISIBILITY_BOOST * wireBreath;
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
      const ambientTime = elapsed * AMBIENT_SPEED;
      fragments.forEach((fragment) => {
        const point = pointAt(fragment);
        const parallax = (target - progress) * 38 * point.z;
        const idleStrength = reduced ? 0 : (1.8 + point.z * 3.8);
        const idlePhase = fragment.phase + ambientTime * 0.00016 * fragment.speed;
        const idleX = Math.sin(idlePhase * 1.7) * idleStrength;
        const idleY = Math.cos(idlePhase * 1.13) * idleStrength * 0.72;
        const breath = reduced ? 1 : 1 + Math.sin(idlePhase * 0.82) * 0.04 * point.z;
        const orbitalPresence = Math.max(
          1 - clamp(Math.abs(progress - 1) / 0.85),
          1 - clamp(Math.abs(progress - 3) / 0.85),
          1 - clamp(Math.abs(progress - 6) / 0.9),
          1 - clamp(Math.abs(progress - 7) / 0.9)
        );
        const vortexPresence = 1 - clamp(Math.abs(progress - 4) / 0.9);
        const localOrbit = reduced ? 0 : orbitalPresence * (3.5 + point.z * 3.2);
        const localSpiral = reduced ? 0 : vortexPresence * (2.5 + point.z * 2.4);
        const x = point.x * width + idleX + Math.cos(idlePhase * 1.25) * localOrbit + Math.sin(idlePhase * 1.8) * localSpiral;
        const y = point.y * height + parallax + idleY + Math.sin(idlePhase) * localOrbit * 0.58 + Math.cos(idlePhase * 1.45) * localSpiral;
        const quiet = width < 640
          ? point.x > 0.1 && point.x < 0.9 && point.y > 0.08 && point.y < 0.45
          : point.x > 0.08 && point.x < 0.57 && point.y > 0.08 && point.y < 0.72;
        const base = width < 640 ? 3.2 : 3.6;
        const foregroundBoost = fragment.kind === 6 && point.z > 1.15 ? 1.7 : 1;
        const size = (base + point.z * (width < 640 ? 4.4 : 9.4)) * point.scale * foregroundBoost * breath;
        context.save();
        context.translate(x, y);
        context.rotate(point.rotation + (target - progress) * point.z * 0.75 + (reduced ? 0 : ambientTime * 0.000018 * fragment.speed * point.z));
        const depthPresence = 0.96 + clamp(point.z / 1.8) * 0.16;
        context.globalAlpha = (quiet ? 0.035 : 0.14 + point.z * 0.105) * VISIBILITY_BOOST * depthPresence;
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

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const ratio = Math.min(window.devicePixelRatio || 1, 1.6);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      fragments = createFragments(width < 640 ? 96 : 258, width < 640);
      measure();
      updateTarget();
      draw();
    };

    resize();
    const layoutObserver = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(measure);
    layoutObserver?.observe(document.body);
    window.addEventListener('resize', resize);
    window.addEventListener('scroll', updateTarget, { passive: true });
    if (!reduced) frame = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', updateTarget);
      layoutObserver?.disconnect();
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
