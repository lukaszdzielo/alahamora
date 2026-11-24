import Image from 'next/image';
import Icon from './Icon';
import { RevealItem } from './Revelio';
import ScrollLink from './ScrollLink';

// Iskry unoszące się w prawej części hero: [left %, opóźnienie s, czas s, rozmiar px]
const SPARKS = [
  [52, 0, 9, 4], [58, 2.5, 11, 3], [64, 5, 8, 5], [70, 1.2, 10, 3], [76, 6.5, 12, 4],
  [82, 3.8, 9, 3], [88, 7.5, 10, 5], [94, 4.6, 13, 3], [60, 8.2, 9, 3], [72, 9.4, 11, 4],
];

export default function Hero({ city }) {
  const { hero, h1, lead, hours, addressShort, phone } = city;

  return (
    <section className="hero" data-hero={city.slug}>
      <div className="hero__media">
        <Image
          className="hero__img"
          src={hero.src}
          alt={hero.alt}
          fill
          priority
          sizes="100vw"
          style={{ objectPosition: hero.position, transformOrigin: hero.position }}
        />
      </div>
      <div className="hero__shade" />
      {SPARKS.map(([left, delay, duration, size], i) => (
        <span
          key={i}
          className="spark"
          aria-hidden="true"
          style={{ left: `${left}%`, animationDelay: `${delay}s`, animationDuration: `${duration}s`, width: size, height: size }}
        />
      ))}

      <div className="wrap hero__content">
        {/* nagłówek w ramce – koperta Revelio (Gliwice) przypięta do niego, żeby na każdej
            szerokości stała obok / nad nagłówkiem, a nie na tekście */}
        <div className="hero__title">
          {city.revelio?.heroTitle && <RevealItem item={city.revelio.heroTitle} className="rv--koperta" />}
          <h1>
            {h1.before}
            <em>{h1.em}</em>
          </h1>
        </div>
        <p className="hero__lead">{lead}</p>
        <div className="hero__actions">
          {/* rezerwacje jeszcze nie działają – przycisk nieaktywny */}
          <a className="btn btn--solid btn--shine" aria-disabled="true" title="Wkrótce">
            <Icon name="cal" size={17} /> Zarezerwuj stolik
          </a>
          <ScrollLink className="btn" href="#menu">
            Zobacz menu
          </ScrollLink>
        </div>
        <ul className="hero__facts">
          <li><Icon name="clock" size={17} />{hours}</li>
          <li><Icon name="pin" size={17} />{addressShort}</li>
          <li><Icon name="phone" size={17} /><a href={`tel:${phone.replace(/\s/g, '')}`}>{phone}</a></li>
        </ul>
      </div>
    </section>
  );
}
