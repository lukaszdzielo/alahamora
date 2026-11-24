import Icon from './Icon';
import SectionHead from './SectionHead';
import Revelio, { RevealItem } from './Revelio';

// „Urodziny, klasy i okazje” – oferty jako wiszące proporce (sztandary wycięte w szpic).
// Tło: ledwo widoczne gotyckie okna i unoszące się świece.
// Na razie proporce nie są linkami (brak podstron ofert) – tylko kołyszą się po najechaniu.

// gotyckie okna: [x, szerokość, wysokość] w układzie 1440×520
const WINDOWS = [[60, 120, 330], [300, 150, 400], [600, 170, 440], [900, 150, 400], [1180, 130, 350]];
// świece: [left %, top %, opóźnienie s, skala]
const CANDLES = [[66, 16, 1.2, 0.9], [74, 26, 3.4, 1.05], [82, 13, 0.4, 0.8], [90, 23, 5.1, 1.1], [96, 15, 2.2, 0.85], [58, 20, 4.4, 0.95], [3, 18, 1.8, 1], [4, 36, 5.6, 0.8], [52, 30, 2.9, 1.15]];
// wzory tkaniny – po kolei dla proporców
const PATTERNS = ['diamond', 'dots', 'stripes', 'chevron'];

function gothicWindow([x, w, h]) {
  const b = 520;
  return `M${x} ${b}V${b - h + w * 0.55} Q${x} ${b - h} ${x + w / 2} ${b - h - w * 0.35} Q${x + w} ${b - h} ${x + w} ${b - h + w * 0.55}V${b}Z M${x + w / 2} ${b - h - w * 0.2}V${b} M${x} ${b - h * 0.45}H${x + w}`;
}

export default function Offers({ offers, lamps, rv }) {
  return (
    <section id="oferta" className="offers">
      <Revelio items={rv?.offers} />
      <div className="offers__bg" aria-hidden="true">
        <svg className="offers__windows" viewBox="0 0 1440 520" preserveAspectRatio="xMidYMax slice">
          {WINDOWS.map((w, i) => (
            <path key={i} d={gothicWindow(w)} />
          ))}
        </svg>
      </div>
      <div className="offers__candles" aria-hidden="true">
        {CANDLES.map(([left, top, delay, scale], i) => (
          <span key={i} className="candle" style={{ left: `${left}%`, top: `${top}%`, animationDelay: `-${delay}s`, '--s': scale }}>
            <span className="candle__flame" style={{ animationDelay: `-${delay * 0.7}s` }} />
          </span>
        ))}
      </div>

      <div className="wrap offers__inner">
        <SectionHead id="offers" title={offers.title} lead={offers.lead} lamp={lamps ? 'side' : false} />
        <div className="banners">
          {offers.items.map((item, i) => (
            <article key={item.title} className="banner" data-appear="">
              <span className="banner__rod" aria-hidden="true" />
              <span className="banner__body">
                <span className={`banner__cloth banner__cloth--${PATTERNS[i % PATTERNS.length]}`} />
                <svg className="banner__outline" aria-hidden="true" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <polygon points="0,0 100,0 100,83 50,98.2 0,83" vectorEffect="non-scaling-stroke" />
                </svg>
                <span className="banner__content">
                  <span className="banner__icon"><Icon name={item.icon} size={34} stroke={1.4} /></span>
                  <h3>{item.title}</h3>
                  {item.price && (
                    <strong className="banner__price">
                      {item.price} <small>/ osoba</small>
                    </strong>
                  )}
                  <p>{item.text}</p>
                </span>
              </span>
              <svg className="banner__tassel" aria-hidden="true" viewBox="0 0 30 70">
                <path d="M15 0v18" stroke="var(--accent)" strokeWidth="2" />
                <circle cx="15" cy="22" r="5" fill="var(--accent)" />
                <path d="M9 26h12l3 30H6Z" fill="var(--accent)" />
                <path d="M9 32v22M12 32v24M15 32v24M18 32v24M21 32v22" stroke="rgba(0,0,0,.35)" strokeWidth="1" />
              </svg>
              {rv?.offersOwl && i === offers.items.length - 1 && <RevealItem item={rv.offersOwl} className="rv--owl rv--desktop" />}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
