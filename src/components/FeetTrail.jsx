'use client';

import { useEffect, useRef, useState } from 'react';
import { bezierPoints, stepsAlong, FeetSteps } from '@/lib/feet';

// Ścieżka czarodzieja na tablecie / mniejszym desktopie (641–1247 px): zaczyna się na zdjęciu
// w menu i schodzi w dół do sekcji „Urodziny…” – łącznik między sekcjami (bez skrętu w bok).
// Położenie zdjęcia i listy zależy od szerokości, więc punkty liczymy z DOM.
// przesunięcie z animacji pojawiania się (data-appear) – liczymy pozycję docelową
const offsetY = (el) => {
  const a = el.closest('[data-appear]');
  return a ? parseFloat(getComputedStyle(a).translate.split(' ')[1]) || 0 : 0;
};

export default function FeetTrail({ step = 55 }) {
  const ref = useRef(null);
  const [geo, setGeo] = useState(null);

  useEffect(() => {
    const svg = ref.current;
    const rv = svg?.parentElement;
    const box = rv?.parentElement; // .rv-box sekcji ofert
    if (!box) return undefined;

    const measure = () => {
      const photo = document.querySelector('#menu .menu__photo');
      const col = document.querySelector('#menu .menu__col');
      const h2 = box.closest('section')?.querySelector('h2');
      if (!photo || !col || !h2 || !svg.getClientRects().length) return;
      const b = box.getBoundingClientRect();
      const rect = (el, r = el.getBoundingClientRect()) => {
        const dy = offsetY(el);
        return { l: r.left - b.left, r: r.right - b.left, t: r.top - b.top - dy, b: r.bottom - b.top - dy };
      };
      const ph = rect(photo);
      const li = rect(col);
      const range = document.createRange();
      range.selectNodeContents(h2);
      const hd = rect(h2, range.getBoundingClientRect()); // sam tekst nagłówka „Urodziny…”
      const orn = h2.previousElementSibling ? rect(h2.previousElementSibling) : hd;

      // Łącznik między sekcjami: ze zdjęcia w dół, bez skrętu w bok – jedynie łagodne przesunięcie
      // w prawo (płynne „S”), tak żeby ślady kończyły się obok nagłówka „Urodziny…”, a nie na nim.
      // Przesunięcie odbywa się poniżej listy, jeśli inaczej ślady weszłyby na listę (wąski tablet).
      // (na 641–991 px notatka „Tędy…” stoi pod listą po prawej – CSS .rv--tedy)
      const x0 = Math.min(ph.l + (ph.r - ph.l) * 0.65, li.l - 45); // na zdjęciu, z dala od listy
      const x1 = Math.max(x0, hd.r + 60); // obok nagłówka
      const y0 = ph.b - 95;
      const yA = x1 > li.l - 45 ? li.b + 15 : ph.b + 20; // tu zaczyna się przesunięcie
      const yB = Math.max(orn.t - 10, yA + 120); // tu się kończy
      const yEnd = (hd.t + hd.b) / 2;
      const line = (x, ya, yb) => Array.from({ length: 40 }, (_, i) => [x, ya + ((yb - ya) * i) / 40]);
      const h = yB - yA;
      const pts = [
        ...line(x0, y0, yA),
        ...bezierPoints([[x0, yA], [x0, yA + h * 0.5], [x1, yB - h * 0.5], [x1, yB]]),
        ...line(x1, yB, yEnd).slice(1),
        [x1, yEnd],
      ];
      const top = ph.b - 135;
      setGeo({ top, h: yEnd + 40 - top, pts: pts.map(([x, y]) => [x, y - top]) });
      rv.style.top = `${Math.round(top)}px`;
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(box);
    ['#menu', '#menu .menu__photo', '#menu .menu__col'].forEach((sel) => {
      const el = document.querySelector(sel);
      if (el) ro.observe(el);
    });
    document.fonts?.ready.then(measure);
    window.addEventListener('load', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('load', measure);
    };
  }, []);

  return (
    <svg ref={ref} width="100%" height={geo?.h ?? 1} fill="currentColor" style={{ overflow: 'visible' }}>
      {geo && <FeetSteps steps={stepsAlong(geo.pts, { step })} />}
    </svg>
  );
}
