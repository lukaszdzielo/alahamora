// Lakowa pieczęć ze świecącą dziurką od klucza – znacznik lokalu na mapie.
//
// Warianty kolorów (cities.js → contact.seal):
//   'red'   – czerwony lak (obecnie w obu miastach)
//   'green' – zielony lak ze srebrnym obrzeżem (kolory Gliwic)
//   'navy'  – granatowy lak ze złotym obrzeżem (kolory Katowic)
// (Złoty lak odpadł – świecąca dziurka zlewała się z nim.)

const PALETTES = {
  red: { hi: '#cf3b3e', mid: '#951d21', lo: '#5a0c10', in1: '#861519', in2: '#ab2a2e', ring: '#550c10', ringHi: '#d0585a', dark: '#3f0609', light: '#e07476' },
  green: { hi: '#3f8a6a', mid: '#1f5a43', lo: '#0d2e22', in1: '#1a4d39', in2: '#2a6a50', ring: '#0b2a1e', ringHi: '#e4e9ed', dark: '#06190f', light: '#a4dcc0' },
  navy: { hi: '#4a5f9e', mid: '#26336a', lo: '#0d1430', in1: '#1d2856', in2: '#2e3d78', ring: '#0b1129', ringHi: '#e7c982', dark: '#070b1c', light: '#8fa2dc' },
};

// nieregularny brzeg rozlanego laku (wygładzony, wygenerowany raz)
const BLOB =
  'M93.2 50.0C93.7 55.4 92.3 61.4 90.5 66.8C88.7 72.2 86.6 78.7 82.6 82.6C78.6 86.4 72.0 88.2 66.6 90.0C61.1 91.8 55.6 93.4 50.0 93.5C44.4 93.7 38.1 93.0 33.2 90.7C28.2 88.3 24.5 83.4 20.6 79.4C16.7 75.4 12.2 71.6 9.7 66.7C7.3 61.8 6.0 55.7 5.7 50.0C5.5 44.3 5.6 37.5 8.2 32.7C10.7 27.8 16.7 24.6 21.0 21.0C25.2 17.3 29.0 12.9 33.8 10.9C38.6 8.9 44.4 9.4 50.0 9.0C55.6 8.5 62.1 6.5 67.4 8.1C72.6 9.7 78.2 14.0 81.6 18.4C85.0 22.8 85.7 29.1 87.6 34.4C89.6 39.7 92.7 44.6 93.2 50.0Z';
const KEYHOLE = 'M50 33 a9.5 9.5 0 0 1 5.2 17.4 L58.5 69 H41.5 L44.8 50.4 A9.5 9.5 0 0 1 50 33Z';

export default function Seal({ variant = 'red', className = '' }) {
  const p = PALETTES[variant] ?? PALETTES.red;
  const id = `seal-${variant}`; // na stronie jest jedna mapa, więc id wystarczy unikalne per wariant
  return (
    <svg className={`seal ${className}`} viewBox="0 0 100 100" aria-hidden="true">
      <defs>
        <radialGradient id={`${id}-wax`} cx="38%" cy="32%" r="70%">
          <stop offset="0" stopColor={p.hi} />
          <stop offset=".55" stopColor={p.mid} />
          <stop offset="1" stopColor={p.lo} />
        </radialGradient>
        <radialGradient id={`${id}-in`} cx="60%" cy="65%" r="60%">
          <stop offset="0" stopColor={p.in1} />
          <stop offset="1" stopColor={p.in2} />
        </radialGradient>
        <radialGradient id={`${id}-light`} cx="50%" cy="45%" r="60%">
          <stop offset="0" stopColor="#fffbe8" />
          <stop offset=".45" stopColor="#ffe7a0" />
          <stop offset="1" stopColor="#f3a93a" />
        </radialGradient>
        <filter id={`${id}-blur`} x="-1" y="-1" width="3" height="3">
          <feGaussianBlur stdDeviation="4" />
        </filter>
      </defs>

      {/* rozlany lak + odciśnięty krąg pieczętki */}
      <path d={BLOB} fill={`url(#${id}-wax)`} />
      <circle cx="50" cy="50" r="33" fill={`url(#${id}-in)`} stroke={p.ring} strokeWidth="1.8" />
      <circle cx="50" cy="50" r="29.5" fill="none" stroke={p.ringHi} strokeWidth=".9" opacity=".55" />

      {/* dziurka od klucza, przez którą świeci światło */}
      <path className="seal__glow" d={KEYHOLE} fill="#ffd98a" filter={`url(#${id}-blur)`} />
      <path d={KEYHOLE} fill={p.light} opacity=".6" transform="translate(.7 .9)" />
      <path d={KEYHOLE} fill={`url(#${id}-light)`} />
      <path d={KEYHOLE} fill="none" stroke={p.dark} strokeWidth="1.3" />

      {/* połysk laku */}
      <ellipse cx="34" cy="26" rx="15" ry="6" fill="#fff" opacity=".16" transform="rotate(-25 34 26)" />
    </svg>
  );
}
