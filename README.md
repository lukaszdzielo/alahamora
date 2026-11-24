# Alahamora – strona (Next.js)

Magiczna kawiarnia: ekran wyboru lokalizacji + Katowice + Gliwice.

## Technologia

- **Next.js 16 (App Router) + React 19**, JavaScript
- **Eksport statyczny** (`output: 'export'`) – `npm run build` tworzy folder `out/`
  z gotowym HTML dla `/`, `/katowice/`, `/gliwice/` (dobre SEO, zwykły hosting wystarczy)
- **CSS** bez bibliotek: natywne zagnieżdżanie (`&`) + zmienne; kolory przełącza `data-city`
- Fonty przez `next/font/google` (Cinzel, Lora, Cormorant Garamond) – pobierane przy budowaniu

## Start

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # statyczny eksport do out/
npm run preview    # podgląd folderu out/
```

## Struktura

```
src/
  app/
    layout.jsx          ← <html>, fonty, metadane
    page.jsx            ← /  (ekran wyboru lokalizacji)
    [city]/page.jsx     ← /katowice/, /gliwice/ (generateStaticParams)
  components/           ← Header, Hero, Footer, Logo, LocationPicker – komponenty SERWEROWE
                          WandCursor – komponent KLIENCKI ('use client')
  hooks/useWandCursor.js
  data/cities.js        ← dane lokali (nowe miasto = nowy obiekt)
  styles/globals.css
public/
  img/                  ← zdjęcia hero
  svg/                  ← logo + rysunki (sowa, kapelusz, kociołek, koperta, księga, zamek, różdżka)
```

## Zasoby

- `src/assets/img/` – zdjęcia z alahamora.pl (hero, galeria, menu: `food-*`, wnętrza `katowice-*`, `gliwice-*`)
  – importowane w kodzie (`import foto from '@/assets/img/…'`), Next sam doda ścieżkę dla GitHub Pages
- `src/assets/img/mapa/` – pergamin do mapy (`pergamin.webp`, przezroczyste tło) i maska kształtu (`maska.png`)
- `src/assets/svg/` – SVG używane w CSS (logo, różdżka, zamek)
- `public/svg/` – rysunki Łukasza (sowa, kapelusz, szata, kociołek z chochlikami, koperta, księga ze skarpetą v2)
- `public/svg/warianty/` – wersje alternatywne (księga v1, kociołek z jednym chochlikiem)

## Zasada serwer / klient

- Domyślnie każdy komponent jest **serwerowy** – renderuje się do HTML przy budowaniu,
  nie wysyła JS do przeglądarki.
- Gdy komponent potrzebuje przeglądarki (`useState`, `useEffect`, mysz, scroll) –
  na górze pliku dopisujemy `'use client'` (przykład: `WandCursor.jsx`).
- Efekty z projektu (Revelio, latarnie, karuzela zwierciadeł, chmury) robimy jako
  małe komponenty klienckie + własne hooki.

## Stan sekcji

- [x] Ekran wyboru lokalizacji + animacja „wejście w obraz” (View Transitions)
- [x] Nagłówek, hero, pasek ogłoszenia
- [x] Co czeka (karuzela zwierciadeł)
- [x] Z magicznej karty (Katowice: łuki, Gliwice: lista) + chmury
- [x] Urodziny, klasy i okazje (proporce, świece, gotyckie okna)
- [x] Galeria (ramy z różnych metali, ściana z kafli)
- [x] Kontakt (dane + prawdziwa mapa Google na pergaminie)
- [x] Katowice: latarnie i świetlik (`Lamp`, `LampsController`)
- [x] Pojawianie się elementów przy przewijaniu (`AppearController`, atrybut `data-appear`)
- [ ] Gliwice: Revelio – ukryte rysunki pod różdżką (sowa, kapelusz, kociołek, koperta, księga…)
- [ ] Linki do pełnego menu (TODO w `cities.js`), zdjęcia zastępcze (`placeholder: true`)
- [ ] Wersja mobilna – dopracowanie, dostępność, SEO
