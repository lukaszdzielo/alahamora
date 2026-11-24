import Image from 'next/image';
import Icon from './Icon';
import GalleryFx from './GalleryFx';
import SectionHead from './SectionHead';
import Tiles from './Tiles';

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

// Style ram: metal, kształt, kolor filetu (wewnętrznej listwy), ornamenty w rogach, kolor tabliczki
const FRAMES = {
  'gold': { metal: 'gold', plate: 'gold' },
  'gold-orn': { metal: 'gold', orn: true, plate: 'gold' },
  'silver': { metal: 'silver', plate: 'silver' },
  'silver-orn': { metal: 'silver', orn: true, plate: 'silver' },
  'black': { metal: 'black', fillet: 'gold', plate: 'gold' },
  'black-silver': { metal: 'black', fillet: 'silver', plate: 'silver' },
  'black-orn': { metal: 'black', fillet: 'silver', orn: true, plate: 'silver' },
  'black-orn-gold': { metal: 'black', fillet: 'gold', orn: true, plate: 'gold' },
  'wood': { metal: 'wood', fillet: 'gold', plate: 'gold' },
  'wood-orn': { metal: 'wood', fillet: 'gold', orn: true, plate: 'gold' },
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

function Corners() {
  const one = (
    <svg viewBox="0 0 40 40" width="38" height="38" fill="currentColor">
      <path d="M3 3h18c-7 1-10 4-11 11C9 7 6 4 3 3Z" />
      <path d="M3 3v18c1-7 4-10 11-11C7 9 4 6 3 3Z" />
      <circle cx="14" cy="14" r="3.2" />
      <path d="M17 6c5 0 9 2 11 6-3-2-7-3-11-2ZM6 17c0 5 2 9 6 11-2-3-3-7-2-11Z" opacity=".8" />
    </svg>
  );
  return (
    <>
      {['tl', 'tr', 'bl', 'br'].map((c) => (
        <span key={c} className={`gframe__corner gframe__corner--${c}`} aria-hidden="true">
          {one}
        </span>
      ))}
    </>
  );
}

export default function Gallery({ gallery, lamps }) {
  // brak adresu galerii = przycisk i ramka „Cała galeria” nieaktywne
  const link = gallery.url
    ? { href: gallery.url, target: '_blank', rel: 'noopener' }
    : { 'aria-disabled': 'true', title: 'Wkrótce' };

  return (
    <section id="galeria" className="gallery">
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
                      <Image
                        className={item.fx?.hue ? 'gfx-hue' : undefined}
                        src={item.img}
                        alt={item.alt || item.caption || ''}
                        fill
                        sizes="(max-width: 700px) 50vw, 400px"
                      />
                      <GalleryFx fx={item.fx} ratio={item.img.width / item.img.height} />
                    </div>
                  </div>
                  {frame.orn && <Corners />}
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
              <Corners />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
