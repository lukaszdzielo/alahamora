'use client';

import { useEffect, useRef } from 'react';

// Unoszące się świece w tle sekcji „Urodziny, klasy i okazje”.
// Pozycje są w % sekcji, więc przy różnych szerokościach ekranu świeca potrafi wjechać
// na nagłówek, opis albo sowę (Revelio). Po każdej zmianie rozmiaru sprawdzamy kolizje
// i takie świece chowamy (z zapasem na ich unoszenie się i poświatę).

// [left %, top %, opóźnienie s, skala]
const CANDLES = [[66, 16, 1.2, 0.9], [74, 26, 3.4, 1.05], [82, 13, 0.4, 0.8], [90, 23, 5.1, 1.1], [96, 15, 2.2, 0.85], [58, 20, 4.4, 0.95], [3, 18, 1.8, 1], [4, 36, 5.6, 0.8], [52, 30, 2.9, 1.15]];
// + ślady stóp Revelio (ścieżka czarodzieja przechodzi przez górę sekcji)
const AVOID = '.section-head h2, .section-head p, .rv--owl .rv__draw, .rv__step';
const MARGIN = 24;

export default function Candles() {
  const ref = useRef(null);

  useEffect(() => {
    const box = ref.current;
    const section = box?.closest('section');
    if (!box || !section) return;

    const check = () => {
      const avoid = Array.from(section.querySelectorAll(AVOID)).map((el) => el.getBoundingClientRect());
      box.querySelectorAll('.candle').forEach((candle) => {
        const r = candle.getBoundingClientRect();
        const hit = avoid.some(
          (o) => o.width && r.right + MARGIN > o.left && r.left - MARGIN < o.right && r.bottom + MARGIN > o.top && r.top - MARGIN - 10 < o.bottom,
        );
        if (hit) candle.dataset.hidden = 'true';
        else delete candle.dataset.hidden;
      });
    };

    check();
    const ro = new ResizeObserver(check);
    ro.observe(section);
    const timer = setTimeout(check, 1200); // po wczytaniu fontów
    return () => {
      ro.disconnect();
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="offers__candles" aria-hidden="true" ref={ref}>
      {CANDLES.map(([left, top, delay, scale], i) => (
        <span key={i} className="candle" style={{ left: `${left}%`, top: `${top}%`, animationDelay: `-${delay}s`, '--s': scale }}>
          <span className="candle__flame" style={{ animationDelay: `-${delay * 0.7}s` }} />
        </span>
      ))}
    </div>
  );
}
