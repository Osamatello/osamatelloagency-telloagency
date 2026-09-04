'use client';

import { type RefObject, useEffect, useRef } from 'react';

type Particle = {
  a: number;
  b: number;
  c: number;
  depth: number;
  size: number;
  phase: number;
  shape: number;
};

type Point = {
  x: number;
  y: number;
  z: number;
  scale: number;
  rotation: number;
};

type ProtectedZone = { left: number; top: number; right: number; bottom: number };

const SCENE_COUNT = 5;
const COLORS = ['#173e32', '#315f4d', '#6f8977', '#94a594', '#bbc3b8'];

const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));
const smooth = (value: number) => {
  const t = clamp(value);
  return t * t * (3 - 2 * t);
};

function seeded(index: number, salt: number) {
  const value = Math.sin(index * 97.13 + salt * 41.71) * 43758.5453;
  return value - Math.floor(value);
}

function perimeterPoint(progress: number) {
  const t = (progress * 4) % 4;
  if (t < 1) return { x: -1 + t * 2, y: -1 };
  if (t < 2) return { x: 1, y: -1 + (t - 1) * 2 };
  if (t < 3) return { x: 1 - (t - 2) * 2, y: 1 };
  return { x: -1, y: 1 - (t - 3) * 2 };
}

function targetFor(scene: number, index: number, particle: Particle, compact: boolean): Point {
  const centerX = compact ? 0.5 : 0.7;

  if (scene === 0) {
    // Architectural Frames — particles occupy five nested perspective frames.
    const frame = index % 5;
    const point = perimeterPoint(particle.a + Math.floor(index / 5) * 0.071);
    const scale = 0.42 + frame * 0.13;
    return {
      x: centerX + point.x * (compact ? 0.41 : 0.31) * scale + frame * 0.008,
      y: 0.5 + point.y * (compact ? 0.36 : 0.4) * scale - frame * 0.008,
      z: 0.28 + frame * 0.23,
      scale: 0.55 + frame * 0.08,
      rotation: point.x === 1 || point.x === -1 ? Math.PI / 2 : 0,
    };
  }

  if (scene === 1) {
    // Layered Grid Assemblies — three offset, partially populated spatial planes.
    const layer = index % 3;
    const column = Math.floor(index / 3) % 7;
    const row = Math.floor(index / 21) % 6;
    const gapX = compact ? 0.105 : 0.073;
    return {
      x: centerX + (column - 3) * gapX + (row - 2.5) * 0.018 + layer * 0.025,
      y: 0.5 + (row - 2.5) * 0.105 - layer * 0.035,
      z: 0.25 + layer * 0.46,
      scale: 0.52 + layer * 0.16,
      rotation: -0.18 + layer * 0.15,
    };
  }

  if (scene === 2) {
    // Folding Planes — three surfaces intersect through a shared spatial centre.
    const plane = index % 3;
    const slot = Math.floor(index / 3);
    const u = ((slot % 7) - 3) / 3;
    const v = ((Math.floor(slot / 7) % 5) - 2) / 2;
    const angles = [-0.5, 0.1, 0.62];
    const angle = angles[plane];
    const planeCenters = compact ? [0.35, 0.51, 0.67] : [0.57, 0.7, 0.81];
    return {
      x: planeCenters[plane] + u * Math.cos(angle) * 0.18 - v * Math.sin(angle) * 0.11,
      y: 0.5 + u * Math.sin(angle) * 0.15 + v * Math.cos(angle) * 0.19,
      z: 0.3 + plane * 0.36 + (v + 1) * 0.08,
      scale: 0.58 + plane * 0.12,
      rotation: angle + (plane === 1 ? Math.PI / 4 : 0),
    };
  }

  if (scene === 3) {
    // Structural Lattice — a localized three-dimensional projected assembly.
    const layer = index % 4;
    const column = Math.floor(index / 4) % 5;
    const row = Math.floor(index / 20) % 5;
    const offset = layer - 1.5;
    return {
      x: centerX + (column - 2) * (compact ? 0.15 : 0.09) + offset * 0.035,
      y: 0.5 + (row - 2) * 0.12 - offset * 0.045,
      z: 0.22 + layer * 0.38,
      scale: 0.52 + layer * 0.13,
      rotation: (column + row) % 2 ? Math.PI / 4 : -Math.PI / 4,
    };
  }

  // Nested Infrastructure Blocks — volumes within volumes, resolved around a core.
  const block = index % 5;
  const point = perimeterPoint(particle.b + Math.floor(index / 5) * 0.093);
  const scale = 0.24 + block * 0.14;
  return {
    x: centerX + point.x * (compact ? 0.43 : 0.32) * scale + block * 0.012,
    y: 0.51 + point.y * (compact ? 0.38 : 0.39) * scale - block * 0.012,
    z: 0.22 + block * 0.27,
    scale: 0.58 + block * 0.1,
    rotation: block % 2 ? 0.11 : -0.11,
  };
}

