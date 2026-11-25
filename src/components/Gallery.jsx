import Picture from './Picture';
import Icon from './Icon';
import GalleryFx from './GalleryFx';
import SectionHead from './SectionHead';
import Tiles from './Tiles';
import Revelio from './Revelio';

// „Zajrzyj do środka / do Gildii” – ściana z kafli i obrazy w różnych ramach,
// rozmieszczone jak w salonie (siatka 12 kolumn × 10 rzędów).
// Każde miejsce: [kolumny, rzędy, wcięcie w komórce] – desktop (12 kolumn × 10 rzędów)
// oraz osobny, też nieregularny układ na telefon (6 kolumn × 25 rzędów).
const SLOTS = [
  ['1/5', '1/6', '0'],
  ['5/9', '1/4', '4px 18px 10px 0'],
  ['9/11', '1/5', '0 6px'],
  ['11/13', '1/4', '10px 6px'],
  ['5/7', '4/7', '14px 12px 6px 6px'],
  ['11/13', '4/8', '6px 0 0 8px'],
  ['9/11', '5/8', '10px 6px 4px'],
  ['1/3', '6/9', '8px 10px'],
  ['3/5', '6/9', '12px 4px 0 10px'],
  ['5/9', '7/11', '0 10px 0 0'],
  ['9/13', '8/11', '6px 0 0'],
  ['1/5', '9/11', '8px 26px 0 0'],
];

const SLOTS_MOBILE = [
  ['1/5', '1/7', '0'],
  ['5/7', '1/4', '4px 0 6px 4px'],
  ['5/7', '4/9', '6px 2px 0 6px'],
  ['1/3', '7/11', '10px 6px 4px 0'],
  ['3/5', '7/10', '12px 4px 4px 6px'],
  ['5/7', '9/14', '4px 0 0 4px'],
  ['1/3', '11/15', '8px 6px 0 0'],
  ['3/5', '13/18', '10px 4px 6px 4px'],
  ['5/7', '14/18', '6px 0 4px 8px'],
  ['1/3', '15/22', '10px 4px 0 0'],
  ['3/7', '18/22', '14px 0 0 6px'],
  ['2/6', '22/26', '12px 6px 0'],
];
const CTA_SLOT = ['7/9', '4/7'];
const CTA_SLOT_MOBILE = ['3/5', '10/13'];

const place = ([col, row, pad], [mcol, mrow, mpad]) => ({
  '--col': col,
  '--row': row,
  '--pad': pad,
  '--mcol': mcol,
  '--mrow': mrow,
  '--mpad': mpad,
});

// Style ram: metal, kształt, kolor filetu (wewnętrznej listwy), ornament w rogach (shell / gothic / filigree), kolor tabliczki
const FRAMES = {
  'gold': { metal: 'gold', plate: 'gold' },
  'gold-orn': { metal: 'gold', orn: 'shell', plate: 'gold' },
  'silver': { metal: 'silver', plate: 'silver' },
  'silver-orn': { metal: 'silver', orn: 'shell', plate: 'silver' },
  'black': { metal: 'black', fillet: 'gold', plate: 'gold' },
  'black-silver': { metal: 'black', fillet: 'silver', plate: 'silver' },
  'black-orn': { metal: 'black', fillet: 'silver', orn: 'filigree', plate: 'silver' },
  'black-orn-gold': { metal: 'black', fillet: 'gold', orn: 'filigree', plate: 'gold' },
  'wood': { metal: 'wood', fillet: 'gold', plate: 'gold' },
  'wood-orn': { metal: 'wood', fillet: 'gold', orn: 'gothic', plate: 'gold' },
  'bronze': { metal: 'bronze', plate: 'gold' },
  'pewter': { metal: 'pewter', plate: 'silver' },
  'arch-gold': { metal: 'gold', shape: 'arch', plate: 'gold' },
  'arch-silver': { metal: 'silver', shape: 'arch', plate: 'silver' },
  'gothic-gold': { metal: 'gold', shape: 'gothic' },
  'gothic-silver': { metal: 'silver', shape: 'gothic' },
  'gothic-black': { metal: 'black', fillet: 'gold', shape: 'gothic' },
  'oval-gold': { metal: 'gold', shape: 'oval' },
  'oval-silver': { metal: 'silver', shape: 'oval' },
  'oval-wood': { metal: 'wood', fillet: 'gold', shape: 'oval' },
};

