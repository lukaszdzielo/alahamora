// Ściana z kafli (galeria) – jak na płótnie: podłużne płytki 196×55 ułożone „na cegłę”,
// z jasną krawędzią u góry i cieniem u dołu. Dodatkowo, jak cegły na ekranie wyboru,
// każda płytka ma trochę inny odcień (losowanie ze stałym ziarnem – ten sam HTML przy każdym buildzie).

function mulberry32(seed) {
  return function random() {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const TILE_W = 196;
const TILE_H = 55;
const COLS = 4; // kafle w rzędzie wzoru
const ROWS = 6; // rzędy wzoru
const W = TILE_W * COLS;
const H = TILE_H * ROWS;

function buildTiles(seed) {
  const random = mulberry32(seed);
  const tiles = [];
  for (let row = 0; row < ROWS; row++) {
    const offset = row % 2 ? -TILE_W / 2 : 0;
    for (let col = 0; col <= COLS; col++) {
      const r = random();
      const fill = r < 0.5
        ? `rgba(255,255,255,${(0.008 + random() * 0.03).toFixed(3)})`
        : `rgba(0,0,0,${(0.03 + random() * 0.12).toFixed(3)})`;
      tiles.push({ x: offset + col * TILE_W, y: row * TILE_H, fill });
    }
  }
  return tiles;
}

export default function Tiles({ seed = 21 }) {
  const tiles = buildTiles(seed);

  return (
    <svg className="gallery__tiles" aria-hidden="true" width="100%" height="100%">
      <defs>
        <pattern id="gallery-tiles" width={W} height={H} patternUnits="userSpaceOnUse">
          {tiles.map(({ x, y, fill }, i) => (
            <g key={i}>
              <rect x={x + 1} y={y + 1} width={TILE_W - 2} height={TILE_H - 2} rx="1.5" fill={fill} />
              {/* fuga */}
              <rect x={x + 0.5} y={y + 0.5} width={TILE_W - 1} height={TILE_H - 1} rx="1.5" fill="none" stroke="rgb(var(--line-rgb) / .16)" strokeWidth="1.2" />
              {/* połysk u góry i cień u dołu płytki */}
              <path d={`M${x + 3} ${y + 3.5}H${x + TILE_W - 3}`} stroke="rgba(255,255,255,.035)" />
              <path d={`M${x + 3} ${y + TILE_H - 2.5}H${x + TILE_W - 3}`} stroke="rgba(0,0,0,.22)" strokeWidth="1.5" />
            </g>
          ))}
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#gallery-tiles)" />
    </svg>
  );
}
