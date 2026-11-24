import Image from 'next/image';

export default function Hero({ city }) {
  const { hero, h1, lead, hours, address, phone } = city;

  return (
    <section className="hero" data-hero={city.slug}>
      {/* view-transition-name łączy to zdjęcie ze zdjęciem w lustrze na ekranie wyboru
          (animacja przejścia – patrz README) */}
      <Image
        className="hero__img"
        src={hero.src}
        alt={hero.alt}
        fill
        priority
        sizes="100vw"
        style={{ objectPosition: hero.position, viewTransitionName: `hero-${city.slug}` }}
      />
      <div className="hero__shade" />
      <div className="wrap hero__content">
        <h1>
          {h1.before}
          <em>{h1.em}</em>
        </h1>
        <p className="hero__lead">{lead}</p>
        <div className="hero__actions">
          <a className="btn btn--solid" href="#rezerwacja">
            Zarezerwuj stolik
          </a>
          <a className="btn" href="#menu">
            Zobacz menu
          </a>
        </div>
        <ul className="hero__facts">
          <li>{hours}</li>
          <li>{address}</li>
          <li>{phone}</li>
        </ul>
      </div>
    </section>
  );
}
