import Logo from './Logo';
import Bricks from './Bricks';
import DoorLink from './DoorLink';

// Ekran wyboru lokalizacji: tylko logo i ramy z lokalami.
// Rama działa jak okno: zdjęcie hero leży „za ścianą” na całym ekranie
// (background-attachment: fixed + cover, ten sam kadr co w hero),
// a rama pokazuje tylko jego fragment. Po kliknięciu okno się rozszerza (DoorLink)
// i ten sam obraz staje się hero – bez zmiany kadru i bez przenikania.
// '60% 45%' -> { '--px': 0.6, '--py': 0.45 }
function windowPosition(position) {
  const [x, y] = position.split(' ').map((v) => parseFloat(v) / 100);
  return { '--px': x, '--py': y };
}

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
            <DoorLink slug={city.slug} className="door" label={`${city.name} – wejdź`}>
              <span className="door__frame">
                <span
                  className="door__glass"
                  style={{
                    backgroundImage: `url(${city.hero.src.src})`,
                    '--iw': city.hero.src.width,
                    '--ih': city.hero.src.height,
                    ...windowPosition(city.hero.position),
                  }}
                >
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
