'use client';

import { useEffect, useRef, useState } from 'react';
import { feetSteps, FeetSteps } from '@/lib/feet';

// Ślady stóp na całą szerokość pasa treści: x punktów w px albo w % ('30%'),
// przeliczane przy każdej zmianie szerokości – ścieżka zmienia kształt razem z ekranem,
// a odciski zostają tej samej wielkości (co `step` px).
export default function FeetFluid({ points, step = 55, h }) {
  const ref = useRef(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const ro = new ResizeObserver(([e]) => setWidth(Math.round(e.contentRect.width)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const P = points.map(([x, y]) => [typeof x === 'string' && x.endsWith('%') ? (parseFloat(x) / 100) * width : x, y]);
  return (
    <svg ref={ref} width="100%" height={h} fill="currentColor" style={{ overflow: 'visible' }}>
      {width > 0 && <FeetSteps steps={feetSteps(P, { step })} />}
    </svg>
  );
}
