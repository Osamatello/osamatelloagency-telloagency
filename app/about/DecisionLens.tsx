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

// Autonomous life: a continuous drifting field (never repeats — the wave
// frequencies are incommensurate) plus short overlapping "gusts" that lift a
// local group of pages. Both are pure maths inside the one physics loop.
const BASE_FAN = 0.13, BASE_TILT = 0.2;
const GUST_FAN = 0.2, GUST_TILT = 0.3;
// The scale/shear pair alone barely moves a page whose long axis is vertical,
// because both act on the horizontal distance from the binding. A swing about
// the bound inner edge lifts the free edge by the same amount whichever way
// the page points, so it carries most of the visible presence. Degrees per
// unit of tilt: the pointer swings harder than the field, so a hand on the
// Lens always reads as the stronger force.
const FIELD_SWING = 32, POINTER_SWING = 54;
type Gust = { c: number; drift: number; wid: number; amp: number; dir: number; t0: number; dur: number; cNow: number; env: number };

export function DecisionLens({ copy }: { copy: CompanyEditorial['lens'] }) {
  const [active, setActive] = useState<number | null>(null);
  const [reduced, setReduced] = useState(false);
  const ribRefs = useRef<(SVGPathElement | null)[]>([]);
  const lensRef = useRef<HTMLDivElement | null>(null);
  const bounds = useRef<DOMRect | null>(null);
  const gesture = useRef(createLensGesture());
  const id = useId();
  const insight = active === null ? null : copy.insights[active];

  // Motion state lives in refs — no React re-render on pointer movement.
  const reducedRef = useRef(false);
  const pointer = useRef<{ cx: number; cy: number } | null>(null);
  const lastMove = useRef(0);
  const grip = useRef(0);   // 0 = the field has the pages, 1 = the pointer does
  const gate = useRef(0);   // idle life fades in/out with visibility
  const fan = useRef<Float32Array>(new Float32Array(40).fill(1));
  const tilt = useRef<Float32Array>(new Float32Array(40));
  const swing = useRef<Float32Array>(new Float32Array(40));
  const wroteF = useRef<Float32Array>(new Float32Array(40).fill(1));
  const wroteT = useRef<Float32Array>(new Float32Array(40));
  const wroteS = useRef<Float32Array>(new Float32Array(40));
  const gusts = useRef<Gust[]>([]);
  const visible = useRef(true);
  const raf = useRef(0);
  const last = useRef(0);
  const origin = useRef(0);
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
    // Clearing the stored id matters: StrictMode's dev mount/cleanup/remount
    // otherwise leaves a cancelled frame id here, and `ensureLoop`'s
    // `if (!raf.current)` guard then refuses to start a fresh loop.
    raf.current = 0;
    last.current = 0;
    origin.current = 0;
    clearTimeout(settle.current);
    clearTimeout(idleTimer.current);
  }, []);

  function idleAllowed() {
    return !reducedRef.current && visible.current && !document.hidden;
  }

  // One rAF loop drives everything: the magnetic response, the autonomous
  // field, and the blend between them. Idle-only frames run at half rate.
  function tick(now: number) {
    raf.current = 0;
    if (!origin.current) origin.current = now;
    const p = pointer.current;
    const busy = !!p && now - lastMove.current < 420;

    const dt = last.current ? Math.min(now - last.current, 50) : 16.7;
    last.current = now;
    const step = (f: number) => 1 - Math.pow(1 - f, dt / 16.667);

    // The pointer takes the pages quickly and gives them back slowly, so a
    // resting cursor lets the Lens breathe again without a jolt.
    grip.current += ((busy ? 1 : 0) - grip.current) * step(busy ? 0.4 : 0.07);
    gate.current += ((idleAllowed() ? 1 : 0) - gate.current) * step(0.09);
    const w = grip.current, g = gate.current;
    const k = step(0.56 * w + 0.3 * (1 - w));
    const t = (now - origin.current) / 1000;

    const b = bounds.current;
    let has = false, px = 0, py = 0;
    if (p && b && !reducedRef.current) {
      const x = (p.cx - b.left) * 560 / b.width - 280;
      const y = (p.cy - b.top) * 550 / b.height - 275;
      px = 280 + x * COS_A + y * SIN_A;
      py = 275 - x * SIN_A + y * COS_A;
      has = true;
    }

    // Advance / retire the gusts once, not per page.
    const gs = gusts.current;
    if (g > 0.002) {
      for (let j = gs.length - 1; j >= 0; j--) {
        const gu = gs[j];
        const u = (now - gu.t0) / gu.dur;
        if (u >= 1) { gs.splice(j, 1); continue; }
        gu.cNow = gu.c + gu.drift * (now - gu.t0) / 1000;
        const e = Math.sin(Math.PI * u);
        gu.env = e * e * gu.amp * gu.dir;
      }
    } else if (gs.length) gs.length = 0;

    const cf = fan.current, ct = tilt.current, cs = swing.current;
    const wf = wroteF.current, wt = wroteT.current, ws = wroteS.current;
    let alive = false;
    for (let i = 0; i < 40; i++) {
      const rib = RIBS[i];
      let pf = 0, pt = 0;
      if (has) {
        const dx = px - rib.edgeX, dy = py - rib.edgeY;
        const dist = Math.hypot(dx, dy);
        const wgt = 1 - dist / 210;
        if (wgt > 0) {
          const weight = wgt * Math.sqrt(wgt); // gentle falloff, neighbours fan less
          const inv = 1 / Math.max(dist, 1), s = rib.side;
          pf = clamp(1 + dx * inv * .3 * s * weight, .74, 1.28) - 1;
          pt = clamp((dy * inv * .42 - .07) * s * weight, -.4, .4);
        }
      }
      let af = 0, at = 0;
      if (g > 0.002) {
        const ph = i * 0.41, s = rib.side;
        const s1 = Math.sin(t * 1.5 + ph);
        const s2 = Math.sin(t * 2.5 + ph * 1.7 + 2.1);
        const s3 = Math.sin(t * 1.95 + ph * 0.83 + 4.2);
        // A travelling envelope leaves pockets of the ring almost calm.
        const env = 0.18 + 0.82 * (0.5 + 0.5 * Math.sin(t * 0.34 + i * 0.13));
        let gf = 0;
        for (let j = 0; j < gs.length; j++) {
          const gu = gs[j];
          const d = (i - gu.cNow) / gu.wid;
          if (d > -1 && d < 1) { const q = 1 - d * d; gf += gu.env * q * q; }
        }
        // Overlapping gusts add up; cap the stack so a rare pile-up never
        // out-muscles a hand on the Lens. Single gusts pass through untouched.
        gf = clamp(gf, -1.2, 1.2);
        // Bounded a little under the pointer's own clamps (0.28 / 0.4), so the
        // field can throw a page a long way but never as far as a hand can.
        af = clamp(((s1 * 0.6 + s2 * 0.4) * BASE_FAN * env + gf * GUST_FAN * 0.8) * s, -.2, .2) * g;
        at = clamp(((s3 * 0.62 + s2 * 0.38) * BASE_TILT * env + gf * GUST_TILT) * s, -.28, .28) * g;
      }

      const tf = 1 + pf * w + af * (1 - w);
      const tt = pt * w + at * (1 - w);
      // The swing follows the same lift, so scale, shear and rotation stay one
      // coherent paper movement about the binding.
      const ts = pt * POINTER_SWING * w + at * FIELD_SWING * (1 - w);
      let nf = cf[i] + (tf - cf[i]) * k;
      let nt = ct[i] + (tt - ct[i]) * k;
      let ns = cs[i] + (ts - cs[i]) * k;
      if (Math.abs(nf - tf) < 1.2e-3 && Math.abs(nt - tt) < 1.2e-3 && Math.abs(ns - ts) < 0.02) {
        nf = tf; nt = tt; ns = ts;
      } else alive = true;
      cf[i] = nf; ct[i] = nt; cs[i] = ns;
      // Quantise before writing so slow pages skip most frames entirely.
      const qf = Math.round(nf * 1000) / 1000, qt = Math.round(nt * 1000) / 1000;
      const qs = Math.round(ns * 100) / 100;
      if (qf !== wf[i] || qt !== wt[i] || qs !== ws[i]) {
        wf[i] = qf; wt[i] = qt; ws[i] = qs;
        const el = ribRefs.current[i];
        if (el) el.style.transform = `rotate(${qs}deg) matrix(${qf},${qt},0,1,0,0)`;
      }
    }

    if (has || alive || g > 0.002) raf.current = requestAnimationFrame(tick);
    else { last.current = 0; origin.current = 0; }
  }
  function ensureLoop() {
    if (reducedRef.current) return;
    clearTimeout(settle.current);
    if (!raf.current) { last.current = 0; raf.current = requestAnimationFrame(tick); }
  }
  // Safety net for a stalled rAF — only when the pages are meant to be still.
  function forceRest() {
    if (pointer.current || idleAllowed()) return;
    cancelAnimationFrame(raf.current); raf.current = 0; last.current = 0; origin.current = 0;
    gusts.current.length = 0; grip.current = 0; gate.current = 0;
    const cf = fan.current, ct = tilt.current, cs = swing.current;
    const wf = wroteF.current, wt = wroteT.current, ws = wroteS.current;
    for (let i = 0; i < 40; i++) {
      cf[i] = 1; ct[i] = 0; cs[i] = 0; wf[i] = 1; wt[i] = 0; ws[i] = 0;
      if (ribRefs.current[i]) ribRefs.current[i]!.style.transform = 'rotate(0deg) matrix(1,0,0,1,0,0)';
    }
  }

  // Gusts are seeded often enough that one is almost always in flight, so the
  // Lens reads as continuously alive rather than as timed events.
  useEffect(() => {
    if (reducedRef.current) return;
    let stop = false;
    let io: IntersectionObserver | undefined;
    const el = lensRef.current;
    const wake = () => { if (!stop && idleAllowed()) ensureLoop(); };
    if (el && 'IntersectionObserver' in window) {
      io = new IntersectionObserver(([e]) => { visible.current = e.isIntersecting; wake(); });
      io.observe(el);
    }
    document.addEventListener('visibilitychange', wake);
    const spawn = () => {
      if (stop) return;
      if (idleAllowed()) {
        const gs = gusts.current;
        if (gs.length > 5) gs.shift();
        gs.push({
          c: 1 + Math.random() * 37,
          drift: (Math.random() - 0.5) * 7.2,
          wid: 1.8 + Math.random() * 3.4,
          amp: 0.7 + Math.random() * 0.9,
          dir: Math.random() < 0.5 ? -1 : 1,
          t0: performance.now(),
          dur: 520 + Math.random() * 780,
          cNow: 0, env: 0,
        });
        ensureLoop();
      }
      idleTimer.current = setTimeout(spawn, 240 + Math.random() * 520);
    };
    ensureLoop();
    idleTimer.current = setTimeout(spawn, 300 + Math.random() * 500);
    return () => {
      stop = true;
      io?.disconnect();
      document.removeEventListener('visibilitychange', wake);
      clearTimeout(idleTimer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);

  function measure(event: PointerEvent<HTMLDivElement>) {
    bounds.current = event.currentTarget.getBoundingClientRect();
  }
  function attract(event: PointerEvent<HTMLDivElement>) {
    if (!event.isPrimary) return;
    gesture.current.move(event.pointerId, event.clientX, event.clientY);
    if (reducedRef.current) return;
    const next = { cx: event.clientX, cy: event.clientY };
    const prev = pointer.current;
    // Only genuine movement hands control to the pointer; a resting cursor
    // lets the autonomous field take the pages back.
    if (!prev || prev.cx !== next.cx || prev.cy !== next.cy) lastMove.current = performance.now();
    pointer.current = next;
    ensureLoop();
  }
  function release() {
    pointer.current = null;
    ensureLoop();
    clearTimeout(settle.current);
    settle.current = setTimeout(forceRest, 650);
  }
  // Proximity target: the page whose body centre is nearest the point is the
  // one that visibly responded, so it is the one that opens.
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
          lastMove.current = performance.now();
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
