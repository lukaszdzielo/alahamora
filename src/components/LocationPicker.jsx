import Image from 'next/image';
import Logo from './Logo';
import Bricks from './Bricks';
import DoorLink from './DoorLink';

// Ekran wyboru lokalizacji: tylko logo i ramy z lokalami.
// Szkło ramy (zdjęcie z hero) i zdjęcie w hero mają to samo view-transition-name,
// po kliknięciu „wchodzimy w obraz” i zdjęcie staje się hero (DoorLink).
export default function LocationPicker({ cities }) {
  return (
    <main className="picker">
      <Bricks />

      <h1 className="picker__logo">
        <Logo />
      </h1>

      <ul className="picker__doors" aria-label="Wybierz lokalizację">
        {cities.map((city) => (
          <li key={city.slug} data-city={city.theme}>
            <DoorLink slug={city.slug} className="door">
              <span className="door__frame">
                <span className="door__glass" style={{ viewTransitionName: `hero-${city.slug}` }}>
                  <Image
                    className="door__img"
                    src={city.hero.src}
                    alt={`${city.name} – wnętrze kawiarni`}
                    fill
                    priority
                    sizes="(max-width: 700px) 90vw, 380px"
                    style={{ objectPosition: city.hero.position }}
                  />
                  <span className="door__caption">
                    <span className="door__city">{city.name}</span>
                  </span>
                </span>
              </span>
            </DoorLink>
          </li>
        ))}
      </ul>
    </main>
  );
}
