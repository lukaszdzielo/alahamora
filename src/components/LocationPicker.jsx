import Image from 'next/image';
import Logo from './Logo';
import Bricks from './Bricks';
import DoorLink from './DoorLink';

// Ekran wyboru lokalizacji: ceglana ściana, logo i dwoje drzwi-luster.
// W lustrach są zdjęcia z hero – to samo view-transition-name co w <Hero>,
// więc później zrobimy animację „lustro przechodzi w hero”.
export default function LocationPicker({ cities }) {
  return (
    <main className="picker">
      <Bricks />

      <header className="picker__head">
        <h1 className="picker__logo">
          <Logo />
        </h1>
        <p className="picker__tagline">Magiczna kawiarnia</p>
        <p className="picker__lead">
          Mamy dwoje drzwi do świata czarów. Wybierz, które chcesz otworzyć – zapamiętamy Twój wybór.
        </p>
      </header>

      <ul className="picker__doors">
        {cities.map((city) => (
          <li key={city.slug} data-city={city.theme}>
            <DoorLink slug={city.slug} className="door">
              <span className="door__frame">
                <span className="door__glass">
                  <Image
                    className="door__img"
                    src={city.hero.src}
                    alt={`${city.name} – wnętrze kawiarni`}
                    fill
                    sizes="(max-width: 700px) 90vw, 380px"
                    style={{ objectPosition: city.hero.position, viewTransitionName: `hero-${city.slug}` }}
                  />
                  <span className="door__caption">
                    <span className="door__city">{city.name}</span>
                    <span className="door__sub">{city.pickerLabel}</span>
                  </span>
                </span>
              </span>
              <span className="door__meta">
                <span className="door__enter">Wejdź</span>
                <span>{city.pickerAddress}</span>
              </span>
            </DoorLink>
          </li>
        ))}
      </ul>

      <p className="picker__hours">Codziennie 12:00–21:00 w obu lokalach</p>
    </main>
  );
}
