'use client';

import { useRef } from 'react';
import Icon from './Icon';
import Ornament from './Ornament';
import MirrorCard from './MirrorCard';

// „Co czeka w Gildii” / „Co czeka za drzwiami” – pozioma karuzela zwierciadeł.
// Przewijanie: natywny scroll z scroll-snap (działa też palcem i touchpadem),
// strzałki tylko przesuwają tor o szerokość jednej karty.
export default function Features({ features }) {
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
      <div className="wrap features__head">
        <div className="section-head">
          <Ornament />
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
        {features.items.map((item) => (
          <MirrorCard key={item.title} item={item} />
        ))}
      </div>
    </section>
  );
}
