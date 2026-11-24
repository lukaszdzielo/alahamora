import katowiceHero from '@/assets/img/katowice-hero.webp';
import gliwiceHero from '@/assets/img/gliwice-hero.webp';

// Dane lokali. Każde miasto to ten sam widok (CityPage) z innym zestawem danych.
// Nowa lokalizacja = nowy obiekt tutaj – strona wygeneruje się sama.

export const cities = {
  katowice: {
    slug: 'katowice',
    name: 'Katowice',
    theme: 'katowice', // granat + złoto (zmienne w globals.css)
    h1: { before: 'Czarodziejska biblioteka w sercu ', em: 'Katowic' },
    lead:
      'Antyczne meble, ruchome obrazy i portale do innych światów. Wpadnij na magiczne bubble tea, kwiatowy napar z wróżeniem z fusów albo wegetariański obiad.',
    hero: {
      src: katowiceHero, // import statyczny – Next sam doda basePath (GitHub Pages)
      alt: 'Granatowa sala z obrazami w złotych ramach',
      position: '70% 40%',
    },
    address: 'ul. Mariacka Tylna 5a, Katowice',
    phone: '+48 786 432 211',
    email: 'kontakt@alahamora.pl',
    hours: 'Codziennie 12:00–21:00',
    effects: { lamps: true, revelio: false },
  },
  gliwice: {
    slug: 'gliwice',
    name: 'Gliwice',
    theme: 'gliwice', // zieleń + srebro
    h1: { before: 'Gildia Czarodziejów w ', em: 'Gliwicach' },
    lead:
      'Sto metrów niezwykłej atmosfery: antyki, magiczne przebrania i najbardziej różowy pokój. Wpadnij na dymiący eliksir, lody spaghetti albo obiad.',
    hero: {
      src: gliwiceHero,
      alt: 'Zielony salon z antycznymi fotelami',
      position: '60% 45%',
    },
    address: 'ul. Zwycięstwa 34/U1, Gliwice',
    phone: '+48 572 583 102',
    email: 'gliwice@alahamora.pl',
    hours: 'Codziennie 12:00–21:00',
    effects: { lamps: false, revelio: true },
  },
};

export const citySlugs = Object.keys(cities);

export const social = {
  facebook: 'https://www.facebook.com/profile.php?id=100091798000880',
  instagram: 'https://www.instagram.com/alahamora_official/',
  tiktok: 'https://www.tiktok.com/@alahamora_official',
};
