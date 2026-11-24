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
  // koperta z pieczęcią przypięta do nagłówka hero (renderuje ją Hero); położenie, wielkość i obrót
  // na różnych szerokościach – CSS .rv--koperta (desktop obok nagłówka, tablet/telefon nad nim, po prawej)
  heroTitle: { draw: 'koperta', w: 400, rotate: -4 },
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
    // 641–1247 px: od zdjęcia w menu długim łukiem w dół, do nagłówka „Urodziny…”; notatka „Tędy…” obok śladów
    // (punkty liczone z położenia zdjęcia, listy i notatki – components/FeetTrail.jsx)
    { trail: true, step: 55, cls: 'rv--narrow', pos: { left: '0', right: '0', top: '-40px' } },
    // telefon (≤640): ślady po prostu od lewej do prawej (lekka fala), wchodzą i wychodzą poza ekran; pod nimi sowa na ornamencie
    { feet: [['-10%', 45], ['30%', 15], ['70%', 75], ['110%', 45]], fluid: true, step: 52, h: 250, cls: 'rv--phone', pos: { left: '0', right: '0', top: '-40px' } },
    // <768 px: księga i „Tu kończy się mapa…” wyśrodkowane, napis nad księgą; od 768 px układ docelowy (desktop).
    // Księga ma szerokość --book-w = min(340px, 56vw) (CSS): jak na desktopie, ale na 320 px ok. 180 px.
    // 0.8 × szerokość = wysokość obróconej księgi – napis zawsze 17 px nad nią.
    { draw: 'ksiega2', cls: 'rv--book', w: 340, rotate: 10, pos: { right: '3%', bottom: '-120px' }, mobile: { left: 'calc(50% - var(--book-w) / 2)', bottom: '-60px', w: 'var(--book-w)' } },
    // ≥768 px: napis tuż na lewo od księgi (księga: right 3%, 340 px; ok. 16 px odstępu od jej obrysu), na wysokości jej środka
    { ink: 'Tu kończy się mapa, a zaczyna kawa', cls: 'rv--mapa-d', pos: { right: 'calc(3% + 375px)', bottom: '30px', textAlign: 'right' }, hide: 'mobile' },
    { ink: 'Tu kończy się mapa, a zaczyna kawa', cls: 'rv--mapa-m', pos: { left: '50%', bottom: 'calc(100px + (var(--book-w) - 180px) * .8)', translate: 'calc(-50% + 60px) 0', textAlign: 'center' }, hide: 'desktop' },
    // ≤767 px: sowa siedzi na ornamencie nad „Urodzinami…” (gwiazdka ok. 90 px od lewej, linia ok. 125 px
    // od góry sekcji), do niej prowadzą ślady; translate – dół rysunku na linii (60 px zapasu maski × 2)
    { draw: 'sowa', cls: 'rv--sowa-head', w: 150, pos: { left: '15px', top: '125px', translate: '0 calc(-100% + 120px)' } },
  ],
  // sowa na drążku ostatniego proporca (renderuje ją Offers)
  offersOwl: { draw: 'sowa', w: 170 },
  gallery: [{ ink: 'Najlepszy stolik jest pod portretem', pos: { left: '0', bottom: '100px' }, mobile: { left: '0', bottom: '60px' } }],
  contact: [
    { feet: [[790, 70], [900, 10], [1050, 120], [1180, 50]], n: 7, w: 1200, h: 180, pos: { left: '0', top: '0' }, hide: 'mobile' },
    { ink: 'Hasło na dziś: „Alahamora” – szepnij je przy barze', pos: { left: '0', bottom: '56px' }, mobile: { left: '0', bottom: '40px' } },
  ],
};
