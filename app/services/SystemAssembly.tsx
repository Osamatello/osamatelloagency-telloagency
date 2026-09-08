'use client';

import type { CSSProperties } from 'react';
import styles from './services.module.css';

/**
 * The Assembly — the Capabilities signature visual.
 *
 * An exploded axonometric of an operational system: each capability domain is
 * one machined stratum, held apart by structural risers so the whole build is
 * legible at once. It says the thing the page is arguing — that DAMASAVERO
 * designs the entire architecture, not one part of it — in the same hairline
 * drawing language the rest of the site already uses.
 *
 * Pure SVG. The idle separation breathes on CSS keyframes (no animation loop),
 * and the only state is which stratum the reader is on.
 */

const CX = 280;
const HALF = 168;
const DEPTH = 62;
const GAP = 62;
const TOP = 96;

const plateY = (i: number) => TOP + i * GAP;
const rhombus = (cy: number, w: number, d: number) =>
  `${CX - w},${cy} ${CX},${cy - d} ${CX + w},${cy} ${CX},${cy + d}`;

export function SystemAssembly({ count, active }: { count: number; active: number }) {
  const rows = Array.from({ length: count }, (_, i) => i);
  const lastY = plateY(count - 1);

  return (
    <svg
      className={styles.assembly}
      viewBox="0 0 560 520"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      {/* structural risers — the stack is one build, not six drawings */}
      <g className={styles.risers}>
        <line x1={CX - HALF} y1={plateY(0)} x2={CX - HALF} y2={lastY} />
        <line x1={CX + HALF} y1={plateY(0)} x2={CX + HALF} y2={lastY} />
        <line x1={CX} y1={plateY(0) + DEPTH} x2={CX} y2={lastY + DEPTH} />
        <line x1={CX} y1={plateY(0) - DEPTH} x2={CX} y2={lastY - DEPTH} />
      </g>

      {rows.map(i => {
        const cy = plateY(i);
        const on = i === active;
        return (
          <g
            key={i}
            className={styles.float}
            style={{ ['--i' as string]: i, animationDelay: `${i * -1.6}s` } as CSSProperties}
          >
            <g className={on ? `${styles.plate} ${styles.plateOn}` : styles.plate}>
              <polygon className={styles.plateFace} points={rhombus(cy, HALF, DEPTH)} />
              <polygon className={styles.plateInner} points={rhombus(cy, HALF * 0.62, DEPTH * 0.62)} />
              {/* module marks: this stratum is itself assembled from parts */}
              <line className={styles.plateMark} x1={CX - HALF * 0.34} y1={cy - DEPTH * 0.2} x2={CX + HALF * 0.34} y2={cy + DEPTH * 0.2} />
              <circle className={styles.plateNode} cx={CX - HALF * 0.62} cy={cy} r="3" />
              <circle className={styles.plateNode} cx={CX + HALF * 0.62} cy={cy} r="3" />
            </g>
          </g>
        );
      })}
    </svg>
  );
}
