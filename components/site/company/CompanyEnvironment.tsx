'use client';

import { type RefObject, useEffect, useRef } from 'react';

type Point = { x: number; y: number; scale: number; rotation: number; z: number };
type Fragment = { depth: number; kind: number; color: string; phase: number; speed: number; states: Point[] };
type ProtectedZone = { left: number; top: number; right: number; bottom: number };

const COLORS = ['#173e32', '#315f4d', '#78917f', '#a8b5a8', '#c9cec5'];
const SCENE_COUNT = 5;
const AMBIENT_SPEED = 2.3;
const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));
const smooth = (value: number) => value * value * (3 - 2 * value);
const rand = (seed: number) => {
  const value = Math.sin(seed * 91.713) * 43758.5453;
  return value - Math.floor(value);
};

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
    const centerX = compact ? 0.5 : 0.7;

    // Homepage formation 1: dimensional zigzag / wave.
    const wavePhase = (sequence * (compact ? 2.35 : 3.2)) % 1;
    const zigzag = 1 - 4 * Math.abs(wavePhase - 0.5);
    const waveX = compact ? 0.5 + zigzag * 0.31 + (group - 1) * 0.022 : 0.05 + sequence * 0.9;
    const waveY = compact ? 0.08 + sequence * 0.84 : 0.5 + zigzag * 0.27 + (group - 1) * 0.026;

    // Homepage formation 2: nucleus with several orbital planes.
    const nucleusCore = index % 5 === 0;
    const nucleusRadiusX = nucleusCore ? 0.018 + a * 0.055 : 0.13 + layer * 0.045 + a * 0.018;
    const nucleusRadiusY = nucleusCore ? 0.012 + b * 0.038 : (compact ? 0.055 : 0.075) + layer * (compact ? 0.021 : 0.032);
    const nucleusX = centerX + Math.cos(angle) * nucleusRadiusX;
    const nucleusY = (compact ? 0.54 : 0.5) + Math.sin(angle) * nucleusRadiusY;

    // Homepage formation 3: two intertwined particle strands.
    const strand = index % 2 === 0 ? 0 : Math.PI;
    const strandSequence = Math.floor(index / 2) / Math.max(Math.ceil(count / 2) - 1, 1);
    const dnaPhase = strandSequence * Math.PI * (compact ? 5.5 : 6.5) + strand;
    const dnaRadius = compact ? 0.28 : 0.25;
    const dnaX = centerX + Math.cos(dnaPhase) * dnaRadius;
    const dnaY = 0.08 + strandSequence * 0.84;

    // Homepage formation 4: repeated perspective frames inside a portal.
    const tunnelBand = index % 9;
    const tunnelDepth = tunnelBand / 8;
    const tunnelSlot = Math.floor(index / 9);
    const tunnelSlots = Math.max(Math.ceil(count / 9) - 1, 1);
    const perimeter = ((tunnelSlot / tunnelSlots) * 4 + tunnelBand * 0.07) % 4;
    let frameX = 0;
    let frameY = 0;
    if (perimeter < 1) {
      frameX = -1 + perimeter * 2;
      frameY = -1;
    } else if (perimeter < 2) {
      frameX = 1;
      frameY = -1 + (perimeter - 1) * 2;
    } else if (perimeter < 3) {
      frameX = 1 - (perimeter - 2) * 2;
      frameY = 1;
    } else {
      frameX = -1;
      frameY = 1 - (perimeter - 3) * 2;
    }
    const tunnelScale = 0.15 + Math.pow(tunnelDepth, 1.3) * 0.85;
    const tunnelX = centerX + frameX * (compact ? 0.42 : 0.31) * tunnelScale;
    const tunnelY = 0.52 + frameY * (compact ? 0.38 : 0.4) * tunnelScale;

    // Homepage formation 5: a tapered, controlled vertical twist.
    const tornadoY = 0.08 + sequence * 0.84;
    const tornadoRadius = 0.055 + (1 - sequence) * (compact ? 0.3 : 0.24);
    const tornadoPhase = sequence * Math.PI * 9 + group * 0.5;
    const tornadoX = centerX + Math.cos(tornadoPhase) * tornadoRadius;

    return {
      depth,
      kind: index % 7,
      color: COLORS[index % COLORS.length],
      phase: a * Math.PI * 2,
      speed: 0.22 + b * 0.38,
      states: [
        { x: waveX, y: waveY, scale: 0.44 + depth * 0.58, rotation: zigzag > 0 ? Math.PI / 4 : -Math.PI / 4, z: 0.22 + group * 0.48 + c * 0.3 },
        { x: nucleusX, y: nucleusY, scale: nucleusCore ? 0.95 + depth * 0.72 : 0.42 + depth * 0.52, rotation: angle * 0.32, z: nucleusCore ? 1.25 + c * 0.55 : 0.2 + layer * 0.42 },
        { x: dnaX, y: dnaY, scale: 0.42 + depth * 0.56, rotation: dnaPhase, z: 0.32 + (Math.sin(dnaPhase) + 1) * 0.68 },
        { x: tunnelX, y: tunnelY, scale: 0.36 + tunnelDepth * 0.82, rotation: perimeter * Math.PI / 2, z: 0.18 + tunnelDepth * 1.62 },
        { x: tornadoX, y: tornadoY, scale: 0.38 + depth * 0.6, rotation: tornadoPhase, z: 0.22 + (Math.sin(tornadoPhase) + 1) * 0.76 },
      ],
    };
  });
}

