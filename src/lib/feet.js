// Ślady stóp wzdłuż krzywej Béziera (4 punkty kontrolne), na przemian lewa i prawa stopa.
// n – liczba śladów albo step – odstęp w px (liczba wychodzi z długości krzywej).
export function feetSteps(P, { n, step }) {
  const bz = (t) => {
    const u = 1 - t;
    return [0, 1].map((k) => u ** 3 * P[0][k] + 3 * u * u * t * P[1][k] + 3 * u * t * t * P[2][k] + t ** 3 * P[3][k]);
  };
  const pts = Array.from({ length: 401 }, (_, i) => bz(i / 400));
  const len = [0];
  for (let i = 1; i < pts.length; i += 1) len.push(len[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
  const total = len[len.length - 1];
  const count = n ?? Math.max(3, Math.round(total / step) + 1);

  const out = [];
  for (let k = 0; k < count; k += 1) {
    const target = (total * k) / (count - 1);
    let i = len.findIndex((v) => v >= target);
    if (i < 0) i = len.length - 1;
    const a = pts[Math.max(i - 1, 0)];
    const b = pts[Math.min(i + 1, 400)];
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

export function FeetSteps({ steps }) {
  return steps.map((s, k) => (
    <g key={k} className="rv__step" style={{ animationDelay: `${(k * 0.3).toFixed(1)}s` }} transform={`translate(${s.x} ${s.y}) rotate(${s.rot})`}>
      <ellipse cx="0" cy="-6" rx="6" ry="9" />
      <ellipse cx="0" cy="10" rx="4.5" ry="5" />
    </g>
  ));
}
