'use client';

import { useRef } from 'react';
import Icon from './Icon';
import Ornament from './Ornament';
import MirrorCard from './MirrorCard';
import Lamp from './Lamp';

// „Co czeka w Gildii” / „Co czeka za drzwiami” – pozioma karuzela zwierciadeł.
// Przewijanie: natywny scroll z scroll-snap (działa też palcem i touchpadem),
// strzałki tylko przesuwają tor o szerokość jednej karty.
// [lewo %, opóźnienie s, czas s, rozmiar px]
const FLOOR_SPARKS = [
  [8, 1, 14, 3],
  [23, 6, 16, 2],
  [41, 3, 15, 3],
  [57, 9, 17, 2],
  [73, 4.5, 14, 3],
  [90, 11, 16, 2],
];

export default function Features({ features, lamp = false }) {
  const trackRef = useRef(null);

  const scroll = (direction) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector('.mirror');
    const step = card ? card.getBoundingClientRect().width + 36 : 360;
    track.scrollBy({ left: direction * step, behavior: 'smooth' });
  };

  return (
    <section id={features.id} className="features">
      {/* iskierki unoszące się od dołu sekcji */}
      {FLOOR_SPARKS.map(([left, delay, duration, size]) => (
        <span
          key={left}
          className="spark spark--soft"
          aria-hidden="true"
          style={{ left: `${left}%`, animationDelay: `${delay}s`, animationDuration: `${duration}s`, width: size, height: size }}
        />
      ))}
      <div className="wrap features__head">
        <div className={`section-head${lamp ? ' section-head--lamp' : ''}`}>
          {lamp ? <Lamp id="features" /> : <Ornament />}
          <h2>{features.title}</h2>
          <p>{features.lead}</p>
        </div>
        <div className="features__arrows">
          <button type="button" className="round-btn" aria-label="Poprzednie" onClick={() => scroll(-1)}>
            <Icon name="arrowLeft" size={20} stroke={1.8} />
          </button>
          <button type="button" className="round-btn round-btn--solid" aria-label="Następne" onClick={() => scroll(1)}>
            <Icon name="arrow" size={20} stroke={1.8} />
          </button>
        </div>
      </div>

      <div className="features__track" ref={trackRef}>
        {features.items.map((item, i) => {
          const frostNo = features.frost?.indexOf(i);
          return <MirrorCard key={item.title} item={item} frost={frostNo >= 0 ? frostNo + 1 : undefined} />;
        })}
      </div>
    </section>
  );
}