function drawStructure(
  context: CanvasRenderingContext2D,
  progress: number,
  width: number,
  height: number,
  elapsed: number,
  compact: boolean,
  reduced: boolean
) {
  const ambientTime = elapsed * AMBIENT_SPEED;
  const centerX = width * (compact ? 0.5 : 0.7);
  const centerY = height * 0.5;
  const atomPresence = 1 - clamp(Math.abs(progress - 1) / 0.9);
  const dnaPresence = 1 - clamp(Math.abs(progress - 2) / 0.95);
  const tunnelPresence = 1 - clamp(Math.abs(progress - 3) / 0.95);

  context.save();
  context.strokeStyle = '#315f4d';
  context.lineWidth = 1;
  context.globalAlpha = compact ? 0.13 : 0.17;

  if (atomPresence > 0) {
    context.save();
    context.globalAlpha *= atomPresence;
    context.translate(centerX, centerY);
    context.rotate(reduced ? 0 : Math.sin(ambientTime * 0.00008) * 0.16);
    for (let ring = 0; ring < 3; ring += 1) {
      context.beginPath();
      context.rotate(Math.PI / 3);
      context.ellipse(0, 0, width * (0.13 + ring * 0.035), height * (0.045 + ring * 0.012), 0, 0, Math.PI * 2);
      context.stroke();
    }
    context.restore();
  }

  if (dnaPresence > 0) {
    context.save();
    context.globalAlpha *= dnaPresence * 0.72;
    const radius = width * (compact ? 0.28 : 0.25);
    for (let bridge = 0; bridge < 9; bridge += 1) {
      const t = bridge / 8;
      const helix = t * Math.PI * (compact ? 5.5 : 6.5) + ambientTime * 0.00008;
      const y = height * (0.08 + t * 0.84);
      context.beginPath();
      context.moveTo(centerX + Math.cos(helix) * radius, y);
      context.lineTo(centerX + Math.cos(helix + Math.PI) * radius, y);
      context.stroke();
    }
    context.restore();
  }

  if (tunnelPresence > 0) {
    context.save();
    context.globalAlpha *= tunnelPresence;
    const breathe = reduced ? 0 : Math.sin(ambientTime * 0.00018) * 0.018;
    for (let portal = 0; portal < 7; portal += 1) {
      const depth = portal / 6;
      const scale = 0.14 + depth * 0.84 + breathe * depth;
      const halfWidth = width * (compact ? 0.42 : 0.31) * scale;
      const halfHeight = height * (compact ? 0.38 : 0.4) * scale;
      context.strokeRect(centerX - halfWidth, height * 0.52 - halfHeight, halfWidth * 2, halfHeight * 2);
    }
    context.restore();
  }

  context.restore();
}

