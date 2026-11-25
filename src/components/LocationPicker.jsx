import Picture from './Picture';
import Logo from './Logo';
import Bricks from './Bricks';
import DoorLink from './DoorLink';

// Ekran wyboru lokalizacji: tylko logo i ramy z lokalami.
// W ramie jest zdjęcie z hero (ten sam kadr co w hero: object-fit cover + ta sama pozycja).
// Po kliknięciu cała rama „przybliża się” do nas, a zdjęcie układa się dokładnie jak w hero (DoorLink).
// Iskry unoszące się od dołu ekranu (jak w hero): [left %, opóźnienie s, czas s, rozmiar px]
const SPARKS = [
  [6, 0, 10, 3], [14, 3.2, 12, 4], [22, 6.4, 9, 3], [31, 1.4, 11, 5], [39, 7.8, 13, 3],
  [47, 4.1, 10, 4], [55, 9.2, 12, 3], [63, 2.3, 9, 5], [71, 5.6, 11, 3], [79, 8.4, 10, 4],
  [87, 0.8, 12, 3], [94, 6.9, 9, 4],
];

export default function LocationPicker({ cities }) {
  return (
    // .picker = tło na cały ekran (cegły, iskry); w środku dwie części:
    // <main> – logo i wybór lokalu (wyśrodkowane, z odstępami), <footer> – pasek z prawami autorskimi (socket),
    // poza odstępami części głównej, zawsze na dole
    <div className="picker picker--home">
      <Bricks />
      <div className="picker__sparks" aria-hidden="true">
        {SPARKS.map(([left, delay, duration, size], i) => (
          <span
            key={i}
            className="spark"
            style={{ left: `${left}%`, animationDelay: `${delay}s`, animationDuration: `${duration}s`, width: size, height: size }}
          />
        ))}
      </div>

      <main className="picker__main">
        <h1 className="picker__logo">
          <Logo />
          <span className="sr-only"> – magiczna kawiarnia w Gliwicach i Katowicach</span>
        </h1>

        <ul className="picker__doors" aria-label="Wybierz lokalizację">
          {cities.map((city) => (
            <li key={city.slug} data-city={city.theme}>
              <DoorLink slug={city.slug} position={city.hero.position} className="door" label={`${city.name} – wejdź`}>
                <span className="door__frame">
                  <span className="door__glass">
                    <Picture
                      className="door__img"
                      src={city.hero.src}
                      alt=""
                      fill
                      priority
                      // ten sam rozmiar co w hero: po kliknięciu rama rośnie na cały ekran,
                      // a strona miasta bierze to samo zdjęcie z pamięci podręcznej – bez rozmycia i czekania
                      sizes="100vw"
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

      {/* mała stopka (socket) – osobno pod częścią główną, zawsze na dole: prawa zastrzeżone, realizacja */}
      <footer className="picker__footer">
        {/* ten sam układ co dół stopki na stronach miast: kontener treści, linia, legal po lewej, realizacja po prawej */}
        <div className="picker__footer-inner">
          {/* bez Polityki prywatności i Regulaminu – są w stopce stron miast; ekran wyboru nie zbiera danych.
              Gdy dojdą cookies/analityka, wrócić tu z linkiem do polityki (decyzja Łukasza 25.11) */}
          <p className="picker__legal">
            <span>© {new Date().getFullYear()} Alahamora. Wszelkie prawa zastrzeżone.</span>
          </p>
          <p>
            Realizacja:{' '}
            <a className="picker__credit" href="https://lukaszdzielo.github.io/" target="_blank" rel="noopener">
              LD
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
