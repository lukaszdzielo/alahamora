// Ceglana ściana jako wzór SVG. Każda cegła dostaje losowy odcień (trochę jaśniejszy
// albo ciemniejszy), ale losowanie ma stałe ziarno (seed) – dzięki temu HTML z builda
// jest zawsze taki sam (ważne przy renderowaniu po stronie serwera).

function mulberry32(seed) {
  return function random() {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const TILE_W = 480;
const ROWS = 6;
const ROW_H = 30;
const BRICK_W = 92;
const BRICK_H = 26;
const STEP = BRICK_W + 4;

function buildBricks(seed) {
  const random = mulberry32(seed);
  const bricks = [];
  for (let row = 0; row < ROWS; row++) {
    const y = 2 + row * ROW_H;
    const offset = row % 2 ? -BRICK_W / 2 : 2;
    for (let col = 0; col < 6; col++) {
      const x = offset + col * STEP;
      const r = random();
      // połowa cegieł lekko jaśniejsza, połowa ciemniejsza
      const fill = r < 0.5
        ? `rgba(255,255,255,${(0.012 + random() * 0.034).toFixed(3)})`
        : `rgba(0,0,0,${(0.04 + random() * 0.14).toFixed(3)})`;
      bricks.push({ x, y, fill });
    }
  }
  return bricks;
}

export default function Bricks({ seed = 7 }) {
  const bricks = buildBricks(seed);

  return (
    <svg className="bricks" aria-hidden="true" width="100%" height="100%">
      <defs>
        <pattern id="brick-wall" width={TILE_W} height={ROWS * ROW_H} patternUnits="userSpaceOnUse">
          <rect width={TILE_W} height={ROWS * ROW_H} fill="rgba(0,0,0,.28)" />
          {bricks.map(({ x, y, fill }, i) => (
            <g key={i}>
              <rect x={x} y={y} width={BRICK_W} height={BRICK_H} rx="2" fill={fill} />
              <path d={`M${x + 2} ${y + 1.5}H${x + BRICK_W - 2}`} stroke="rgba(255,255,255,.05)" />
            </g>
          ))}
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#brick-wall)" />
    </svg>
  );
}
