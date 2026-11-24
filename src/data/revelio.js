// Revelio (tylko Gliwice): rysunki Łukasza i notatki atramentem, które odsłania światło różdżki.
// Na desktopie są ledwo widoczne (ok. 8%) i rozjaśniają się pod kursorem; na telefonach
// i tabletach (bez kursora) widać je od razu.
//
// Pozycje w obrębie pasa o szerokości treści (1200 px) w danej sekcji – jak na płótnie.
// Typy:
//   { draw: 'koperta', w: 400, rotate: -4, pos: {...} }   – rysunek z src/assets/svg/revelio
//   { ink: 'tekst', pos: {...} }                           – notatka atramentem
//   { feet: [[x,y] ×4], n: 14, w, h, pos: {...} }          – ślady stóp po krzywej Béziera
// hide: 'mobile' – nie pokazuj poniżej 900 px (brak miejsca); mobile: {...} – inna pozycja na telefonie.

// TRYB TESTOWY (do ustawiania pozycji): wszystkie elementy widoczne na stałe w 50%,
// bez światła różdżki, na każdym ekranie. Przed oddaniem ustaw na false.
// (Można też włączyć tylko w przeglądarce: dopisz do adresu ?revelio=test)
export const REVELIO_TEST = true;

export const gliwiceRevelio = {
  hero: [{ draw: 'koperta', w: 400, rotate: -4, pos: { right: '70px', top: '240px' }, hide: 'mobile' }],
  features: [{ ink: 'Psst… szukasz czegoś?', pos: { left: '63%', top: '58px' }, hide: 'mobile' }],
  // kapelusz siedzi na końcu nagłówka „Co czeka w Gildii” (renderuje go Features)
  featuresTitle: { draw: 'kapelusz', w: 250, rotate: 24, mobileW: 150 },
  menu: [
    { draw: 'kociol', w: 280, pos: { left: '150px', top: '-70px' }, mobile: { left: '4%', top: '-40px', w: 150 } },
    { ink: 'Eliksir dnia czeka na odważnych', pos: { left: '450px', top: '110px' }, hide: 'mobile' },
    { ink: 'Tędy przeszedł nocą czarodziej', pos: { left: '0', bottom: '56px' }, hide: 'mobile' },
  ],
  offers: [
    { feet: [[345, -212], [330, 60], [760, 10], [850, 330]], n: 14, w: 1000, h: 600, pos: { left: '0', top: '-240px' }, hide: 'mobile' },
    { draw: 'ksiega2', w: 340, rotate: 10, pos: { right: '3%', bottom: '-120px' }, mobile: { right: '2%', bottom: '-60px', w: 180 } },
    { ink: 'Tu kończy się mapa, a zaczyna kawa', pos: { left: '0', bottom: '56px' }, hide: 'mobile' },
  ],
  // sowa na drążku ostatniego proporca (renderuje ją Offers)
  offersOwl: { draw: 'sowa', w: 170 },
  gallery: [{ ink: 'Najlepszy stolik jest pod portretem', pos: { left: '0', bottom: '100px' }, mobile: { left: '4%', bottom: '60px' } }],
  contact: [
    { feet: [[790, 70], [900, 10], [1050, 120], [1180, 50]], n: 7, w: 1200, h: 180, pos: { left: '0', top: '0' }, hide: 'mobile' },
    { ink: 'Hasło na dziś: „Alahamora” – szepnij je przy barze', pos: { left: '0', bottom: '56px' }, mobile: { left: '4%', bottom: '40px' } },
  ],
};
