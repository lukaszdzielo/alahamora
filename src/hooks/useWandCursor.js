'use client';

import { useEffect, useRef } from 'react';

/**
 * Różdżka jako kursor.
 * Zwraca ref do elementu różdżki; hook przesuwa go za myszą (requestAnimationFrame)
 * i sam sprząta nasłuchiwanie przy odmontowaniu komponentu.
 * Na ekranach dotykowych (brak precyzyjnego wskaźnika) nic nie robi.
 */
export default function useWandCursor() {
  const wandRef = useRef(null);

  useEffect(() => {
    const wand = wandRef.current;
    if (!wand || !window.matchMedia('(pointer: fine)').matches) return;

    let frame = 0;
    let x = -200;
    let y = -200;

    const render = () => {
      frame = 0;
      wand.style.translate = `${x}px ${y}px`;
    };

    const onMove = (event) => {
      x = event.clientX;
      y = event.clientY;
      wand.dataset.visible = 'true';
      if (!frame) frame = requestAnimationFrame(render);
    };

    const onLeave = () => {
      wand.dataset.visible = 'false';
    };

    document.documentElement.classList.add('has-wand');
    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);

    // Sprzątanie – ważna część pracy z useEffect.
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
      document.documentElement.classList.remove('has-wand');
    };
  }, []);

  return wandRef;
}
