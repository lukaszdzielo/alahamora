'use client';

import { useEffect, useRef, useState } from 'react';
import { feetStepsThrough, FeetSteps } from '@/lib/feet';

// Ścieżka czarodzieja na tablecie / mniejszym desktopie (641–1247 px): jak na dużym ekranie
// zaczyna się na zdjęciu w menu, schodzi w dół pustą kolumną pod zdjęciem, mija koniec
// notatki „Tędy przeszedł…” i skręca w prawo nad „Urodzinami…” (w stronę sowy).
// Położenie zdjęcia, listy i notatki zależy od szerokości, więc punkty liczymy z DOM.
const offsetY = (el) => parseFloat(getComputedStyle(el).translate.split(' ')[1]) || 0; // animacja pojawiania się

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
      const note = [...document.querySelectorAll('#menu .rv__ink')].find((e) => e.textContent.startsWith('Tędy'));
      if (!photo || !col || !note || !svg.getClientRects().length) return;
      const b = box.getBoundingClientRect();
      const rect = (el) => {
        const r = el.getBoundingClientRect();
        const dy = offsetY(el);
        return { l: r.left - b.left, r: r.right - b.left, t: r.top - b.top - dy, b: r.bottom - b.top - dy };
      };
      const ph = rect(photo);
      const li = rect(col);
      const no = rect(note);
      const W = b.width;

      const x0 = Math.min(ph.l + (ph.r - ph.l) * 0.7, li.l - 30); // na zdjęciu, z dala od listy
      const xNote = Math.max(no.r + 40, x0 + 15); // mija koniec notatki
      const xDown = Math.min(xNote, li.l - 45);
      const end = [W * 0.86, 95];
      const pts = [
        [x0, ph.b - 95],
        [xDown, li.b - 15],
        [xNote, (no.t + no.b) / 2],
        [(xNote + end[0]) / 2, 62],
        end,
      ];
      const top = ph.b - 135;
      setGeo({ top, h: 140 - top, pts: pts.map(([x, y]) => [x, y - top]) });
      rv.style.top = `${Math.round(top)}px`;
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(box);
    const menu = document.querySelector('#menu');
    if (menu) ro.observe(menu);
    document.fonts?.ready.then(measure);
    return () => ro.disconnect();
  }, []);

  return (
    <svg ref={ref} width="100%" height={geo?.h ?? 1} fill="currentColor" style={{ overflow: 'visible' }}>
      {geo && <FeetSteps steps={feetStepsThrough(geo.pts, { step })} />}
    </svg>
  );
}
