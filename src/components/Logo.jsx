// Logo jako maska CSS: kształt z /svg/logo.svg, kolor z `color` (currentColor).
// Dzięki temu jedno SVG działa w złocie, srebrze i bieli.
export default function Logo({ sub, className = '' }) {
  return (
    <span className={`logo ${className}`}>
      <span className="logo__mark" role="img" aria-label="Alahamora" />
      {sub && <span className="logo__sub">{sub}</span>}
    </span>
  );
}
