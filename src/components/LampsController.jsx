'use client';

import { useEffect, useRef } from 'react';

// Świetlik i latarnie (Katowice) – lot sterowany przewijaniem („scroll-scrubbing”).
//
// Każda latarnia ma swój punkt na osi przewijania S_k: moment, w którym jej klosz dochodzi
// do linii na 82% wysokości ekranu. Pomiędzy S_k a S_(k+1) świetlik:
//   1) chwilę „odpoczywa” w zapalonej latarni k (DWELL),
//   2) potem leci łukiem do latarni k+1 – położenie zależy WPROST od przewinięcia:
//      im dalej przewiniesz, tym bliżej jest celu; cofasz – świetlik wraca,
//   3) w S_(k+1) dolatuje i latarnia k+1 się zapala (a k gaśnie).
// Przed pierwszą latarnią świetlik wlatuje z góry ekranu.
const LINE = 0.82; // linia zapalenia (część wysokości ekranu)
const DWELL = 0.3; // jaką część odcinka świetlik zostaje przy zapalonej latarni
const FIRST_FLIGHT = 0.7; // długość pierwszego lotu (w wysokościach ekranu)
const TAIL_GAP = 0.035; // odstęp kulek ogona (w postępie lotu)

const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const clamp01 = (v) => Math.max(0, Math.min(1, v));

function glassCenter(lamp) {
  const g = (lamp.querySelector('.hang__glass') || lamp).getBoundingClientRect();
  return [g.left + g.width / 2, g.top + g.height / 2];
}

// długie łańcuchy dociągamy do górnej krawędzi sekcji
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

// punkt na łuku (krzywa Béziera 2. stopnia) między a i b, wygiętym w prawo
function arcPoint(a, b, u) {
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
  const v = 1 - u;
  return [v * v * a[0] + 2 * v * u * c[0] + u * u * b[0], v * v * a[1] + 2 * v * u * c[1] + u * u * b[1]];
}

export default function LampsController() {
  const orbsRef = useRef(null);

  useEffect(() => {
    const lamps = Array.from(document.querySelectorAll('[data-lamp]'));
    const orbs = Array.from(orbsRef.current?.children ?? []);
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!lamps.length) return;

    let active = null;
    let frame = 0;

    const setActive = (lamp) => {
      if (lamp === active) return;
      active?.classList.remove('is-lit');
      lamp?.classList.add('is-lit');
      active = lamp;
    };

    const hideOrbs = () => orbs.forEach((o) => (o.style.opacity = '0'));

    const update = () => {
      frame = 0;
      const vh = window.innerHeight;
      const vw = window.innerWidth;
      const y = window.scrollY;
      const line = vh * LINE;

      // punkty zapalenia S_k (w px przewinięcia), posortowane od góry strony
      const items = lamps
        .map((lamp) => ({ lamp, S: glassCenter(lamp)[1] + y - line }))
        .sort((p, q) => p.S - q.S);

      // aktywna = ostatnia latarnia, do której już „doleciał” świetlik
      let k = -1;
      items.forEach((item, i) => {
        if (y >= item.S) k = i;
      });
      setActive(k >= 0 ? items[k].lamp : null);

      if (reduce || !orbs.length || k === items.length - 1) return hideOrbs();

      // odcinek lotu: od latarni k (albo z góry ekranu) do latarni k+1
      const next = items[k + 1];
      // pierwszy lot zaczyna się dopiero po lekkim przewinięciu (na samej górze strony świetlika nie ma)
      const from = k >= 0 ? items[k].S : Math.max(40, next.S - vh * FIRST_FLIGHT);
      const dwell = k >= 0 ? DWELL : 0;
      const progress = clamp01((y - from) / Math.max(1, next.S - from));
      const u = (progress - dwell) / (1 - dwell);
      if (u <= 0 || u >= 1) return hideOrbs();

      const start = k >= 0 ? glassCenter(items[k].lamp) : [vw * 0.08, -40];
      const end = glassCenter(next.lamp);
      end[1] = Math.min(end[1], vh + 40);

      const fadeIn = Math.min(1, u / 0.08);
      const fadeOut = u > 0.92 ? (1 - u) / 0.08 : 1;

      orbs.forEach((orb, i) => {
        const ui = ease(clamp01(u - i * TAIL_GAP));
        const [px, py] = arcPoint(start, end, ui);
        const scale = (1 - i * 0.15) * (0.75 + 0.45 * Math.sin(Math.PI * ui)) * (0.4 + 0.6 * fadeOut);
        orb.style.transform = `translate(${px.toFixed(1)}px, ${py.toFixed(1)}px) scale(${scale.toFixed(3)})`;
        orb.style.opacity = ((i ? 0.55 - i * 0.1 : 1) * fadeIn * fadeOut).toFixed(3);
      });
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const onResize = () => {
      fitChains();
      schedule();
    };

    fitChains();
    const timers = [300, 1500].map((ms) => setTimeout(onResize, ms)); // po wczytaniu fontów/zdjęć
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', onResize);
    update();

    return () => {
      cancelAnimationFrame(frame);
      timers.forEach(clearTimeout);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', onResize);
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
