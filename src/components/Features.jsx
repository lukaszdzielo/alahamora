'use client';

import { useEffect, useRef, useState } from 'react';
import Icon from './Icon';
import Ornament from './Ornament';
import MirrorCard from './MirrorCard';
import Lamp from './Lamp';
import Revelio, { RevealItem } from './Revelio';

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

export default function Features({ features, lamp = false, rv }) {
  const trackRef = useRef(null);
  // czy tor jest na początku / na końcu – wtedy strzałka w tę stronę jest nieaktywna
  const [edge, setEdge] = useState({ start: true, end: false });

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;
    let frame = 0;
    const measure = () => {
      frame = 0;
      const max = track.scrollWidth - track.clientWidth;
      const start = track.scrollLeft <= 2;
      const end = track.scrollLeft >= max - 2;
      setEdge((prev) => (prev.start === start && prev.end === end ? prev : { start, end }));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    measure();
    track.addEventListener('scroll', schedule, { passive: true });
    const ro = new ResizeObserver(schedule);
    ro.observe(track);
    return () => {
      track.removeEventListener('scroll', schedule);
      ro.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  const scroll = (direction) => {
    const track = trackRef.current;
    if (!track) return;
    if ((direction < 0 && edge.start) || (direction > 0 && edge.end)) return;
    const card = track.querySelector('.mirror');
    const step = card ? card.getBoundingClientRect().width + 36 : 360;
    track.scrollBy({ left: direction * step, behavior: 'smooth' });
  };

  return (
    <section id={features.id} className="features">
      <Revelio items={rv?.features} />
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
          <h2>
            <span className="rv-anchor">
              {features.title}
              {rv?.featuresTitle && <RevealItem item={rv.featuresTitle} className="rv--hat" />}
              {rv?.featuresTitleNote && <RevealItem item={rv.featuresTitleNote} className="rv--psst" />}
            </span>
          </h2>
          <p>{features.lead}</p>
        </div>
        {/* aria-disabled zamiast disabled: przycisk dalej reaguje na ruch myszy (różdżka nie „zamarza”),
            a kliknięcie na końcu toru nic nie robi */}
        <div className="features__arrows">
          <button type="button" className="round-btn round-btn--prev" aria-label="Poprzednie" aria-disabled={edge.start} onClick={() => scroll(-1)}>
            <Icon name="arrowLeft" size={20} stroke={1.8} />
          </button>
          <button type="button" className="round-btn round-btn--next" aria-label="Następne" aria-disabled={edge.end} onClick={() => scroll(1)}>
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