function frameClass(name) {
  const f = FRAMES[name] ?? FRAMES.gold;
  return [
    'gframe',
    `gframe--${f.metal}`,
    f.shape && `gframe--${f.shape}`,
    f.fillet && `gframe--fillet-${f.fillet}`,
    f.orn && 'gframe--orn',
  ].filter(Boolean).join(' ');
}

// Ozdobniki narożników: B – rokokowa muszla, C – gotycki trójliść, D – filigran.
// Kolor (złoto / srebro) bierze się z metalu ramy albo z jej filetu.
const DARK = '#2a1f10';
const CORNER_ART = {
  shell: (
    <>
      <path d="M6 6 L38 14 C40 18 39 22 36 25 C38 28 36 33 32 33 C32 37 28 39 25 37 C22 40 17 40 14 38 Z" />
      <path d="M6 6 L38 14M6 6 L35 25M6 6 L31 33M6 6 L24 37M6 6 L14 38" stroke={DARK} strokeOpacity=".45" strokeWidth="1.3" fill="none" />
      <path d="M38 14c6-2 12 0 14 5-3-2-8-2-12 0" fill="none" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M14 38c-2 6 0 12 5 14-2-3-2-8 0-12" fill="none" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M3 3h16c-5 1-9 2-12 4C5 6 4 5 3 3ZM3 3v16c1-5 2-9 4-12C6 5 5 4 3 3Z" />
      <circle cx="8" cy="8" r="3.4" />
    </>
  ),
  gothic: (
    <>
      <path d="M4 4H54v3H7v47H4Z" />
      <circle cx="17" cy="17" r="13" />
      <g fill={DARK} fillOpacity=".55">
        <circle cx="17" cy="11.5" r="4.2" />
        <circle cx="11.5" cy="20" r="4.2" />
        <circle cx="22.5" cy="20" r="4.2" />
        <circle cx="17" cy="17" r="2.4" />
      </g>
      <circle cx="17" cy="17" r="13" fill="none" stroke={DARK} strokeOpacity=".4" strokeWidth="1" />
      <path d="M54 5.5l4-3v6Z M5.5 54l-3 4h6Z" />
      <path d="M34 7c2 3 2 6 0 8M7 34c3 2 6 2 8 0" fill="none" strokeWidth="2" strokeLinecap="round" />
    </>
  ),
  filigree: (
    <>
      <g fill="none" strokeWidth="1.8" strokeLinecap="round">
        <path d="M5 5H40c5 0 8 3 7 7-1 3-5 3-6 0" />
        <path d="M5 5V40c0 5 3 8 7 7 3-1 3-5 0-6" />
        <path d="M10 10H30c3 0 5 2 4 4M10 10V30c0 3 2 5 4 4" />
        <path d="M14 14c6 2 10 6 12 12" />
        <path d="M20 13c3-3 7-3 9 0M13 20c-3 3-3 7 0 9" />
      </g>
      <path d="M10 6.5 L13.5 10 10 13.5 6.5 10Z" />
      <circle cx="27" cy="27" r="2.2" />
    </>
  ),
};

// wspólne gradienty metalu dla wszystkich narożników sekcji
function CornerDefs() {
  const grad = (id, stops) => (
    <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
      {stops.map(([o, c]) => <stop key={o} offset={o} stopColor={c} />)}
    </linearGradient>
  );
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" focusable="false">
      <defs>
        {grad('gc-gold', [['0', '#FFF1C4'], ['.35', '#E7C982'], ['.7', '#A8833F'], ['1', '#6E5020']])}
        {grad('gc-silver', [['0', '#FFFFFF'], ['.35', '#DDE2E6'], ['.7', '#99A1A8'], ['1', '#596067']])}
      </defs>
    </svg>
  );
}

