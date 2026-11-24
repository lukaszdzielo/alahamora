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

    // błąd w pomiarze nie może wywrócić strony – w najgorszym razie ślady się nie pokażą
    const measure = () => {
      try {
        measureUnsafe();
      } catch {
        /* ignorujemy */
      }
    };

    const measureUnsafe = () => {
      const photo = document.querySelector('#menu .menu__photo');
      const col = document.querySelector('#menu .menu__col');
      const h2 = box.closest('section')?.querySelector('h2');
      const noteInk = [...document.querySelectorAll('#menu .rv__ink')].find((e) => e.textContent.startsWith('Tędy'));
      const noteRv = noteInk?.closest('.rv');
      if (!svg.getClientRects().length) {
        // ścieżka ukryta (telefon / duży desktop) – notatka wraca na swoje miejsce z CSS
        noteRv?.style.removeProperty('left');
        noteRv?.style.removeProperty('right');
        return;
      }
      if (!photo || !col || !h2) return;
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

      // Łącznik między sekcjami: ze zdjęcia w dół jednym długim, łagodnym łukiem – ślady kończą się
      // obok nagłówka „Urodziny…” lekkim odbiciem w prawo (czarodziej poszedł dalej), nie skrętem.
      // Łuk zaczyna się zaraz pod zdjęciem; jeśli ślady weszłyby na listę, zakręt robi się niżej.
      // (na 641–991 px notatka „Tędy…” stoi pod listą po prawej – CSS .rv--tedy)
      const x0 = Math.min(ph.l + (ph.r - ph.l) * 0.65, li.l - 45); // na zdjęciu, z dala od listy
      const x1 = Math.max(x0 + 40, hd.r + 100); // obok nagłówka
      const y0 = ph.b - 95;
      const desc = h2.closest('.section-head')?.querySelector('p');
      const yEnd = Math.min(hd.b - 15, desc ? rect(desc).t - 45 : Infinity); // nad opisem pod nagłówkiem
      const curve = (yA, f) => {
        const H = yEnd - yA;
        const dx = x1 - x0;
        return bezierPoints([[x0, yA], [x0, yA + H * f], [x1 - dx * 0.15, yEnd - H * 0.1], [x1 + 30, yEnd]]);
      };
      const clearOfList = (pts) => pts.every(([x, y]) => y > li.b + 12 || x < li.l - 40);
      let yA = ph.b + 20;
      let arc = null;
      for (const f of [0.55, 0.65, 0.75, 0.85, 0.95]) {
        const c = curve(yA, f);
        if (clearOfList(c)) { arc = c; break; }
      }
      if (!arc) {
        yA = Math.max(yA, li.b + 15);
        arc = curve(yA, 0.55);
      }
      const pts = [...Array.from({ length: 40 }, (_, i) => [x0, y0 + ((yA - y0) * i) / 40]), ...arc];
      // „Tędy przeszedł nocą czarodziej” tuż obok śladów (po prawej, a gdy brak miejsca – po lewej)
      if (noteInk && noteRv) {
        const n = rect(noteInk);
        const near = pts.filter(([, y]) => y > n.t - 15 && y < n.b + 15).map(([x]) => x);
        if (near.length) {
          const w = n.r - n.l;
          let left = Math.max(...near) + 42;
          if (left + w > b.width) left = Math.max(0, Math.min(...near) - 42 - w);
          noteRv.style.setProperty('left', `${Math.round(left)}px`, 'important');
          noteRv.style.setProperty('right', 'auto', 'important');
        }
      }

      const top = ph.b - 135;
      setGeo({ top, h: yEnd + 50 - top, pts: pts.map(([x, y]) => [x, y - top]) });
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
