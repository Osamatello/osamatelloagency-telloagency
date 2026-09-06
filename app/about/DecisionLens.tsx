'use client';

import { useEffect, useId, useRef, useState } from 'react';
import type { CSSProperties, PointerEvent } from 'react';
import { Pause, Play, X } from 'lucide-react';
import type { CompanyEditorial } from '@/lib/i18n/company';
import { createLensGesture } from './lens-gesture';
import styles from './about.module.css';

const SURFACES = [
  { x: 32, y: 24, angle: -35 },
  { x: 78, y: 38, angle: 40 },
  { x: 67, y: 76, angle: 145 },
  { x: 22, y: 64, angle: 215 },
];
const RIBS = Array.from({ length: 40 }, (_, i) => {
  const angle = ((i * 8.4 - 76) * Math.PI) / 180;
  const point = (radius: number, lift: number) => [
    +(280 + Math.cos(angle) * radius).toFixed(2),
    +(260 + Math.sin(angle) * radius * .82 + lift).toFixed(2),
  ];
  const [ox, oy] = point(205, 0), [ix, iy] = point(112, 0);
  const [bx, by] = point(205, 35), [jx, jy] = point(112, 35);
  return `M ${ox} ${oy} Q ${(ox + ix) / 2} ${(oy + iy) / 2 - 33} ${ix} ${iy} L ${jx} ${jy} Q ${(bx + jx) / 2} ${(by + jy) / 2 - 33} ${bx} ${by} Z`;
});

export function DecisionLens({ copy }: { copy: CompanyEditorial['lens'] }) {
  const [active, setActive] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(false);
  const figure = useRef<HTMLElement>(null);
  const surfaceRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const bounds = useRef<DOMRect | null>(null);
  const gesture = useRef(createLensGesture());
  const id = useId();
  const insight = active === null ? null : copy.insights[active];

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const preference = () => setReduced(media.matches);
    preference();
    media.addEventListener('change', preference);
    let inView = false;
    const visibility = () => setVisible(inView && !document.hidden);
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      visibility();
    });
    if (figure.current) observer.observe(figure.current);
    document.addEventListener('visibilitychange', visibility);
    return () => {
      observer.disconnect();
      media.removeEventListener('change', preference);
      document.removeEventListener('visibilitychange', visibility);
    };
  }, []);

  function resetMagnet() {
    surfaceRefs.current.forEach(button => {
      button?.style.setProperty('--mx', '0px');
      button?.style.setProperty('--my', '0px');
    });
  }
  function measure(event: PointerEvent<HTMLDivElement>) {
    // One measurement at entry/down, never a measurement on every frame.
    bounds.current = event.currentTarget.getBoundingClientRect();
  }
  function attract(event: PointerEvent<HTMLDivElement>) {
    if (!event.isPrimary) return;
    gesture.current.move(event.pointerId, event.clientX, event.clientY);
    if (reduced || paused || !bounds.current) return;
    const b = bounds.current;
    SURFACES.forEach((surface, i) => {
      const dx = event.clientX - b.left - b.width * surface.x / 100;
      const dy = event.clientY - b.top - b.height * surface.y / 100;
      const distance = Math.hypot(dx, dy);
      const reach = b.width * .38;
      const strength = Math.max(0, 1 - distance / reach) * 6;
      const button = surfaceRefs.current[i];
      button?.style.setProperty('--mx', `${dx / Math.max(distance, 1) * strength}px`);
      button?.style.setProperty('--my', `${dy / Math.max(distance, 1) * strength}px`);
    });
  }
  function dismiss() {
    if (active !== null) surfaceRefs.current[active]?.focus({ preventScroll: true });
    setActive(null);
  }

  return (
    <figure ref={figure} className={styles.heroFigure} data-running={visible && !paused && !reduced}
      onKeyDown={event => { if (event.key === 'Escape') { event.preventDefault(); dismiss(); } }}>
      <div className={styles.figureLabel}>
        <span className={styles.mark} />{copy.label}
        {!reduced && <button type="button" className={styles.motionToggle}
          aria-label={paused ? copy.resume : copy.pause} aria-pressed={paused}
          onClick={() => { setPaused(!paused); resetMagnet(); }}>
          {paused ? <Play size={13} aria-hidden="true" /> : <Pause size={13} aria-hidden="true" />}
        </button>}
      </div>
      <div className={styles.lens} data-lens=""
        onPointerEnter={measure}
        onPointerDown={event => {
          if (!event.isPrimary) { gesture.current.cancel(); resetMagnet(); return; }
          if (event.button !== 0) return;
          measure(event);
          gesture.current.start(event.pointerId, event.clientX, event.clientY);
          attract(event);
        }}
        onPointerMove={attract}
        onPointerUp={event => {
          gesture.current.end(event.pointerId, event.clientX, event.clientY);
          resetMagnet();
        }}
        onPointerCancel={() => { gesture.current.cancel(); resetMagnet(); }}
        onPointerLeave={() => { gesture.current.leave(); bounds.current = null; resetMagnet(); }}
        onClickCapture={event => {
          if (!gesture.current.allowsClick(event.detail)) { event.preventDefault(); event.stopPropagation(); }
        }}>
        <div className={styles.lensGeometry} aria-hidden="true">
          <svg viewBox="0 0 560 550" fill="none" focusable="false">
            <path className={styles.datum} d="M25 275H535M280 25V525M25 265V285M535 265V285M270 25H290M270 525H290" />
            <ellipse className={styles.guide} cx="280" cy="260" rx="230" ry="208" strokeDasharray="2 8" />
            <g className={styles.ribs}>{RIBS.map((path, i) => <path key={i} d={path} />)}</g>
          </svg>
        </div>
        <div className={styles.lensCentre}><span>{copy.centre[0]}</span><span>{copy.centre[1]}</span></div>
        {SURFACES.map((surface, i) => (
          <button key={i} ref={el => { surfaceRefs.current[i] = el; }} type="button"
            className={styles.lensSurface} data-surface={i}
            style={{ left: `${surface.x}%`, top: `${surface.y}%`, '--angle': `${surface.angle}deg` } as CSSProperties}
            aria-label={`0${i + 1} — ${copy.insights[i].title}`} aria-expanded={active === i} aria-controls={id}
            onClick={() => setActive(active === i ? null : i)}>
            <span aria-hidden="true">0{i + 1}</span>
          </button>
        ))}
      </div>
      <figcaption className={styles.lensHint}>
        <span className={styles.mouseHint}>{copy.caption}</span>
        <span className={styles.touchHint}>{copy.touchHint}</span>
      </figcaption>
      <div className={styles.lensNote}>
        <div id={id} aria-live="polite" aria-atomic="true">
          <span className={styles.insightIndex} aria-hidden="true">{active === null ? 'D / S' : `0${active + 1} / 04`}</span>
          <h3>{insight?.title ?? copy.idleTitle}</h3>
          <p>{insight?.body ?? copy.idleBody}</p>
        </div>
        {insight && <button type="button" className={styles.closeInsight} onClick={dismiss} aria-label={copy.close}><X size={16} aria-hidden="true" /></button>}
      </div>
    </figure>
  );
}