function drawGridPlane(
  context: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  width: number,
  height: number,
  skew: number,
  divisions: number
) {
  context.save();
  context.translate(cx, cy);
  context.transform(1, skew, 0.25, 1, 0, 0);
  context.strokeRect(-width / 2, -height / 2, width, height);
  for (let i = 1; i < divisions; i += 1) {
    const x = -width / 2 + (width * i) / divisions;
    const y = -height / 2 + (height * i) / divisions;
    context.beginPath();
    context.moveTo(x, -height / 2);
    context.lineTo(x, height / 2);
    context.moveTo(-width / 2, y);
    context.lineTo(width / 2, y);
    context.stroke();
  }
  context.restore();
}

function drawStructure(
  context: CanvasRenderingContext2D,
  scene: number,
  alpha: number,
  width: number,
  height: number,
  time: number,
  compact: boolean
) {
  const cx = width * (compact ? 0.5 : 0.7);
  const cy = height * 0.5;
  const unit = Math.min(width, height);
  const motion = Math.sin(time * 0.00022);

  context.save();
  context.globalAlpha = alpha;
  context.strokeStyle = '#315f4d';
  context.fillStyle = 'rgba(49, 95, 77, 0.035)';
  context.lineWidth = 1;

  if (scene === 0) {
    context.translate(cx, cy);
    context.rotate(-0.08 + motion * 0.025);
    for (let frame = 0; frame < 5; frame += 1) {
      const scale = 0.38 + frame * 0.14 + motion * 0.008 * frame;
      const w = unit * (compact ? 0.78 : 0.72) * scale;
      const h = unit * 0.88 * scale;
      context.save();
      context.transform(1, -0.05 * frame, 0.08 * frame, 1, frame * 4, -frame * 4);
      context.strokeRect(-w / 2, -h / 2, w, h);
      context.restore();
    }
  } else if (scene === 1) {
    for (let layer = 0; layer < 3; layer += 1) {
      const offset = (layer - 1) * unit * 0.07;
      drawGridPlane(
        context,
        cx + offset + motion * layer * 3,
        cy - offset,
        unit * (compact ? 0.62 : 0.56),
        unit * 0.48,
        -0.12 + layer * 0.1,
        5
      );
    }
  } else if (scene === 2) {
    const fold = motion * 0.045;
    const planes = [
      [[-0.42, -0.04], [-0.06, -0.35], [0.02, 0.18], [-0.3, 0.32]],
      [[-0.02, -0.35], [0.39, -0.12], [0.27, 0.35], [0.02, 0.18]],
      [[-0.3, 0.32], [0.02, 0.18], [0.27, 0.35], [-0.02, 0.46]],
    ];
    context.translate(cx, cy);
    context.rotate(fold);
    planes.forEach((plane, index) => {
      context.save();
      context.translate((index - 1) * motion * 4, index * motion * 2);
      context.beginPath();
      plane.forEach(([x, y], pointIndex) => {
        const px = x * unit;
        const py = y * unit;
        if (pointIndex === 0) context.moveTo(px, py);
        else context.lineTo(px, py);
      });
      context.closePath();
      context.fill();
      context.stroke();
      context.restore();
    });
  } else if (scene === 3) {
    const spacingX = unit * (compact ? 0.15 : 0.11);
    const spacingY = unit * 0.12;
    for (let depth = 0; depth < 4; depth += 1) {
      const ox = (depth - 1.5) * unit * 0.042;
      const oy = -(depth - 1.5) * unit * 0.048;
      context.globalAlpha = alpha * (0.55 + depth * 0.14);
      for (let line = -2; line <= 2; line += 1) {
        context.beginPath();
        context.moveTo(cx - spacingX * 2 + ox, cy + line * spacingY + oy);
        context.lineTo(cx + spacingX * 2 + ox, cy + line * spacingY + oy);
        context.moveTo(cx + line * spacingX + ox, cy - spacingY * 2 + oy);
        context.lineTo(cx + line * spacingX + ox, cy + spacingY * 2 + oy);
        context.stroke();
      }
      if (depth > 0) {
        context.beginPath();
        context.moveTo(cx - spacingX * 2 + ox, cy - spacingY * 2 + oy);
        context.lineTo(cx - spacingX * 2 + ox - unit * 0.042, cy - spacingY * 2 + oy + unit * 0.048);
        context.stroke();
      }
    }
  } else {
    context.translate(cx, cy);
    context.rotate(motion * 0.018);
    for (let block = 0; block < 5; block += 1) {
      const scale = 1 - block * 0.14;
      const offset = block * unit * 0.028;
      const w = unit * (compact ? 0.68 : 0.62) * scale;
      const h = unit * 0.7 * scale;
      context.strokeRect(-w / 2 + offset, -h / 2 - offset, w, h);
      context.beginPath();
      context.moveTo(-w / 2 + offset, -h / 2 - offset);
      context.lineTo(-w / 2 + offset + unit * 0.05, -h / 2 - offset - unit * 0.04);
      context.lineTo(w / 2 + offset + unit * 0.05, -h / 2 - offset - unit * 0.04);
      context.lineTo(w / 2 + offset, -h / 2 - offset);
      context.stroke();
    }
  }

  context.restore();
}

