// Przygotowanie zdjęć do eksportu statycznego (uruchamiane przed `next dev` i `next build`).
//
// Z każdego zdjęcia w src/assets/img (poza teksturami używanymi w CSS) robi kilka szerokości
// w AVIF i WebP → public/_img/<nazwa>-<szerokość>.<format>, a listę gotowych rozmiarów zapisuje
// w src/data/images.json. Komponent <Picture> buduje z tego <picture> z srcset.
// Zdjęcia, których treść się nie zmieniła (skrót SHA-1 w public/_img/.zrodla.json) i których wszystkie
// warianty już są, są pomijane – kolejne uruchomienia trwają chwilę (także w GitHub Actions z cache).

import { readdir, readFile, mkdir, writeFile, access } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve(import.meta.dirname, '..');
const SRC = path.join(ROOT, 'src/assets/img');
const OUT = path.join(ROOT, 'public/_img');
const MANIFEST = path.join(ROOT, 'src/data/images.json');
const HASHES = path.join(OUT, '.zrodla.json');

// szerokości wariantów (większych niż oryginał nie robimy – oryginał dochodzi jako ostatni)
const WIDTHS = [320, 480, 640, 800, 1200, 1600, 2000, 2560];
// tekstury i maski używane w CSS – zostają tak, jak są
const SKIP_DIRS = ['chmury'];
const EXT = /\.(webp|jpe?g)$/i;

// małe warianty (telefony, gęste ekrany – mniej widać artefakty) mocniej skompresowane, duże (desktop) łagodniej
const FORMATS = {
  avif: (img, w) => img.avif({ quality: w <= 800 ? 44 : 52, effort: 4 }),
  webp: (img, w) => img.webp({ quality: w <= 800 ? 72 : 78, effort: 4 }),
};
// zmiana szerokości lub ustawień kompresji = wszystkie zdjęcia robione od nowa
const SETTINGS = JSON.stringify({ WIDTHS, FORMATS: Object.values(FORMATS).map(String) });

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!SKIP_DIRS.includes(entry.name)) out.push(...(await walk(full)));
    } else if (EXT.test(entry.name)) {
      out.push(full);
    }
  }
  return out;
}

const exists = (file) => access(file).then(() => true, () => false);
const sha1 = (buf) => createHash('sha1').update(buf).digest('hex');

async function main() {
  const t0 = Date.now();
  await mkdir(OUT, { recursive: true });
  const files = await walk(SRC);
  const manifest = {};
  const old = JSON.parse(await readFile(HASHES, 'utf8').catch(() => '{}'));
  const hashes = {};
  let made = 0;

  for (const file of files.sort()) {
    // klucz = sama nazwa pliku (tak <Picture> rozpoznaje zdjęcie po adresie z importu)
    const name = path.basename(file).replace(EXT, '');
    if (manifest[name]) throw new Error(`Dwa zdjęcia o tej samej nazwie: ${name}`);

    const buf = await readFile(file);
    const meta = await sharp(buf).metadata();
    const widths = [...WIDTHS.filter((w) => w < meta.width), meta.width];
    hashes[name] = sha1(Buffer.concat([buf, Buffer.from(SETTINGS)]));
    const same = old[name] === hashes[name];

    for (const w of widths) {
      for (const [fmt, encode] of Object.entries(FORMATS)) {
        const target = path.join(OUT, `${name}-${w}.${fmt}`);
        if (same && (await exists(target))) continue;
        await encode(sharp(buf).resize({ width: w }), w).toFile(target);
        made += 1;
      }
    }
    manifest[name] = { w: meta.width, h: meta.height, widths };
  }

  await writeFile(MANIFEST, `${JSON.stringify(manifest, null, 1)}\n`);
  await writeFile(HASHES, `${JSON.stringify(hashes, null, 1)}\n`);
  const s = ((Date.now() - t0) / 1000).toFixed(1);
  console.log(`[images] ${files.length} zdjęć, nowych plików: ${made} (${s} s)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
