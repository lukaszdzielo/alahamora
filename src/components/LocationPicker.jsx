import Image from 'next/image';
import Logo from './Logo';
import Bricks from './Bricks';
import DoorLink from './DoorLink';

// Ekran wyboru lokalizacji: tylko logo i ramy z lokalami.
// W ramie jest zdjęcie z hero (ten sam kadr co w hero: object-fit cover + ta sama pozycja).
// Po kliknięciu rama „przybliża się” do nas, a zdjęcie płynnie przekadrowuje się do hero (DoorLink).
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
            <DoorLink slug={city.slug} position={city.hero.position} className="door" label={`${city.name} – wejdź`}>
              <span className="door__frame">
                <span className="door__glass">
                  <Image
                    className="door__img"
                    src={city.hero.src}
                    alt=""
                    fill
                    priority
                    sizes="(max-width: 700px) 45vw, 300px"
                    style={{ objectPosition: city.hero.position }}
                  />
                  <span className="door__city">{city.name}</span>
                </span>
              </span>
            </DoorLink>
          </li>
        ))}
      </ul>
    </main>
  );
}
