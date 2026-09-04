'use client';

import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

type Point = { x: number; y: number; scale: number; rotation: number; z: number };
type Fragment = { depth: number; kind: number; color: string; phase: number; speed: number; states: Point[] };
type ProtectedZone = { left: number; top: number; right: number; bottom: number };

const COLORS = ['#173e32', '#315f4d', '#78917f', '#a8b5a8', '#c9cec5'];
const VISIBILITY_BOOST = 1.85;
const AMBIENT_SPEED = 2.30;
const STATE_COUNT = 8;
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
    const nucleusCore = index % 5 === 0;
    const nucleusRadiusX = nucleusCore ? 0.018 + a * 0.055 : 0.13 + layer * 0.045 + a * 0.018;
    const nucleusRadiusY = nucleusCore ? 0.012 + b * 0.038 : (compact ? 0.055 : 0.075) + layer * (compact ? 0.021 : 0.032);
    const nucleusX = 0.5 + Math.cos(angle) * nucleusRadiusX;
    const nucleusY = (compact ? 0.54 : 0.5) + Math.sin(angle) * nucleusRadiusY;

    const wavePhase = (sequence * (compact ? 2.35 : 3.2)) % 1;
    const zigzag = 1 - 4 * Math.abs(wavePhase - 0.5);
    const waveX = compact ? 0.5 + zigzag * 0.31 + (group - 1) * 0.022 : 0.05 + sequence * 0.9;
    const waveY = compact ? 0.08 + sequence * 0.84 : 0.5 + zigzag * 0.27 + (group - 1) * 0.026;

    // States 2–3: two intertwined particle strands with opposing depth phases.
    const strand = index % 2 === 0 ? 0 : Math.PI;
    const strandSequence = Math.floor(index / 2) / Math.max(Math.ceil(count / 2) - 1, 1);
    const dnaPhase = strandSequence * Math.PI * (compact ? 5.5 : 6.5) + strand;
    const dnaRadius = compact ? 0.28 : 0.32;
    const dnaX = 0.5 + Math.cos(dnaPhase) * dnaRadius;
    const dnaY = 0.08 + strandSequence * 0.84;
    const dnaLatePhase = dnaPhase + 0.62;
    const dnaLateX = 0.5 + Math.cos(dnaLatePhase) * dnaRadius * 0.92;
    const dnaLateY = 0.08 + strandSequence * 0.84;

    // States 4–5: particles occupy repeated perspective frames inside a portal.
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
    const tunnelCenterX = compact ? 0.5 : 0.62;
    const tunnelCenterY = 0.52;
    const tunnelX = tunnelCenterX + frameX * (compact ? 0.42 : 0.38) * tunnelScale;
    const tunnelY = tunnelCenterY + frameY * (compact ? 0.38 : 0.4) * tunnelScale;
    const tunnelApproachX = tunnelCenterX + (tunnelX - tunnelCenterX) * 0.72;
    const tunnelApproachY = tunnelCenterY + (tunnelY - tunnelCenterY) * 0.72;

    // States 6–7: a controlled vertical twist with a tapered, asymmetric radius.
    const tornadoY = 0.08 + sequence * 0.84;
    const tornadoRadius = 0.055 + (1 - sequence) * (compact ? 0.3 : 0.27);
    const tornadoPhase = sequence * Math.PI * 9 + group * 0.5;
    const tornadoCenterX = compact ? 0.5 : 0.7;
    const tornadoX = tornadoCenterX + Math.cos(tornadoPhase) * tornadoRadius;
    const tornadoGatherX = tornadoCenterX + Math.cos(tornadoPhase - 0.5) * tornadoRadius * 0.66;

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
        { x: dnaLateX, y: dnaLateY, scale: 0.42 + depth * 0.58, rotation: dnaLatePhase, z: 0.32 + (Math.sin(dnaLatePhase) + 1) * 0.68 },
        { x: tunnelApproachX, y: tunnelApproachY, scale: 0.38 + tunnelDepth * 0.72, rotation: perimeter * Math.PI / 2, z: 0.2 + tunnelDepth * 1.45 },
        { x: tunnelX, y: tunnelY, scale: 0.36 + tunnelDepth * 0.82, rotation: perimeter * Math.PI / 2, z: 0.18 + tunnelDepth * 1.62 },
        { x: tornadoGatherX, y: tornadoY, scale: 0.4 + depth * 0.52, rotation: tornadoPhase - 0.5, z: 0.24 + (Math.sin(tornadoPhase - 0.5) + 1) * 0.7 },
        { x: tornadoX, y: tornadoY, scale: 0.38 + depth * 0.6, rotation: tornadoPhase, z: 0.22 + (Math.sin(tornadoPhase) + 1) * 0.76 },
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
    let protectionFrame = 0;
    let protectedZones: ProtectedZone[] = [];

    const measureProtection = () => {
      const padding = width < 640 ? 7 : 10;
      protectedZones = Array.from(
        document.querySelectorAll<HTMLElement>(
          '[data-visual-state] h1, [data-visual-state] h2, [data-visual-state] h3, [data-visual-state] p, [data-visual-state] a, [data-visual-state] button, [data-visual-state] dt, [data-visual-state] dd, [data-visual-state] .eyebrow, [data-visual-state] ol'
        )
      ).map((element) => {
        const rect = element.getBoundingClientRect();
        return {
          left: rect.left - padding,
          top: rect.top - padding,
          right: rect.right + padding,
          bottom: rect.bottom + padding,
        };
      });
    };

    const scheduleProtectionMeasure = () => {
      if (protectionFrame) return;
      protectionFrame = requestAnimationFrame(() => {
        protectionFrame = 0;
        measureProtection();
      });
    };

    const readabilityAt = (x: number, y: number) => {
      let attenuation = 1;
      for (const zone of protectedZones) {
        if (x >= zone.left && x <= zone.right && y >= zone.top && y <= zone.bottom) return 0.18;
        const dx = Math.max(zone.left - x, 0, x - zone.right);
        const dy = Math.max(zone.top - y, 0, y - zone.bottom);
        const distance = Math.hypot(dx, dy);
        if (distance < 28) attenuation = Math.min(attenuation, 0.5 + distance / 56);
      }
      return attenuation;
    };

    const clipOutsideProtectedZones = () => {
      if (!protectedZones.length) return;
      context.beginPath();
      context.rect(0, 0, width, height);
      for (const zone of protectedZones) {
        context.rect(zone.left, zone.top, zone.right - zone.left, zone.bottom - zone.top);
      }
      context.clip('evenodd');
    };

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
      const ambientTime = elapsed * AMBIENT_SPEED;
      const idleX = reduced ? 0 : Math.sin(ambientTime * 0.00016) * width * 0.004;
      const idleY = reduced ? 0 : Math.cos(ambientTime * 0.00013) * height * 0.004;
      context.save();
      clipOutsideProtectedZones();
      context.translate(width * 0.5 + idleX, height * 0.5 + idleY);
      context.rotate(reduced ? 0 : Math.sin(ambientTime * 0.00008) * 0.014);
      context.translate(-width * 0.5, -height * 0.5);
      const wireBreath = reduced ? 1 : 0.94 + Math.sin(ambientTime * 0.00022) * 0.06;
      context.globalAlpha = (width < 640 ? 0.07 : 0.105) * VISIBILITY_BOOST * wireBreath;
      context.strokeStyle = '#315f4d';
      context.lineWidth = 1;
      const atomPresence = 1 - clamp(Math.abs(progress - 1) / 0.9);
      const dnaPresence = 1 - clamp(Math.abs(progress - 2.5) / 1.25);
      const tunnelPresence = 1 - clamp(Math.abs(progress - 4.5) / 1.25);

      if (atomPresence > 0) {
        context.save();
        context.globalAlpha *= atomPresence;
        context.translate(width * 0.5, height * 0.5);
        for (let ring = 0; ring < 3; ring++) {
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
        const radius = width * (width < 640 ? 0.28 : 0.32);
        for (let bridge = 0; bridge < 9; bridge++) {
          const t = bridge / 8;
          const helix = t * Math.PI * (width < 640 ? 5.5 : 6.5) + ambientTime * 0.00008;
          const y = height * (0.08 + t * 0.84);
          context.beginPath();
          context.moveTo(width * 0.5 + Math.cos(helix) * radius, y);
          context.lineTo(width * 0.5 + Math.cos(helix + Math.PI) * radius, y);
          context.stroke();
        }
        context.restore();
      }

      if (tunnelPresence > 0) {
        context.save();
        context.globalAlpha *= tunnelPresence;
        const centerX = width * (width < 640 ? 0.5 : 0.62);
        const centerY = height * 0.52;
        const breathe = reduced ? 0 : Math.sin(ambientTime * 0.00018) * 0.018;
        for (let portal = 0; portal < 7; portal++) {
          const depth = portal / 6;
          const scale = 0.14 + depth * 0.84 + breathe * depth;
          const halfW = width * (width < 640 ? 0.42 : 0.38) * scale;
          const halfH = height * (width < 640 ? 0.38 : 0.4) * scale;
          context.strokeRect(centerX - halfW, centerY - halfH, halfW * 2, halfH * 2);
        }
        context.restore();
      }
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
        const atomPresence = 1 - clamp(Math.abs(progress - 1) / 0.9);
        const dnaPresence = 1 - clamp(Math.abs(progress - 2.5) / 1.25);
        const tunnelPresence = 1 - clamp(Math.abs(progress - 4.5) / 1.25);
        const tornadoPresence = 1 - clamp(Math.abs(progress - 6.5) / 1.35);
        const localOrbit = reduced ? 0 : atomPresence * (3.8 + point.z * 3.4);
        const localHelix = reduced ? 0 : dnaPresence * (2.2 + point.z * 2.1);
        const tunnelBreath = reduced ? 0 : tunnelPresence * Math.sin(idlePhase * 0.72) * (1 + point.z * 1.7);
        const localTwist = reduced ? 0 : tornadoPresence * (3 + point.z * 2.7);
        const x = point.x * width + idleX
          + Math.cos(idlePhase * 1.25) * localOrbit
          + Math.cos(idlePhase * 1.4) * localHelix
          + (point.x - 0.5) * tunnelBreath * 7
          + Math.cos(idlePhase * 1.8) * localTwist;
        const y = point.y * height + parallax + idleY
          + Math.sin(idlePhase) * localOrbit * 0.58
          + Math.sin(idlePhase * 1.2) * localHelix * 0.34
          + (point.y - 0.5) * tunnelBreath * 6
          + Math.sin(idlePhase * 1.5) * localTwist * 0.28;
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
        context.globalAlpha = (quiet ? 0.035 : 0.14 + point.z * 0.105) * VISIBILITY_BOOST * depthPresence * readabilityAt(x, y);
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
      measureProtection();
      updateTarget();
      draw();
    };

    resize();
    const onScroll = () => {
      updateTarget();
      scheduleProtectionMeasure();
    };
    const layoutObserver = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(() => {
      measure();
      scheduleProtectionMeasure();
    });
    layoutObserver?.observe(document.body);
    window.addEventListener('resize', resize);
    window.addEventListener('scroll', onScroll, { passive: true });
    if (!reduced) frame = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', onScroll);
      layoutObserver?.disconnect();
      if (protectionFrame) cancelAnimationFrame(protectionFrame);
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
