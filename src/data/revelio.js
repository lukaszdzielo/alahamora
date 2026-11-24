// Revelio (tylko Gliwice): rysunki Łukasza i notatki atramentem, które odsłania światło różdżki.
// Na desktopie są ledwo widoczne (ok. 8%) i rozjaśniają się pod kursorem; na telefonach
// i tabletach (bez kursora) widać je od razu.
//
// Pozycje w obrębie pasa o szerokości treści (1200 px) w danej sekcji – jak na płótnie.
// Typy:
//   { draw: 'koperta', w: 400, rotate: -4, pos: {...} }   – rysunek z src/assets/svg/revelio
//   { ink: 'tekst', pos: {...} }                           – notatka atramentem
//   { feet: [[x,y] ×4], n: 14, w, h, pos: {...} }          – ślady stóp po krzywej Béziera
//   { feet: [['3%',y] ×4], fluid: true, step: 55, h, ... }   – to samo, x w % szerokości pasa
// hide: 'mobile' – nie pokazuj poniżej 900 px (brak miejsca); hide: 'desktop' – tylko poniżej 900 px;
// mobile: {...} – inna pozycja na telefonie.

// TRYB TESTOWY (do ustawiania pozycji): wszystkie elementy widoczne na stałe w 50%,
// bez światła różdżki, na każdym ekranie. Przed oddaniem ustaw na false.
// (Można też włączyć tylko w przeglądarce: dopisz do adresu ?revelio=test)
export const REVELIO_TEST = true;

export const gliwiceRevelio = {
  hero: [{ draw: 'koperta', w: 400, rotate: -4, pos: { right: '70px', top: '240px' }, hide: 'mobile' }],
  // uwaga: .rv ma margin -60px (zapas maski), stąd +60px w translate przy centrowaniu
  features: [
    // telefon/tablet: kapelusz i „Psst…” razem nad nagłówkiem (kapelusz przy nagłówku nie ma tam miejsca)
    // telefon: kapelusz na środku, „Psst…” wyśrodkowane nad nim
    { draw: 'kapelusz', w: 120, rotate: 18, pos: { left: 'calc(50% - 60px)', top: '64px' }, hide: 'desktop' },
    { ink: 'Psst… szukasz czegoś?', pos: { left: '50%', top: '22px', translate: 'calc(-50% + 60px) 0', textAlign: 'center' }, hide: 'desktop' },
  ],
  // kapelusz siedzi na końcu nagłówka „Co czeka w Gildii” (renderuje go Features)
  featuresTitle: { draw: 'kapelusz', w: 250, rotate: 24, mobileW: 150 },
  // „Psst…” tuż obok kapelusza (desktop) – też przypięte do nagłówka
  featuresTitleNote: { ink: 'Psst… szukasz czegoś?', hide: 'mobile' },
  menu: [
    { draw: 'kociol', cls: 'rv--kociol', w: 280, pos: { left: '150px', top: '-70px' }, mobile: { left: 'calc(50% - 75px)', top: '-15px', w: 150 } },
    // telefon / tablet: „Eliksir dnia…” wyśrodkowany nad kociołkiem
    { ink: 'Eliksir dnia czeka na odważnych', pos: { left: '50%', top: '-58px', translate: 'calc(-50% + 60px) 0', textAlign: 'center' }, hide: 'desktop' },
    { ink: 'Eliksir dnia czeka na odważnych', cls: 'rv--eliksir', pos: { left: '450px', top: '50px' }, hide: 'mobile' }, // wyżej – niżej wchodził na ornament nagłówka
    { ink: 'Tędy przeszedł nocą czarodziej', cls: 'rv--tedy', pos: { left: '0', bottom: '56px' }, mobile: { left: '0', bottom: '44px' } },
  ],
  offers: [
    // ścieżka czarodzieja – widoczna zawsze, kształt zależy od szerokości:
    // ≥1248 px (pas treści 1200): spod zdjęcia menu łukiem pod „Całe menu” do sowy
    { feet: [[345, -212], [360, 200], [650, 80], [860, 330]], n: 14, w: 1000, h: 600, cls: 'rv--wide', pos: { left: '0', top: '-240px' } },
    // 641–1247 px: jak na desktopie – od zdjęcia w menu w dół, obok końca „Tędy przeszedł…”, potem w prawo
    // (punkty liczone z położenia zdjęcia, listy i notatki – components/FeetTrail.jsx)
    { trail: true, step: 55, cls: 'rv--narrow', pos: { left: '0', right: '0', top: '-40px' } },
    // telefon (≤640): wyższy pas, ślady wchodzą zza lewej krawędzi ekranu i płynnym „S” znikają za prawą – jakby czarodziej naprawdę tędy przeszedł
    { feet: [['-14%', 25], ['42%', 5], ['58%', 215], ['114%', 195]], fluid: true, step: 52, h: 250, cls: 'rv--phone', pos: { left: '0', right: '0', top: '-40px' } },
    { draw: 'ksiega2', w: 340, rotate: 10, pos: { right: '3%', bottom: '-120px' }, mobile: { right: '2%', bottom: '-60px', w: 180 } },
    { ink: 'Tu kończy się mapa, a zaczyna kawa', pos: { left: '0', bottom: '56px' }, mobile: { left: '0', bottom: '100px' } },
  ],
  // sowa na drążku ostatniego proporca (renderuje ją Offers)
  offersOwl: { draw: 'sowa', w: 170 },
  gallery: [{ ink: 'Najlepszy stolik jest pod portretem', pos: { left: '0', bottom: '100px' }, mobile: { left: '0', bottom: '60px' } }],
  contact: [
    { feet: [[790, 70], [900, 10], [1050, 120], [1180, 50]], n: 7, w: 1200, h: 180, pos: { left: '0', top: '0' }, hide: 'mobile' },
    { ink: 'Hasło na dziś: „Alahamora” – szepnij je przy barze', pos: { left: '0', bottom: '56px' }, mobile: { left: '0', bottom: '40px' } },
  ],
};