export function CompanyEnvironment({ rootRef }: { rootRef: RefObject<HTMLElement> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const root = rootRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !root || !context) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let fragments: Fragment[] = [];
    let width = 0;
    let height = 0;
    let target = 0;
    let progress = 0;
    let frame = 0;
    let protectionFrame = 0;
    let protectedZones: ProtectedZone[] = [];

    const measureProtection = () => {
      const padding = width < 640 ? 7 : 10;
      protectedZones = Array.from(
        root.querySelectorAll<HTMLElement>(
          '[data-company-scene] h1, [data-company-scene] h2, [data-company-scene] h3, [data-company-scene] p, [data-company-scene] a, [data-company-scene] button, [data-company-scene] .eyebrow'
        )
      ).map((element) => {
        const rect = element.getBoundingClientRect();
        return { left: rect.left - padding, top: rect.top - padding, right: rect.right + padding, bottom: rect.bottom + padding };
      });
    };

    const scheduleProtectionMeasure = () => {
      if (protectionFrame) return;
      protectionFrame = requestAnimationFrame(() => {
        protectionFrame = 0;
        measureProtection();
      });
    };

    const updateTarget = () => {
      const rect = root.getBoundingClientRect();
      const distance = Math.max(root.offsetHeight - window.innerHeight, 1);
      target = clamp(-rect.top / distance) * (SCENE_COUNT - 1);
      if (reduced) progress = target;
    };

    const applyReadabilityMask = () => {
      if (!protectedZones.length) return;
      context.save();
      context.globalCompositeOperation = 'destination-out';
      context.filter = 'blur(9px)';
      context.fillStyle = 'rgba(0, 0, 0, 0.38)';
      protectedZones.forEach((zone) => context.fillRect(zone.left, zone.top, zone.right - zone.left, zone.bottom - zone.top));
      context.restore();
    };

    const render = (time: number) => {
      context.clearRect(0, 0, width, height);
      const scene = Math.min(Math.floor(progress), SCENE_COUNT - 1);
      const nextScene = Math.min(scene + 1, SCENE_COUNT - 1);
      const mix = smooth(progress - scene);
      const ambientTime = reduced ? 0 : time * AMBIENT_SPEED;

      drawStructure(context, progress, width, height, time, width < 640, reduced);

      fragments.forEach((fragment) => {
        const from = fragment.states[scene];
        const to = fragment.states[nextScene];
        const point = {
          x: from.x + (to.x - from.x) * mix,
          y: from.y + (to.y - from.y) * mix,
          scale: from.scale + (to.scale - from.scale) * mix,
          rotation: from.rotation + (to.rotation - from.rotation) * mix,
          z: from.z + (to.z - from.z) * mix,
        };
        const idlePhase = fragment.phase + ambientTime * 0.00016 * fragment.speed;
        const drift = reduced ? 0 : 1.8 + point.z * 3.8;
        const localMotion = reduced ? 0 : 2.2 + point.z * 2.6;
        const x = point.x * width + Math.sin(idlePhase * 1.7) * drift + Math.cos(idlePhase * 1.3) * localMotion;
        const y = point.y * height + Math.cos(idlePhase * 1.13) * drift * 0.72 + Math.sin(idlePhase) * localMotion * 0.45;
        const breath = reduced ? 1 : 1 + Math.sin(idlePhase * 0.82) * 0.04 * point.z;
        const size = (width < 640 ? 3.2 : 3.6) + point.z * (width < 640 ? 4.4 : 8.2);
        const renderedSize = size * point.scale * breath;

        context.save();
        context.translate(x, y);
        context.rotate(point.rotation + (reduced ? 0 : ambientTime * 0.000018 * fragment.speed * point.z));
        context.globalAlpha = 0.17 + point.z * 0.105;
        context.fillStyle = fragment.color;
        context.strokeStyle = fragment.color;
        context.lineWidth = 1;
        if (fragment.kind === 4) {
          context.fillRect(-renderedSize, -renderedSize * 0.22, renderedSize * 2, renderedSize * 0.44);
        } else if (fragment.kind === 5) {
          context.beginPath();
          context.moveTo(-renderedSize * 1.45, -renderedSize * 0.13);
          context.lineTo(renderedSize * 1.25, -renderedSize * 0.42);
          context.lineTo(renderedSize * 0.8, renderedSize * 0.18);
          context.lineTo(-renderedSize * 1.2, renderedSize * 0.38);
          context.closePath();
          context.fill();
        } else if (fragment.kind === 6) {
          context.beginPath();
          context.moveTo(0, -renderedSize);
          context.lineTo(renderedSize, -renderedSize * 0.35);
          context.lineTo(renderedSize, renderedSize * 0.7);
          context.lineTo(0, renderedSize);
          context.lineTo(-renderedSize, renderedSize * 0.35);
          context.lineTo(-renderedSize, -renderedSize * 0.7);
          context.closePath();
          context.stroke();
        } else {
          context.beginPath();
          context.moveTo(0, -renderedSize);
          context.lineTo(renderedSize, 0);
          context.lineTo(0, renderedSize);
          context.lineTo(-renderedSize, 0);
          context.closePath();
          fragment.kind === 2 ? context.stroke() : context.fill();
        }
        context.restore();
      });

      applyReadabilityMask();
    };

    const animate = (time: number) => {
      progress += (target - progress) * 0.075;
      render(time);
      frame = requestAnimationFrame(animate);
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const ratio = Math.min(window.devicePixelRatio || 1, 1.7);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      fragments = createFragments(width < 640 ? 96 : 218, width < 640);
      updateTarget();
      measureProtection();
      render(0);
    };

    const onScroll = () => {
      updateTarget();
      scheduleProtectionMeasure();
      if (reduced) render(0);
    };

    resize();
    const layoutObserver = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(() => {
      updateTarget();
      scheduleProtectionMeasure();
    });
    layoutObserver?.observe(root);
    window.addEventListener('resize', resize);
    window.addEventListener('scroll', onScroll, { passive: true });
    if (!reduced) frame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frame);
      if (protectionFrame) cancelAnimationFrame(protectionFrame);
      layoutObserver?.disconnect();
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', onScroll);
    };
  }, [rootRef]);

  return <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 h-screen w-screen" />;
}
