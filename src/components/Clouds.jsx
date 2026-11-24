// Chmury na styku sekcji: dwie warstwy szumu SVG (feTurbulence) przesuwają się powoli w lewo
// w nieskończonej pętli (każda warstwa to dwa takie same kafle obok siebie).
function CloudLayer({ id, seed, fx, fy, duration, opacity }) {
  const tile = (withDefs) => (
    <svg viewBox="0 0 1600 400" preserveAspectRatio="none">
      {withDefs && (
        <filter id={id} x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency={`${fx} ${fy}`} numOctaves="5" seed={seed} stitchTiles="stitch" />
          <feColorMatrix values="0 0 0 0 .9  0 0 0 0 .93  0 0 0 0 .98  0 0 0 2.1 -.95" />
        </filter>
      )}
      <rect width="1600" height="400" filter={`url(#${id})`} />
    </svg>
  );

  return (
    <div className="clouds__track" style={{ animationDuration: `${duration}s`, opacity }}>
      {tile(true)}
      {tile(false)}
    </div>
  );
}

export default function Clouds({ id = 'c' }) {
  return (
    <div className="clouds" aria-hidden="true">
      <CloudLayer id={`${id}-a`} seed={3} fx={0.0022} fy={0.008} duration={150} opacity={0.55} />
      <CloudLayer id={`${id}-b`} seed={11} fx={0.0036} fy={0.013} duration={85} opacity={0.42} />
    </div>
  );
}
