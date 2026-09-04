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

type Point = { x: number; y: number };

const SCENES = 6;

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

function ease(value: number) {
  const t = clamp(value);
  return t * t * (3 - 2 * t);
}

function seeded(index: number, salt: number) {
  const value = Math.sin(index * 97.13 + salt * 41.71) * 43758.5453;
  return value - Math.floor(value);
}

function targetFor(scene: number, index: number, particle: Particle): Point {
  const { a, b, c } = particle;

  switch (scene) {
    case 0: {
      // An offset architectural assembly: ordered, but deliberately incomplete.
      const column = index % 5;
      const row = Math.floor(index / 5) % 11;
      return {
        x: 0.59 + column * 0.072 + (a - 0.5) * 0.028,
        y: 0.14 + row * 0.067 + (b - 0.5) * 0.025,
      };
    }
    case 1: {
      // Structural fragments pulled toward the outer field, leaving a quiet core.
      const side = index % 3;
      return {
        x: side === 0 ? 0.09 + a * 0.2 : side === 1 ? 0.7 + a * 0.23 : 0.47 + (a - 0.5) * 0.14,
        y: 0.08 + b * 0.84,
      };
    }
    case 2: {
      // Four spatial planes supporting the four operating principles.
      const group = index % 4;
      const centers = [
        [0.17, 0.24],
        [0.82, 0.28],
        [0.22, 0.76],
        [0.78, 0.72],
      ];
      const center = centers[group];
      return {
        x: center[0] + (a - 0.5) * 0.22,
        y: center[1] + (b - 0.5) * 0.18,
      };
    }
    case 3: {
      // A measured, stepped reasoning field rather than a connected route.
      const column = index % 3;
      const row = Math.floor(index / 3) % 8;
      return {
        x: 0.13 + column * 0.36 + (a - 0.5) * 0.09,
        y: 0.12 + row * 0.105 + column * 0.035 + (b - 0.5) * 0.025,
      };
    }
    case 4: {
      // Nested operational layers, compressed toward an off-centre core.
      const ring = index % 4;
      const angle = c * Math.PI * 2;
      const rx = 0.1 + ring * 0.065;
      const ry = 0.075 + ring * 0.048;
      return {
        x: 0.36 + Math.cos(angle) * rx,
        y: 0.5 + Math.sin(angle) * ry,
      };
    }
    default: {
      // A resolved, calm vertical assembly for leadership and engagement.
      const band = index % 4;
      return {
        x: 0.65 + band * 0.07 + (a - 0.5) * 0.035,
        y: 0.14 + b * 0.72,
      };
    }
  }
}

