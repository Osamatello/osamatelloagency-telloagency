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
const COS_A = Math.cos(FIXED_ANGLE);
const SIN_A = Math.sin(FIXED_ANGLE);
const clamp = (v: number, a: number, z: number) => Math.max(a, Math.min(z, v));
const HIT2 = 112 * 112; // squared forgiveness radius for proximity page selection
const RIBS = Array.from({ length: 40 }, (_, i) => {
  const angle = ((i * 8.4 - 76) * Math.PI) / 180;
  const point = (radius: number, lift: number) => [
    +(280 + Math.cos(angle) * radius).toFixed(2),
    +(260 + Math.sin(angle) * radius * .82 + lift).toFixed(2),
  ];
  const [ox, oy] = point(205, 0), [ix, iy] = point(112, 0);
  const [bx, by] = point(205, 35), [jx, jy] = point(112, 35);
  const edgeX = (ox + bx) / 2, edgeY = (oy + by) / 2;
  const anchorX = ix, anchorY = (iy + jy) / 2;
  return {
    path: `M ${ox} ${oy} Q ${(ox + ix) / 2} ${(oy + iy) / 2 - 33} ${ix} ${iy} L ${jx} ${jy} Q ${(bx + jx) / 2} ${(by + jy) / 2 - 33} ${bx} ${by} Z`,
    anchorX, anchorY, edgeX, edgeY,
    midX: (anchorX + edgeX) / 2, midY: (anchorY + edgeY) / 2, // page-body centre, used for hit-testing
    side: Math.sign(edgeX - anchorX) || 1,
  };
});

