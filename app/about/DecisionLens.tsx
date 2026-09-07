'use client';

import { useEffect, useId, useRef, useState } from 'react';
import type { CSSProperties, PointerEvent } from 'react';
import { X } from 'lucide-react';
import type { CompanyEditorial } from '@/lib/i18n/company';
import { createLensGesture } from './lens-gesture';
import styles from './about.module.css';

// Every rib is a physical page: its inner vertical edge is the binding, the
// free body and outer edge respond to a nearby magnetic force. The Lens itself
// never rotates or moves.
const FIXED_ANGLE = -22 * Math.PI / 180;
const clamp = (v: number, a: number, z: number) => Math.max(a, Math.min(z, v));
const RIBS = Array.from({ length: 40 }, (_, i) => {
  const angle = ((i * 8.4 - 76) * Math.PI) / 180;
  const point = (radius: number, lift: number) => [
    +(280 + Math.cos(angle) * radius).toFixed(2),
    +(260 + Math.sin(angle) * radius * .82 + lift).toFixed(2),
  ];
  const [ox, oy] = point(205, 0), [ix, iy] = point(112, 0);
  const [bx, by] = point(205, 35), [jx, jy] = point(112, 35);
  return { path: `M ${ox} ${oy} Q ${(ox + ix) / 2} ${(oy + iy) / 2 - 33} ${ix} ${iy} L ${jx} ${jy} Q ${(bx + jx) / 2} ${(by + jy) / 2 - 33} ${bx} ${by} Z`, anchorX: ix, anchorY: (iy + jy) / 2, edgeX: (ox + bx) / 2, edgeY: (oy + by) / 2 };
});

export function DecisionLens({ copy }: { copy: CompanyEditorial['lens'] }) {
  const [active, setActive] = useState<number | null>(null);
  const [reduced, setReduced] = useState(false);
  const ribRefs = useRef<(SVGPathElement | null)[]>([]);
  const bounds = useRef<DOMRect | null>(null);
  const gesture = useRef(createLensGesture());
  const id = useId();
  const insight = active === null ? null : copy.insights[active];

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const preference = () => setReduced(media.matches);
    preference();
    media.addEventListener('change', preference);
    return () => media.removeEventListener('change', preference);
  }, []);

  function resetPages() {
    ribRefs.current.forEach(page => {
      if (!page) return;
      page.style.setProperty('--fan', '1');
      page.style.setProperty('--tilt', '0');
    });
  }
  function measure(event: PointerEvent<HTMLDivElement>) {
    bounds.current = event.currentTarget.getBoundingClientRect();
  }
  function attract(event: PointerEvent<HTMLDivElement>) {
    if (!event.isPrimary) return;
    gesture.current.move(event.pointerId, event.clientX, event.clientY);
    if (reduced || !bounds.current) return;
    const b = bounds.current;
    const x = (event.clientX - b.left) * 560 / b.width - 280;
    const y = (event.clientY - b.top) * 550 / b.height - 275;
    // Undo the fixed architectural angle to work in the SVG's coordinates.
    const px = 280 + x * Math.cos(FIXED_ANGLE) + y * Math.sin(FIXED_ANGLE);
    const py = 275 - x * Math.sin(FIXED_ANGLE) + y * Math.cos(FIXED_ANGLE);
    RIBS.forEach((rib, i) => {
      const dx = px - rib.edgeX, dy = py - rib.edgeY;
      const distance = Math.hypot(dx, dy);
      // Wide reach + gentle falloff = the closest page reacts most, neighbours
      // fan progressively less.
      const weight = Math.max(0, 1 - distance / 210) ** 1.5;
      const nx = dx / Math.max(distance, 1), ny = dy / Math.max(distance, 1);
      const side = Math.sign(rib.edgeX - rib.anchorX) || 1;
      // X scale + Y shear pivot about the binding: the inner edge stays fixed,
      // the free body lifts and the outer edge moves most.
      const fan = clamp(1 + nx * .26 * side * weight, .78, 1.24);
      const tilt = clamp((ny * .36 - .06) * side * weight, -.34, .34);
      const page = ribRefs.current[i];
      if (page) {
        page.style.setProperty('--fan', fan.toFixed(4));
        page.style.setProperty('--tilt', tilt.toFixed(4));
      }
    });
  }
  function dismiss() {
    if (active !== null) ribRefs.current[active]?.focus({ preventScroll: true });
    setActive(null);
  }

  return (
    <figure className={styles.heroFigure}
      onKeyDown={event => { if (event.key === 'Escape') { event.preventDefault(); dismiss(); } }}>
      <div className={styles.figureLabel}>
        <span className={styles.mark} />{copy.label}
      </div>
      <div className={styles.lens} data-lens=""
        onPointerEnter={measure}
        onPointerDown={event => {
          if (!event.isPrimary) { gesture.current.cancel(); resetPages(); return; }
          if (event.button !== 0) return;
          measure(event);
          gesture.current.start(event.pointerId, event.clientX, event.clientY);
          attract(event);
        }}
        onPointerMove={attract}
        onPointerUp={event => {
          gesture.current.end(event.pointerId, event.clientX, event.clientY);
          resetPages();
        }}
        onPointerCancel={() => { gesture.current.cancel(); resetPages(); }}
        onPointerLeave={() => { gesture.current.leave(); bounds.current = null; resetPages(); }}
        onClickCapture={event => {
          if (!gesture.current.allowsClick(event.detail)) { event.preventDefault(); event.stopPropagation(); }
        }}>
        <div className={styles.lensGeometry}>
          <svg viewBox="0 0 560 550" fill="none" focusable="false">
            <path aria-hidden="true" className={styles.datum} d="M25 275H535M280 25V525M25 265V285M535 265V285M270 25H290M270 525H290" />
            <ellipse aria-hidden="true" className={styles.guide} cx="280" cy="260" rx="230" ry="208" strokeDasharray="2 8" />
            <g className={styles.ribs}>
              {RIBS.map((rib, i) => (
                <path key={i} ref={el => { ribRefs.current[i] = el; }}
                  d={rib.path} data-rib={i} data-tone={i >= 28 ? 'deep' : i % 3 === 2 ? 'soft' : 'paper'}
                  className={styles.selectablePage}
                  style={{ transformOrigin: `${rib.anchorX}px ${rib.anchorY}px` } as CSSProperties}
                  role="button" tabIndex={0}
                  aria-label={copy.insights[i].title}
                  aria-expanded={active === i}
                  aria-controls={id}
                  onClick={() => setActive(active === i ? null : i)}
                  onKeyDown={event => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault();
                      if (!event.repeat) setActive(active === i ? null : i);
                    }
                  }} />
              ))}
            </g>
          </svg>
        </div>
        <div className={styles.lensCentre}><span>{copy.centre[0]}</span><span>{copy.centre[1]}</span></div>
      </div>
      <figcaption className={styles.lensHint}>
        <span className={styles.mouseHint}>{copy.caption}</span>
        <span className={styles.touchHint}>{copy.touchHint}</span>
      </figcaption>
      <div className={styles.lensNote}>
        <div id={id} aria-live="polite" aria-atomic="true">
          <span className={styles.insightIndex} aria-hidden="true">{active === null ? 'D / S' : `${String(active + 1).padStart(2, '0')} / ${RIBS.length}`}</span>
          <h3>{insight?.title ?? copy.idleTitle}</h3>
          <p>{insight?.body ?? copy.idleBody}</p>
        </div>
        {insight && <button type="button" className={styles.closeInsight} onClick={dismiss} aria-label={copy.close}><X size={16} aria-hidden="true" /></button>}
      </div>
    </figure>
  );
}
