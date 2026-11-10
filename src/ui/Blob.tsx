'use client';

import { useEffect, useRef } from 'react';

/**
 * Cursor blob without React setState on every pointermove (that janks the
 * main thread). Updates DOM styles via rAF — Motion/Next perf guidance.
 */
export default function Blob() {
  const blobRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef(0);
  const pendingRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const el = blobRef.current;
    if (!el) return;

    const flush = () => {
      frameRef.current = 0;
      const next = pendingRef.current;
      if (!next) return;
      el.style.left = `${next.x}px`;
      el.style.top = `${next.y}px`;
      el.style.display = 'block';
    };

    const onMove = (event: PointerEvent) => {
      pendingRef.current = { x: event.clientX, y: event.clientY };
      if (!frameRef.current) {
        frameRef.current = requestAnimationFrame(flush);
      }
    };

    const onLeave = () => {
      el.style.display = 'none';
    };

    document.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);

    return () => {
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <div
      ref={blobRef}
      style={{ display: 'none', left: 0, top: 0 }}
      className="w-28 aspect-square bg-secondary fixed -translate-x-1/2 -translate-y-1/2 blur-3xl rounded-full opacity-40 pointer-events-none will-change-transform"
    />
  );
}
