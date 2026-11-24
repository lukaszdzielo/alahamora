// Ślady stóp wzdłuż krzywej Béziera (4 punkty kontrolne), na przemian lewa i prawa stopa.
// n – liczba śladów albo step – odstęp w px (liczba wychodzi z długości krzywej).
// Rozkłada ślady co równy odcinek wzdłuż gęsto spróbkowanej linii (pts).
export function stepsAlong(pts, { n, step }) {
  const len = [0];
  for (let i = 1; i < pts.length; i += 1) len.push(len[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
  const total = len[len.length - 1];
  const count = n ?? Math.max(3, Math.round(total / step) + 1);
  const last = pts.length - 1;

  const out = [];
  for (let k = 0; k < count; k += 1) {
    const target = (total * k) / (count - 1);
    let i = len.findIndex((v) => v >= target);
    if (i < 0) i = last;
    const a = pts[Math.max(i - 2, 0)];
    const b = pts[Math.min(i + 2, last)];
    const ang = Math.atan2(b[1] - a[1], b[0] - a[0]);
    const side = k % 2 ? 9 : -9;
    out.push({
      x: Math.round(pts[i][0] - Math.sin(ang) * side),
      y: Math.round(pts[i][1] + Math.cos(ang) * side),
      rot: Math.round((ang * 180) / Math.PI + 90),
    });
  }
  return out;
}

// Punkty krzywej Béziera z 4 punktów kontrolnych.
export function bezierPoints(P, count = 401) {
  const bz = (t) => {
    const u = 1 - t;
    return [0, 1].map((k) => u ** 3 * P[0][k] + 3 * u * u * t * P[1][k] + 3 * u * t * t * P[2][k] + t ** 3 * P[3][k]);
  };
  return Array.from({ length: count }, (_, i) => bz(i / (count - 1)));
}

export function feetSteps(P, opts) {
  return stepsAlong(bezierPoints(P), opts);
}

// Gładka linia PRZEZ podane punkty (centripetal Catmull-Rom – bez pętli przy nierównych odstępach).
export function feetStepsThrough(P, opts) {
  const ext = [[2 * P[0][0] - P[1][0], 2 * P[0][1] - P[1][1]], ...P, [2 * P.at(-1)[0] - P.at(-2)[0], 2 * P.at(-1)[1] - P.at(-2)[1]]];
  const pts = [];
  for (let s = 1; s < ext.length - 2; s += 1) {
    const [p0, p1, p2, p3] = [ext[s - 1], ext[s], ext[s + 1], ext[s + 2]];
    const d = (a, b) => Math.max(Math.hypot(b[0] - a[0], b[1] - a[1]) ** 0.5, 1e-3);
    const t0 = 0;
    const t1 = t0 + d(p0, p1);
    const t2 = t1 + d(p1, p2);
    const t3 = t2 + d(p2, p3);
    const lerp = (a, b, ta, tb, t) => [0, 1].map((k) => ((tb - t) / (tb - ta)) * a[k] + ((t - ta) / (tb - ta)) * b[k]);
    for (let i = 0; i < 120; i += 1) {
      const t = t1 + ((t2 - t1) * i) / 120;
      const a1 = lerp(p0, p1, t0, t1, t);
      const a2 = lerp(p1, p2, t1, t2, t);
      const a3 = lerp(p2, p3, t2, t3, t);
      const b1 = lerp(a1, a2, t0, t2, t);
      const b2 = lerp(a2, a3, t1, t3, t);
      pts.push(lerp(b1, b2, t1, t2, t));
    }
  }
  pts.push(P.at(-1));
  return stepsAlong(pts, opts);
}

export function FeetSteps({ steps }) {
  return steps.map((s, k) => (
    <g key={k} className="rv__step" style={{ animationDelay: `${(k * 0.3).toFixed(1)}s` }} transform={`translate(${s.x} ${s.y}) rotate(${s.rot})`}>
      <ellipse cx="0" cy="-6" rx="6" ry="9" />
      <ellipse cx="0" cy="10" rx="4.5" ry="5" />
    </g>
  ));
}
