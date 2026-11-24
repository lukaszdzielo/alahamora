import koperta from '@/assets/svg/revelio/koperta.svg';
import kapelusz from '@/assets/svg/revelio/kapelusz.svg';
import kociol from '@/assets/svg/revelio/kociol.svg';
import ksiega2 from '@/assets/svg/revelio/ksiega2.svg';
import sowa from '@/assets/svg/revelio/sowa.svg';

// Rysunki Łukasza (SVG, jeden kolor). Wyświetlamy je jako maskę CSS – kolor i poświata z motywu.
const DRAWINGS = { koperta, kapelusz, kociol, ksiega2, sowa };

// Ślady stóp wzdłuż krzywej Béziera (4 punkty kontrolne), na przemian lewa i prawa stopa.
function Feet({ points: P, n, w, h }) {
  const bz = (t) => {
    const u = 1 - t;
    return [0, 1].map((k) => u ** 3 * P[0][k] + 3 * u * u * t * P[1][k] + 3 * u * t * t * P[2][k] + t ** 3 * P[3][k]);
  };
  const pts = Array.from({ length: 401 }, (_, i) => bz(i / 400));
  const len = [0];
  for (let i = 1; i < pts.length; i += 1) len.push(len[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
  const total = len[len.length - 1];

  const steps = [];
  for (let k = 0; k < n; k += 1) {
    const target = (total * k) / (n - 1);
    let i = len.findIndex((v) => v >= target);
    if (i < 0) i = len.length - 1;
    const a = pts[Math.max(i - 1, 0)];
    const b = pts[Math.min(i + 1, 400)];
    const ang = Math.atan2(b[1] - a[1], b[0] - a[0]);
    const side = k % 2 ? 9 : -9;
    const x = pts[i][0] - Math.sin(ang) * side;
    const y = pts[i][1] + Math.cos(ang) * side;
    steps.push(
      <g key={k} className="rv__step" style={{ animationDelay: `${(k * 0.3).toFixed(1)}s` }} transform={`translate(${x.toFixed(0)} ${y.toFixed(0)}) rotate(${((ang * 180) / Math.PI + 90).toFixed(0)})`}>
        <ellipse cx="0" cy="-6" rx="6" ry="9" />
        <ellipse cx="0" cy="10" rx="4.5" ry="5" />
      </g>,
    );
  }
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width={w} height={h} fill="currentColor" style={{ overflow: 'visible' }}>
      {steps}
    </svg>
  );
}

// Jeden element Revelio. Pozycja: style (desktop) + zmienne --m-* dla telefonu.
export function RevealItem({ item, className = '', style }) {
  const pos = { ...item.pos, ...style };
  const mobile = item.mobile ?? {};
  const vars = {};
  ['left', 'right', 'top', 'bottom'].forEach((k) => {
    if (mobile[k] !== undefined) vars[`--m-${k}`] = mobile[k];
  });
  const kind = item.ink ? ' rv--ink' : ' rv--art'; // tekst / rysunek – inna widoczność (CSS)
  const cls = `rv${kind}${item.hide === 'mobile' ? ' rv--desktop' : ''}${mobile.left !== undefined || mobile.right !== undefined || mobile.top !== undefined || mobile.bottom !== undefined ? ' rv--mpos' : ''} ${className}`;

  let inner = null;
  if (item.draw) {
    const img = DRAWINGS[item.draw];
    inner = (
      <span className="rv__glow">
      <span
        className="rv__draw"
        style={{
          '--w': `${item.w}px`,
          '--mw': `${mobile.w ?? item.mobileW ?? item.w}px`,
          aspectRatio: `${img.width} / ${img.height}`,
          maskImage: `url(${img.src})`,
          rotate: item.rotate ? `${item.rotate}deg` : undefined,
        }}
      />
      </span>
    );
  } else if (item.ink) {
    inner = <span className="rv__ink">{item.ink}</span>;
  } else if (item.feet) {
    inner = <Feet points={item.feet} n={item.n} w={item.w} h={item.h} />;
  }

  return (
    <div className={cls.trim()} style={{ ...pos, ...vars }} aria-hidden="true">
      {inner}
    </div>
  );
}

// Warstwa z elementami Revelio dla jednej sekcji (pas o szerokości treści, wyśrodkowany).
export default function Revelio({ items }) {
  if (!items?.length) return null;
  return (
    <div className="rv-layer" aria-hidden="true">
      <div className="rv-box">
        {items.map((item, i) => (
          <RevealItem key={i} item={item} />
        ))}
      </div>
    </div>
  );
}
