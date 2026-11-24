'use client';

import { useEffect } from 'react';
import { REVELIO_TEST } from '@/data/revelio';

// Revelio: światło różdżki odsłania ukryte rysunki (.rv).
// Każdy .rv ma maskę – koło światła w punkcie (--rx, --ry) liczonym względem samego elementu.
// Liczymy to tylko dla elementów blisko ekranu, raz na klatkę (ruch myszy lub przewijanie).
// Bez kursora (telefon, tablet): elementy odsłaniają się przy przewijaniu (gdy są blisko środka
// ekranu) i pod palcem. Bez JS – CSS pokazuje je od razu (--rv-touch).
export default function RevelioController() {
  useEffect(() => {
    if (REVELIO_TEST || new URLSearchParams(window.location.search).get('revelio') === 'test') {
      document.documentElement.classList.add('revelio-test');
      return () => document.documentElement.classList.remove('revelio-test');
    }
    const items = Array.from(document.querySelectorAll('.rv'));
    if (!items.length) return;
    // telefon / tablet (bez kursora): rysunki i notatki są przygaszone i odsłaniają się same, gdy
    // przewijając dojdziemy do nich (środek ekranu), a dotknięcie ekranu daje światło jak różdżka
    const touch = !window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    document.documentElement.classList.add(touch ? 'has-revelio-touch' : 'has-revelio');

    const near = new Set();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => (e.isIntersecting ? near.add(e.target) : near.delete(e.target)));
        schedule(); // nowe elementy w pobliżu ekranu – od razu policz im światło
      },
      { rootMargin: '300px' },
    );
    items.forEach((el) => io.observe(el));

    let x = -9999;
    let y = -9999;
    let frame = 0;
    const update = () => {
      frame = 0;
      const vh = window.innerHeight;
      near.forEach((el) => {
        const r = el.getBoundingClientRect();
        el.style.setProperty('--rx', `${(x - r.left).toFixed(0)}px`);
        el.style.setProperty('--ry', `${(y - r.top).toFixed(0)}px`);
        if (touch) {
          // 1 w środkowym pasie ekranu, łagodnie do 0 przy górnej/dolnej krawędzi
          const d = Math.abs((r.top + r.bottom) / 2 - vh * 0.5) / (vh * 0.5);
          el.style.setProperty('--rv-near', Math.min(1, Math.max(0, (1 - d) * 1.8)).toFixed(2));
        }
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

    // dotyk: światło pod palcem, gaśnie chwilę po oderwaniu palca
    let off = 0;
    const onTouch = (event) => {
      const t = event.touches[0];
      if (!t) return;
      clearTimeout(off);
      x = t.clientX;
      y = t.clientY;
      schedule();
    };
    const onTouchEnd = () => {
      off = setTimeout(onLeave, 700);
    };

    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });
    if (!touch) {
      window.addEventListener('pointermove', onMove, { passive: true });
      document.documentElement.addEventListener('pointerleave', onLeave);
    } else {
      // (zdarzenia wskaźnika przy dotyku kończą się pointerleave przy przewijaniu – używamy touch*)
      window.addEventListener('touchstart', onTouch, { passive: true });
      window.addEventListener('touchmove', onTouch, { passive: true });
      window.addEventListener('touchend', onTouchEnd, { passive: true });
    }
    // pierwsze ustawienie (bez czekania na przewinięcie)
    setTimeout(schedule, 50);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(off);
      io.disconnect();
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      document.documentElement.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('touchstart', onTouch);
      window.removeEventListener('touchmove', onTouch);
      window.removeEventListener('touchend', onTouchEnd);
      document.documentElement.classList.remove('has-revelio', 'has-revelio-touch');
    };
  }, []);

  return null;
}
