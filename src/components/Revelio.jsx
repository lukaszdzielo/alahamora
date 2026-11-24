import koperta from '@/assets/svg/revelio/koperta.svg';
import kapelusz from '@/assets/svg/revelio/kapelusz.svg';
import kociol from '@/assets/svg/revelio/kociol.svg';
import ksiega2 from '@/assets/svg/revelio/ksiega2.svg';
import sowa from '@/assets/svg/revelio/sowa.svg';
import { feetSteps, FeetSteps } from '@/lib/feet';
import FeetFluid from './FeetFluid';

// Rysunki Łukasza (SVG, jeden kolor). Wyświetlamy je jako maskę CSS – kolor i poświata z motywu.
const DRAWINGS = { koperta, kapelusz, kociol, ksiega2, sowa };

// Ślady stóp o stałym kształcie (współrzędne w px).
function Feet({ points, n, w, h }) {
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width={w} height={h} fill="currentColor" style={{ overflow: 'visible' }}>
      <FeetSteps steps={feetSteps(points, { n })} />
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
  const cls = `rv${kind}${item.hide === 'mobile' ? ' rv--desktop' : ''}${item.hide === 'desktop' ? ' rv--mobile' : ''}${mobile.left !== undefined || mobile.right !== undefined || mobile.top !== undefined || mobile.bottom !== undefined ? ' rv--mpos' : ''} ${item.cls ? ` ${item.cls}` : ''} ${className}`;

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
  } else if (item.feet && item.fluid) {
    inner = <FeetFluid points={item.feet} step={item.step} h={item.h} />;
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
