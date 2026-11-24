import Image from 'next/image';
import Link from 'next/link';
import Logo from './Logo';

// Ekran wyboru: każde „lustro” pokazuje zdjęcie z hero danego lokalu.
// To samo view-transition-name co w <Hero> – przeglądarka może płynnie
// przenieść zdjęcie z lustra do hero (animacja opcjonalna, patrz README).
export default function LocationPicker({ cities }) {
  return (
    <main className="picker">
      <div className="picker__head">
        <Logo className="picker__logo" />
        <h1>Wybierz swoją lokalizację</h1>
      </div>

      <ul className="picker__list">
        {cities.map((city) => (
          <li key={city.slug} data-city={city.theme}>
            <Link href={`/${city.slug}/`} className="mirror">
              <span className="mirror__frame">
                <Image
                  className="mirror__img"
                  src={city.hero.src}
                  alt=""
                  fill
                  sizes="(max-width: 700px) 80vw, 360px"
                  style={{ objectPosition: city.hero.position, viewTransitionName: `hero-${city.slug}` }}
                />
              </span>
              <span className="mirror__label">{city.pickerLabel}</span>
              <span className="mirror__city">{city.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
