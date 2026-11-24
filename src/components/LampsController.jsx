'use client';

import { useEffect, useRef } from 'react';

// Świetlik i latarnie (Katowice).
// - Aktywna jest ostatnia latarnia, która weszła ok. 18% w głąb ekranu (linia na 82% wysokości).
// - Gdy aktywna latarnia się zmienia, świetlik (4 kulki: główna + ogon) leci łukiem
//   od poprzedniej latarni do nowej i ją zapala; poprzednia gaśnie.
// - Długie łańcuchy dociągamy do górnej krawędzi sekcji.
const LINE = 0.82;
const DURATION = 2100;

const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

function glassCenter(lamp) {
  const g = (lamp.querySelector('.hang__glass') || lamp).getBoundingClientRect();
  return [g.left + g.width / 2, g.top + g.height / 2];
}

function fitChains() {
  document.querySelectorAll('.hang:not(.hang--short) .hang__chain').forEach((chain) => {
    const section = chain.closest('section');
    const swing = chain.parentElement;
    if (!section || !swing) return;
    if (!chain.dataset.bottom) chain.dataset.bottom = String(chain.offsetTop + chain.offsetHeight);
    const top = section.getBoundingClientRect().top - swing.getBoundingClientRect().top;
    chain.style.top = `${top.toFixed(1)}px`;
    chain.style.height = `${Math.max(0, +chain.dataset.bottom - top).toFixed(1)}px`;
  });
}

export default function LampsController() {
  const orbsRef = useRef(null);

  useEffect(() => {
    const lamps = Array.from(document.querySelectorAll('[data-lamp]'));
    const orbs = Array.from(orbsRef.current?.children ?? []);
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!lamps.length) return;

    let active = null;
    let orbAt = null; // gdzie jest świetlik, jeśli jeszcze leci
    let raf = 0;
    let lastY = window.scrollY;

    const fly = (from, to, down) => {
      if (from) from.classList.remove('is-lit');
      if (reduce || !orbs.length) {
        if (to) to.classList.add('is-lit');
        return;
      }
      const W = window.innerWidth;
      const H = window.innerHeight;
      const clampY = ([x, y]) => [x, Math.max(-40, Math.min(H + 40, y))];
      const start0 = orbAt ? orbAt.slice() : null;
      const startFn = start0 ? () => start0 : from ? () => clampY(glassCenter(from)) : () => [W * 0.08, down ? -40 : H + 40];
      const endFn = to
        ? () => clampY(glassCenter(to))
        : () => {
            const a = startFn();
            return [a[0] + 30, down ? H + 60 : -60];
          };

      cancelAnimationFrame(raf);
      const t0 = performance.now();

      const step = (now) => {
        const t = Math.min(1, (now - t0) / DURATION);
        // cel liczony w każdej klatce – świetlik trafia w latarnię, nawet gdy strona się przewija
        const a = startFn();
        const b = endFn();
        const dx = b[0] - a[0];
        const dy = b[1] - a[1];
        const len = Math.hypot(dx, dy) || 1;
        const bend = Math.min(190, len * 0.35);
        let nx = -dy / len;
        let ny = dx / len;
        if (nx < 0) {
          nx = -nx;
          ny = -ny;
        }
        const c = [(a[0] + b[0]) / 2 + nx * bend, (a[1] + b[1]) / 2 + ny * bend];
        const point = (u) => {
          const v = 1 - u;
          return [v * v * a[0] + 2 * v * u * c[0] + u * u * b[0], v * v * a[1] + 2 * v * u * c[1] + u * u * b[1]];
        };
        const fadeIn = Math.min(1, t / 0.08);
        const fadeOut = t > 0.9 ? Math.max(0, (1 - t) / 0.1) : 1;

        orbs.forEach((orb, i) => {
          const u = ease(Math.max(0, t - i * 0.045));
          const p = point(u);
          const scale = (1 - i * 0.15) * (0.75 + 0.45 * Math.sin(Math.PI * u)) * (0.4 + 0.6 * fadeOut);
          orb.style.transform = `translate(${p[0].toFixed(1)}px, ${p[1].toFixed(1)}px) scale(${scale.toFixed(3)})`;
          orb.style.opacity = ((i ? 0.55 - i * 0.1 : 1) * fadeIn * fadeOut).toFixed(3);
          if (!i) orbAt = p;
        });

        if (to && t >= 0.88 && active === to) to.classList.add('is-lit');
        if (t < 1) raf = requestAnimationFrame(step);
        else orbAt = null;
      };
      raf = requestAnimationFrame(step);
    };

    let ticking = false;
    const tick = () => {
      ticking = false;
      const down = window.scrollY >= lastY;
      lastY = window.scrollY;
      const line = window.innerHeight * LINE;
      let best = null;
      lamps.forEach((lamp) => {
        if (glassCenter(lamp)[1] < line) best = lamp;
      });
      if (best !== active) {
        const from = active;
        active = best;
        fly(from, best, down);
      }
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(tick);
      }
    };

    fitChains();
    const timers = [300, 1500].map((ms) => setTimeout(fitChains, ms)); // po wczytaniu fontów/zdjęć
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', fitChains);
    tick();

    return () => {
      cancelAnimationFrame(raf);
      timers.forEach(clearTimeout);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', fitChains);
    };
  }, []);

  return (
    <div ref={orbsRef} aria-hidden="true">
      <span className="orb" />
      <span className="orb orb--tail" />
      <span className="orb orb--tail" />
      <span className="orb orb--tail" />
    </div>
  );
}
