// Wisząca latarnia (Katowice). Stoi obok nagłówka sekcji; zapala się, gdy wpadnie do niej
// świetlik (LampsController). `short` – krótki łańcuch (co druga latarnia),
// długi łańcuch sięga do górnej krawędzi sekcji i łagodnie znika ku górze.
const IRON = '#0B0E1A';

export default function Lamp({ id, short = false, center = false }) {
  const grad = `lamp-glass-${id}`;

  return (
    <div className={`hang${center ? ' hang--center' : ' hang--side'}${short ? ' hang--short' : ''}`} aria-hidden="true" data-lamp="">
      <div className="hang__pool" />
      <div className="hang__swing">
        <div className="hang__halo" />
        <div className="hang__chain" />
        <svg className="hang__lamp" viewBox="0 0 120 170">
          <defs>
            <linearGradient id={grad} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#FFF4D6" />
              <stop offset=".55" stopColor="#FFD58A" />
              <stop offset="1" stopColor="#EE9F45" />
            </linearGradient>
          </defs>
          <g stroke="var(--accent)" fill="none">
            <circle cx="60" cy="6" r="5.5" strokeWidth="2" />
            <path d="M60 12v6M52 22c3-4 13-4 16 0" strokeWidth="1.6" />
            <path d="M36 34 60 16 84 34Z" fill={IRON} strokeWidth="1.6" />
            <path d="M30 34c6 3 54 3 60 0" strokeWidth="1.4" />
            <rect x="32" y="34" width="56" height="7" rx="2" fill={IRON} strokeWidth="1.4" />
          </g>
          <path className="hang__glass" d="M36 41h48l-6 74H42Z" fill={`url(#${grad})`} />
          <path className="hang__flame" d="M60 64c-6 9-6 17 0 24 6-7 6-15 0-24Z" fill="#FFFBEF" />
          <g stroke="var(--accent)" fill="none">
            <path d="M36 41h48l-6 74H42Z" strokeWidth="1.6" />
            <path d="M60 41v74M38.6 76h42.8" strokeWidth="1.1" opacity=".75" />
            <path d="M36 50c-8 2-10 10-6 14M84 50c8 2 10 10 6 14" strokeWidth="1.3" />
            <rect x="40" y="115" width="40" height="7" rx="2" fill={IRON} strokeWidth="1.4" />
            <path d="M48 122h24l-12 20Z" fill={IRON} strokeWidth="1.4" />
          </g>
          <circle cx="60" cy="148" r="3.2" fill="var(--accent)" />
        </svg>
      </div>
    </div>
  );
}