function Corners({ variant = 'shell', tone = 'gold' }) {
  const paint = `url(#gc-${tone})`;
  const one = (
    <svg viewBox="0 0 60 60" fill={paint} stroke={paint}>
      {CORNER_ART[variant] ?? CORNER_ART.shell}
    </svg>
  );
  return (
    <>
      {['tl', 'tr', 'bl', 'br'].map((c) => (
        <span key={c} className={`gframe__corner gframe__corner--${c} gframe__corner--${variant}`} aria-hidden="true">
          {one}
        </span>
      ))}
    </>
  );
}

// złoto albo srebro – według filetu, a gdy go nie ma, według metalu ramy
const cornerTone = (f) => ((f.fillet ?? f.metal) === 'silver' ? 'silver' : 'gold');

export default function Gallery({ gallery, lamps, rv }) {
  // brak adresu galerii = przycisk i ramka „Cała galeria” nieaktywne
  const link = gallery.url
    ? { href: gallery.url, target: '_blank', rel: 'noopener' }
    : { 'aria-disabled': 'true', title: 'Wkrótce' };

  return (
    <section id="galeria" className="gallery">
      <CornerDefs />
      <Revelio items={rv?.gallery} />
      <Tiles />
      <div className="gallery__fade" aria-hidden="true" />

      <div className="wrap gallery__inner">
        <div className="gallery__head">
          <SectionHead id="gallery" title={gallery.title} lead={gallery.lead} lamp={lamps ? 'side-short' : false} />
          <a className="btn" {...link}>
            Cała galeria
          </a>
        </div>

        <div className="salon">
          {gallery.items.map((item, i) => {

            const name = gallery.frames[i];
            const frame = FRAMES[name] ?? FRAMES.gold;
            // tabliczka tylko na ramach prostokątnych i łukowych
            const showCaption = item.caption && frame.plate;
            return (
              <figure key={i} className="gframe-cell" style={place(SLOTS[i], SLOTS_MOBILE[i])} data-appear="">
                <div className={frameClass(name)}>
                  <div className="gframe__metal">
                    <div className="gframe__picture">
                      <Picture
                        className={item.fx?.hue ? 'gfx-hue' : undefined}
                        src={item.img}
                        alt={item.alt || item.caption || ''}
                        fill
                        sizes="(max-width: 700px) 50vw, 400px"
                      />
                      <GalleryFx fx={item.fx} ratio={item.img.width / item.img.height} />
                    </div>
                  </div>
                  {frame.orn && <Corners variant={frame.orn} tone={cornerTone(frame)} />}
                  {/* tabliczka przymocowana do ramy – kołysze się razem z nią (podpis jest też w alt zdjęcia) */}
                  {showCaption && (
                    <span className={`gframe__plate gframe__plate--${frame.plate}`} aria-hidden="true">
                      {item.caption}
                    </span>
                  )}
                </div>
              </figure>
            );
          })}

          <a className="gframe-cell gframe-cta" {...link} style={place([...CTA_SLOT, '6px 4px'], [...CTA_SLOT_MOBILE, '4px 2px'])}>
            <span className="gframe gframe--gold gframe--orn">
              <span className="gframe__metal">
                <span className="gframe__picture gframe-cta__inner">
                  <span className="twinkle">
                    <Icon name="star" size={26} stroke={1.3} />
                  </span>
                  <strong>Cała galeria</strong>
                  <span className="gframe-cta__enter">
                    Wejdź <Icon name="arrow" size={13} stroke={2} />
                  </span>
                </span>
              </span>
              <Corners variant="shell" tone="gold" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