export function DecisionLens({ copy }: { copy: CompanyEditorial['lens'] }) {
  const [active, setActive] = useState<number | null>(null);
  const [reduced, setReduced] = useState(false);
  const ribRefs = useRef<(SVGPathElement | null)[]>([]);
  const lensRef = useRef<HTMLDivElement | null>(null);
  const bounds = useRef<DOMRect | null>(null);
  const gesture = useRef(createLensGesture());
  const id = useId();
  const insight = active === null ? null : copy.insights[active];

  // Physics + idle state lives in refs — no React re-render on pointer movement.
  const reducedRef = useRef(false);
  const pointer = useRef<{ cx: number; cy: number } | null>(null);
  const fan = useRef<Float32Array>(new Float32Array(40).fill(1));
  const tilt = useRef<Float32Array>(new Float32Array(40));
  const idleFan = useRef<Float32Array>(new Float32Array(40));
  const idleTilt = useRef<Float32Array>(new Float32Array(40));
  const idleOn = useRef(false);
  const visible = useRef(true);
  const raf = useRef(0);
  const last = useRef(0);
  const settle = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const idleTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const preference = () => { setReduced(media.matches); reducedRef.current = media.matches; };
    preference();
    media.addEventListener('change', preference);
    return () => media.removeEventListener('change', preference);
  }, []);

  useEffect(() => () => {
    cancelAnimationFrame(raf.current);
    clearTimeout(settle.current);
    clearTimeout(idleTimer.current);
  }, []);

  // Single rAF loop: reads the latest pointer once per frame, eases every page
  // toward its target with a direct transform write, and stops itself once the
  // pages have settled and the pointer is gone.
  function tick(now: number) {
    raf.current = 0;
    const dt = last.current ? Math.min(now - last.current, 50) : 16.7;
    last.current = now;
    const k = 1 - Math.pow(1 - 0.56, dt / 16.667); // fast, still eased — not a rigid follow

    const b = bounds.current;
    const p = pointer.current;
    let has = false, px = 0, py = 0;
    if (p && b && !reducedRef.current) {
      const x = (p.cx - b.left) * 560 / b.width - 280;
      const y = (p.cy - b.top) * 550 / b.height - 275;
      px = 280 + x * COS_A + y * SIN_A;
      py = 275 - x * SIN_A + y * COS_A;
      has = true;
    }

    const cf = fan.current, ct = tilt.current, idf = idleFan.current, idt = idleTilt.current;
    let alive = false;
    for (let i = 0; i < 40; i++) {
      let tf: number, tt: number;
      if (has) {
        const rib = RIBS[i];
        const dx = px - rib.edgeX, dy = py - rib.edgeY;
        const dist = Math.hypot(dx, dy);
        const w = 1 - dist / 210;
        if (w > 0) {
          const weight = w * Math.sqrt(w); // gentle falloff, neighbours fan less
          const inv = 1 / Math.max(dist, 1), s = rib.side;
          tf = clamp(1 + dx * inv * .26 * s * weight, .78, 1.24);
          tt = clamp((dy * inv * .36 - .06) * s * weight, -.34, .34);
        } else { tf = 1; tt = 0; }
      } else {
        tf = 1 + idf[i]; tt = idt[i]; // idle offsets (0 when nothing is stirring)
      }
      let nf = cf[i] + (tf - cf[i]) * k;
      let nt = ct[i] + (tt - ct[i]) * k;
      if (Math.abs(nf - tf) < 1.2e-3 && Math.abs(nt - tt) < 1.2e-3) { nf = tf; nt = tt; }
      else alive = true;
      if (nf !== cf[i] || nt !== ct[i]) {
        cf[i] = nf; ct[i] = nt;
        const el = ribRefs.current[i];
        if (el) el.style.transform = `matrix(${nf.toFixed(4)},${nt.toFixed(4)},0,1,0,0)`;
      }
    }

    if (has || alive) raf.current = requestAnimationFrame(tick);
    else last.current = 0;
  }
  function ensureLoop() {
    if (reducedRef.current) return;
    clearTimeout(settle.current);
    if (!raf.current) { last.current = 0; raf.current = requestAnimationFrame(tick); }
  }
  // Safety net: if rAF ever stalls mid-return, snap the pages back to rest.
  function forceRest() {
    if (pointer.current) return;
    cancelAnimationFrame(raf.current); raf.current = 0; last.current = 0;
    idleFan.current.fill(0); idleTilt.current.fill(0); idleOn.current = false;
    const cf = fan.current, ct = tilt.current;
    for (let i = 0; i < 40; i++) {
      cf[i] = 1; ct[i] = 0;
      if (ribRefs.current[i]) ribRefs.current[i]!.style.transform = 'matrix(1,0,0,1,0,0)';
    }
  }

  // Idle life: occasionally lift / fan a random page or a tiny nearby cluster.
  // Uses the same easing loop; setTimeout-paced so calm periods cost nothing.
  useEffect(() => {
    if (reducedRef.current) return;
    let stop = false;
    let io: IntersectionObserver | undefined;
    const el = lensRef.current;
    if (el && 'IntersectionObserver' in window) {
      io = new IntersectionObserver(([e]) => { visible.current = e.isIntersecting; });
      io.observe(el);
    }
    const beat = () => {
      if (stop) return;
      if (!pointer.current && !reducedRef.current && visible.current && !document.hidden) {
        const idf = idleFan.current, idt = idleTilt.current;
        const start = 2 + Math.floor(Math.random() * 36);
        const span = Math.random() < 0.55 ? 1 : Math.random() < 0.82 ? 2 : 3;
        const dir = Math.random() < 0.5 ? -1 : 1;
        for (let j = 0; j < span && start + j < 40; j++) {
          const f = 1 - j * 0.42;
          idf[start + j] = dir * (0.016 + Math.random() * 0.03) * f;
          idt[start + j] = dir * (0.028 + Math.random() * 0.05) * f;
        }
        idleOn.current = true;
        ensureLoop();
        setTimeout(() => {
          for (let j = 0; j < span && start + j < 40; j++) { idf[start + j] = 0; idt[start + j] = 0; }
          idleOn.current = false;
          if (!pointer.current) {
            ensureLoop();
            clearTimeout(settle.current);
            settle.current = setTimeout(forceRest, 520); // guarantee the page returns to rest
          }
        }, 460 + Math.random() * 520);
      }
      idleTimer.current = setTimeout(beat, 2600 + Math.random() * 4800);
    };
    idleTimer.current = setTimeout(beat, 1600 + Math.random() * 2200);
    return () => { stop = true; io?.disconnect(); clearTimeout(idleTimer.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);

  function measure(event: PointerEvent<HTMLDivElement>) {
    bounds.current = event.currentTarget.getBoundingClientRect();
  }
  function attract(event: PointerEvent<HTMLDivElement>) {
    if (!event.isPrimary) return;
    gesture.current.move(event.pointerId, event.clientX, event.clientY);
    if (reducedRef.current) return;
    if (idleOn.current) { idleFan.current.fill(0); idleTilt.current.fill(0); idleOn.current = false; }
    pointer.current = { cx: event.clientX, cy: event.clientY };
    ensureLoop();
  }
  function release() {
    pointer.current = null;
    ensureLoop();
    clearTimeout(settle.current);
    settle.current = setTimeout(forceRest, 650);
  }
  // Proximity target: the page whose free edge is nearest the point is the one
  // that visibly responded, so it is the one that opens. Larger, invisible.
  function resolveNearest(cx: number, cy: number, rect?: DOMRect): number | null {
    const b = bounds.current ?? rect;
    if (!b || b.width === 0) return null;
    const x = (cx - b.left) * 560 / b.width - 280;
    const y = (cy - b.top) * 550 / b.height - 275;
    const px = 280 + x * COS_A + y * SIN_A;
    const py = 275 - x * SIN_A + y * COS_A;
    let best = -1, bd = Infinity;
    for (let i = 0; i < 40; i++) {
      const dx = px - RIBS[i].midX, dy = py - RIBS[i].midY;
      const d = dx * dx + dy * dy;
      if (d < bd) { bd = d; best = i; }
    }
    return bd < HIT2 ? best : null;
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
      <div ref={lensRef} className={styles.lens} data-lens=""
        onPointerEnter={measure}
        onPointerDown={event => {
          if (!event.isPrimary) { gesture.current.cancel(); release(); return; }
          if (event.button !== 0) return;
          measure(event);
          gesture.current.start(event.pointerId, event.clientX, event.clientY);
          attract(event);
        }}
        onPointerMove={attract}
        onPointerUp={event => {
          gesture.current.end(event.pointerId, event.clientX, event.clientY);
          release();
        }}
        onPointerCancel={() => { gesture.current.cancel(); release(); }}
        onPointerLeave={() => { gesture.current.leave(); bounds.current = null; release(); }}
        onClickCapture={event => {
          if (!gesture.current.allowsClick(event.detail)) { event.preventDefault(); event.stopPropagation(); }
        }}
        onClick={event => {
          if (event.detail === 0) return; // keyboard activation handled on the page itself
          const n = resolveNearest(event.clientX, event.clientY, event.currentTarget.getBoundingClientRect());
          if (n !== null) setActive(active === n ? null : n);
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