function drawFrames(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  sceneProgress: number,
  time: number
) {
  const scene = Math.round(sceneProgress);
  const pulse = Math.sin(time * 0.00035) * 5;

  context.save();
  context.lineWidth = 1;
  context.strokeStyle = 'hsla(136, 24%, 29%, 0.13)';

  if (scene <= 1) {
    context.translate(width * 0.76, height * 0.48);
    context.rotate(-0.12 + Math.sin(time * 0.00012) * 0.025);
    for (let i = 0; i < 4; i += 1) {
      const frameWidth = width * (0.11 + i * 0.055);
      const frameHeight = height * (0.16 + i * 0.075);
      context.strokeRect(-frameWidth / 2, -frameHeight / 2, frameWidth, frameHeight);
    }
  } else if (scene === 2) {
    const centers = [
      [0.17, 0.24],
      [0.82, 0.28],
      [0.22, 0.76],
      [0.78, 0.72],
    ];
    centers.forEach(([x, y], index) => {
      context.save();
      context.translate(width * x, height * y);
      context.rotate((index % 2 ? 1 : -1) * 0.1 + Math.sin(time * 0.00016 + index) * 0.025);
      context.strokeRect(-54 - pulse, -30, 108 + pulse * 2, 60);
      context.restore();
    });
  } else if (scene === 3) {
    context.translate(width * 0.78, height * 0.46);
    context.rotate(0.13 + Math.sin(time * 0.00013) * 0.03);
    for (let i = 0; i < 3; i += 1) {
      context.beginPath();
      context.moveTo(-110 + i * 24, -150 + i * 18);
      context.lineTo(100 + i * 16, -95 + i * 18);
      context.lineTo(74 + i * 13, 135 - i * 12);
      context.lineTo(-128 + i * 18, 92 - i * 8);
      context.closePath();
      context.stroke();
    }
  } else {
    context.translate(width * 0.36, height * 0.5);
    context.rotate(Math.sin(time * 0.0001) * 0.025);
    for (let i = 0; i < 4; i += 1) {
      const scale = 1 - i * 0.17;
      context.strokeRect(-150 * scale, -105 * scale, 300 * scale, 210 * scale);
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
    const particles: Particle[] = Array.from(
      { length: window.innerWidth < 640 ? 38 : 76 },
      (_, index) => ({
        a: seeded(index, 1),
        b: seeded(index, 2),
        c: seeded(index, 3),
        depth: 0.35 + seeded(index, 4) * 0.65,
        size: 1.1 + seeded(index, 5) * 4.2,
        phase: seeded(index, 6) * Math.PI * 2,
        shape: index % 5,
      })
    );

    let width = 0;
    let height = 0;
    let progress = 0;
    let frame = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const updateProgress = () => {
      const rect = root.getBoundingClientRect();
      const distance = Math.max(root.offsetHeight - window.innerHeight, 1);
      progress = clamp(-rect.top / distance);
    };

    const render = (time: number) => {
      context.clearRect(0, 0, width, height);

      const sceneProgress = progress * (SCENES - 1);
      const scene = Math.min(Math.floor(sceneProgress), SCENES - 1);
      const nextScene = Math.min(scene + 1, SCENES - 1);
      const mix = ease(sceneProgress - scene);

      drawFrames(context, width, height, sceneProgress, reducedMotion ? 0 : time);

      particles.forEach((particle, index) => {
        const start = targetFor(scene, index, particle);
        const end = targetFor(nextScene, index, particle);
        const baseX = start.x + (end.x - start.x) * mix;
        const baseY = start.y + (end.y - start.y) * mix;
        const ambient = reducedMotion ? 0 : time * (0.00012 + particle.depth * 0.00007);
        const driftX = Math.cos(ambient + particle.phase) * (3 + particle.depth * 8);
        const driftY = Math.sin(ambient * 0.82 + particle.phase) * (3 + particle.depth * 7);
        const x = baseX * width + driftX;
        const y = baseY * height + driftY;
        const size = particle.size * (0.7 + particle.depth * 0.55);
        const alpha = 0.075 + particle.depth * 0.15;

        context.save();
        context.translate(x, y);
        context.rotate(particle.phase + ambient * (particle.shape % 2 ? 1 : -1));
        context.fillStyle = `hsla(136, ${16 + particle.depth * 12}%, ${27 + (1 - particle.depth) * 20}%, ${alpha})`;
        context.strokeStyle = `hsla(142, 20%, 24%, ${alpha * 0.82})`;
        context.lineWidth = 0.8;

        if (particle.shape === 0) {
          context.beginPath();
          context.arc(0, 0, size, 0, Math.PI * 2);
          context.fill();
        } else if (particle.shape === 1 || particle.shape === 4) {
          context.fillRect(-size * 1.8, -size * 0.45, size * 3.6, size * 0.9);
        } else if (particle.shape === 2) {
          context.strokeRect(-size * 1.7, -size, size * 3.4, size * 2);
        } else {
          context.beginPath();
          context.moveTo(0, -size * 1.6);
          context.lineTo(size * 1.2, size);
          context.lineTo(-size * 1.1, size * 0.65);
          context.closePath();
          context.fill();
        }
        context.restore();
      });

      if (!reducedMotion) frame = window.requestAnimationFrame(render);
    };

    resize();
    updateProgress();
    render(0);
    window.addEventListener('resize', resize, { passive: true });
    window.addEventListener('scroll', updateProgress, { passive: true });

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', updateProgress);
    };
  }, [rootRef]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-screen w-screen"
    />
  );
}
