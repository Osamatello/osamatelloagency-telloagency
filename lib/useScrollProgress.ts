'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Scroll-linked progress (0 → 1) for a section, based on how far it has passed
 * through the viewport. Drives the two scroll-story sections (The Shift, The
 * Path) without a scroll library or pinning.
 *
 * One rAF-throttled listener, reads layout once per frame, returns a number the
 * caller turns into transforms/opacity. Under prefers-reduced-motion it locks
 * to 1 so the resolved end-state is shown immediately.
 */
export function useScrollProgress<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (
      typeof window === 'undefined' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setProgress(1);
      return;
    }

    let raf = 0;
    const measure = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // 0 when the section top reaches the viewport bottom,
      // 1 when the section bottom reaches the viewport top.
      const span = r.height + vh;
      const travelled = vh - r.top;
      setProgress(Math.min(1, Math.max(0, travelled / span)));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return { ref, progress };
}