export function CompanyEnvironment({ rootRef }: { rootRef: RefObject<HTMLElement> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const root = rootRef.current;
    if (!canvas || !root) return;
    const context = canvas.getContext('2d');
    if (!context) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const compact = window.innerWidth < 640;
    const particles: Particle[] = Array.from({ length: compact ? 56 : 112 }, (_, index) => ({
      a: seeded(index, 1),
      b: seeded(index, 2),
      c: seeded(index, 3),
      depth: 0.28 + seeded(index, 4) * 1.05,
      size: 1.15 + seeded(index, 5) * 4.8,
      phase: seeded(index, 6) * Math.PI * 2,
      shape: index % 6,
    }));

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

    const updateTarget = () => {
      const rect = root.getBoundingClientRect();
      const distance = Math.max(root.offsetHeight - window.innerHeight, 1);
      target = clamp(-rect.top / distance) * (SCENE_COUNT - 1);
      if (reducedMotion) progress = target;
    };

    const applyReadabilityMask = () => {
      if (!protectedZones.length) return;
      context.save();
      context.globalCompositeOperation = 'destination-out';
      context.filter = 'blur(9px)';
      context.fillStyle = 'rgba(0, 0, 0, 0.56)';
      for (const zone of protectedZones) {
        context.fillRect(zone.left, zone.top, zone.right - zone.left, zone.bottom - zone.top);
      }
      context.restore();
    };

    const render = (time: number) => {
      context.clearRect(0, 0, width, height);

      const scene = Math.min(Math.floor(progress), SCENE_COUNT - 1);
      const nextScene = Math.min(scene + 1, SCENE_COUNT - 1);
      const mix = smooth(progress - scene);
      const ambientTime = reducedMotion ? 0 : time;

      drawStructure(context, scene, 0.21 * (1 - mix), width, height, ambientTime, compact);
      if (nextScene !== scene) {
        drawStructure(context, nextScene, 0.21 * mix, width, height, ambientTime, compact);
      }

      particles.forEach((particle, index) => {
        const from = targetFor(scene, index, particle, compact);
        const to = targetFor(nextScene, index, particle, compact);
        const point = {
          x: from.x + (to.x - from.x) * mix,
          y: from.y + (to.y - from.y) * mix,
          z: from.z + (to.z - from.z) * mix,
          scale: from.scale + (to.scale - from.scale) * mix,
          rotation: from.rotation + (to.rotation - from.rotation) * mix,
        };
        const ambient = ambientTime * (0.0001 + particle.depth * 0.000055);
        const drift = reducedMotion ? 0 : 3.5 + point.z * 5.5;
        const breathe = reducedMotion ? 1 : 1 + Math.sin(ambient * 1.7 + particle.phase) * 0.045;
        const x = point.x * width + Math.cos(ambient + particle.phase) * drift;
        const y = point.y * height + Math.sin(ambient * 0.83 + particle.phase) * drift * 0.72;
        const size = particle.size * point.scale * (0.68 + point.z * 0.44) * breathe;
        const alpha = 0.105 + clamp(point.z / 1.5) * 0.2;

        context.save();
        context.translate(x, y);
        context.rotate(point.rotation + particle.phase + ambient * (particle.shape % 2 ? 1 : -1));
        context.globalAlpha = alpha;
        context.fillStyle = COLORS[particle.shape % COLORS.length];
        context.strokeStyle = COLORS[particle.shape % COLORS.length];
        context.lineWidth = 0.9;

        if (particle.shape === 0) {
          context.beginPath();
          context.arc(0, 0, size, 0, Math.PI * 2);
          context.fill();
        } else if (particle.shape === 1 || particle.shape === 5) {
          context.fillRect(-size * 1.9, -size * 0.42, size * 3.8, size * 0.84);
        } else if (particle.shape === 2) {
          context.strokeRect(-size * 1.55, -size, size * 3.1, size * 2);
        } else if (particle.shape === 3) {
          context.beginPath();
          context.moveTo(0, -size * 1.55);
          context.lineTo(size * 1.25, size * 0.9);
          context.lineTo(-size * 1.1, size * 0.62);
          context.closePath();
          context.fill();
        } else {
          context.beginPath();
          context.moveTo(-size * 1.5, -size * 0.6);
          context.lineTo(size * 1.4, -size * 0.2);
          context.lineTo(size * 0.9, size * 0.7);
          context.lineTo(-size * 1.2, size * 0.45);
          context.closePath();
          context.stroke();
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
      const ratio = Math.min(window.devicePixelRatio || 1, 1.7);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      updateTarget();
      measureProtection();
      render(0);
    };

    const onScroll = () => {
      updateTarget();
      scheduleProtectionMeasure();
      if (reducedMotion) render(0);
    };

    resize();
    const layoutObserver = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(() => {
      updateTarget();
      scheduleProtectionMeasure();
    });
    layoutObserver?.observe(root);
    window.addEventListener('resize', resize);
    window.addEventListener('scroll', onScroll, { passive: true });
    if (!reducedMotion) frame = requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(frame);
      if (protectionFrame) window.cancelAnimationFrame(protectionFrame);
      layoutObserver?.disconnect();
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', onScroll);
    };
  }, [rootRef]);

  return <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 h-screen w-screen" />;
}
