'use client';

import { useEffect } from 'react';

// Revelio: światło różdżki odsłania ukryte rysunki (.rv).
// Każdy .rv ma maskę – koło światła w punkcie (--rx, --ry) liczonym względem samego elementu.
// Liczymy to tylko dla elementów blisko ekranu, raz na klatkę (ruch myszy lub przewijanie).
// Bez kursora (telefon, tablet) maski nie ma – CSS pokazuje rysunki od razu.
export default function RevelioController() {
  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const items = Array.from(document.querySelectorAll('.rv'));
    if (!items.length) return;
    document.documentElement.classList.add('has-revelio');

    const near = new Set();
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => (e.isIntersecting ? near.add(e.target) : near.delete(e.target))),
      { rootMargin: '300px' },
    );
    items.forEach((el) => io.observe(el));

    let x = -9999;
    let y = -9999;
    let frame = 0;
    const update = () => {
      frame = 0;
      near.forEach((el) => {
        const r = el.getBoundingClientRect();
        el.style.setProperty('--rx', `${(x - r.left).toFixed(0)}px`);
        el.style.setProperty('--ry', `${(y - r.top).toFixed(0)}px`);
      });
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const onMove = (event) => {
      x = event.clientX;
      y = event.clientY;
      schedule();
    };
    const onLeave = () => {
      x = -9999;
      y = -9999;
      schedule();
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('scroll', schedule, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
    return () => {
      cancelAnimationFrame(frame);
      io.disconnect();
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('scroll', schedule);
      document.documentElement.removeEventListener('pointerleave', onLeave);
      document.documentElement.classList.remove('has-revelio');
    };
  }, []);

  return null;
}
