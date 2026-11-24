// Dane lokali. Każde miasto to ten sam widok (CityPage) z innym zestawem danych.
// Nowa lokalizacja = nowy obiekt tutaj – strona wygeneruje się sama.
// Kolejność obiektów = kolejność na ekranie wyboru (najpierw Gliwice).

import gliwiceHero from '@/assets/img/gliwice-hero.webp';
import gliwicePinkRoom from '@/assets/img/gliwice-pink-room.webp';
import gliwiceForest from '@/assets/img/gliwice-forest-arch.webp';
import gliwicePinkTea from '@/assets/img/gliwice-pink-tea.webp';
import gliwiceCamera from '@/assets/img/gliwice-camera.webp';
import gliwiceBall from '@/assets/img/gliwice-crystal-ball.webp';
import gliwiceTeapot from '@/assets/img/gliwice-teapot.webp';
import gliwicePortraits from '@/assets/img/gliwice-portraits.webp';
import gliwicePlates from '@/assets/img/gliwice-brass-plates.webp';

import katowiceHero from '@/assets/img/katowice-hero.webp';
import katowicePortraits from '@/assets/img/katowice-moving-portraits.webp';
import katowiceBooth from '@/assets/img/katowice-booth.webp';
import katowicePlate from '@/assets/img/katowice-plate.webp';
import katowiceNook from '@/assets/img/katowice-table-nook.webp';
import foodCake from '@/assets/img/food-cake.webp';
import foodBeet from '@/assets/img/food-beet-dish.webp';

// `placeholder: true` = zdjęcie zastępcze (brak zdjęcia tej atrakcji) – do podmiany.

export const cities = {
  gliwice: {
    slug: 'gliwice',
    name: 'Gliwice',
    theme: 'gliwice', // zieleń + srebro
    nav: ['Menu', 'Gildia', 'Oferta', 'Galeria', 'Blog', 'Kontakt'],
    h1: { before: 'Gildia Czarodziejów w ', em: 'Gliwicach' },
    lead:
      'Sto metrów niezwykłej atmosfery: antyki, magiczne przebrania i najbardziej różowy pokój. Wpadnij na dymiący eliksir, lody spaghetti albo obiad.',
    hero: {
      src: gliwiceHero,
      alt: 'Zielony salon z antycznymi fotelami',
      position: '60% 45%',
    },
    address: 'ul. Zwycięstwa 34/U1, Gliwice',
    addressShort: 'ul. Zwycięstwa 34/U1',
    phone: '+48 572 583 102',
    email: 'gliwice@alahamora.pl',
    hours: 'Codziennie 12:00–21:00',
    reserveUrl: 'https://alahamora.pl/rezerwacje-gliwice/',
    notice: {
      icon: 'door',
      title: 'Od 11 marca wchodzisz bez wejściówek',
      text: 'Możesz wpaść spontanicznie na kawę, deser lub obiad. Rezerwacja przyda się przy większej grupie.',
      button: { label: 'Zarezerwuj stolik', href: 'https://alahamora.pl/rezerwacje-gliwice/' },
    },
    features: {
      id: 'gildia',
      title: 'Co czeka w Gildii',
      lead: 'Wnętrze nasycone historiami, antykami i magią. Do świata czarów przeniesiesz się tu bez względu na wiek.',
      items: [
        { img: gliwicePinkRoom, title: 'Najbardziej różowy pokój', text: 'Pastelowe barwy, porcelana i kwiaty pod sufitem. Zachwyci każdego miłośnika różu.' },
        { img: gliwiceForest, title: '100 metrów niezwykłej atmosfery', text: 'Każdy detal tworzy zaczarowany klimat, od zielonych sklepień po złocone fotele.' },
        { img: gliwicePinkTea, title: 'Magiczne przebrania', text: 'Wybierz strój i poczuj się jak prawdziwy czarodziej w zaczarowanym świecie.' },
        { img: gliwicePortraits, placeholder: true, title: 'Kameralny klub dziecięcy', text: 'Przestrzeń tylko dla najmłodszych czarodziejów, pełna zabawy i przygód.' },
        { img: gliwicePlates, placeholder: true, title: 'Gry i książki', text: 'Regał z grami i książkami zadowoli niejednego czarodzieja. Tu nie da się nudzić.' },
        { img: gliwiceCamera, title: 'Miejsca do zdjęć', text: 'Każdy zakątek jest gotowy, by uwiecznić magiczne chwile.' },
        { img: gliwiceBall, title: 'Myślodsiewnia i papier marzeń', text: 'Zostaw to, o czym chcesz zapomnieć, i zasiej nowe marzenia.' },
        { img: gliwiceTeapot, title: 'Pokój pełen antyków', text: 'Mosiądz, porcelana i przedmioty z historią na każdej półce.' },
      ],
    },
    effects: { lamps: false, revelio: true },
  },

  katowice: {
    slug: 'katowice',
    name: 'Katowice',
    theme: 'katowice', // granat + złoto
    nav: ['Menu', 'Lokal', 'Oferta', 'Galeria', 'Blog', 'Kontakt'],
    h1: { before: 'Czarodziejska biblioteka w sercu ', em: 'Katowic' },
    lead:
      'Antyczne meble, ruchome obrazy i portale do innych światów. Wpadnij na magiczne bubble tea, kwiatowy napar z wróżeniem z fusów albo wegetariański obiad.',
    hero: {
      src: katowiceHero,
      alt: 'Granatowa sala z obrazami w złotych ramach',
      position: '70% 40%',
    },
    address: 'ul. Mariacka Tylna 5a, Katowice',
    addressShort: 'Mariacka Tylna 5a',
    phone: '+48 786 432 211',
    email: 'kontakt@alahamora.pl',
    hours: 'Codziennie 12:00–21:00',
    reserveUrl: 'https://alahamora.pl/rezerwacje/',
    notice: {
      icon: 'school',
      title: 'Wyjście klasowe za 10 zł od osoby',
      text: 'Lekcja w czarodziejskiej bibliotece dla szkół i grup zorganizowanych.',
      button: { label: 'Sprawdź ofertę', href: '#oferta' },
    },
    features: {
      id: 'lokal',
      title: 'Co czeka za drzwiami',
      lead: 'Alahamora to miejsce dla wymagających czarodziejów. Witają tu certyfikowani czaroksiężnicy, a ciekawscy mugole też są mile widziani.',
      items: [
        { img: katowicePortraits, title: 'Ruchome obrazy', text: 'Portrety w złotych ramach, które nie zawsze siedzą spokojnie. Antyczne meble i portale w samym centrum Katowic.' },
        { img: katowiceBooth, title: 'Twoje dormitorium', text: 'Kameralne loże i zakamarki, w których czas płynie wolniej. Idealne na długą rozmowę przy eliksirze.' },
        { img: foodCake, placeholder: true, title: 'Magiczne bubble tea', text: 'Jednorożec, Puszek i inne napoje. Każdy smak to inny rodzaj magii do odkrycia.' },
        { img: katowicePlate, title: 'Napary kwiatowe', text: 'Prosto z lekcji zielarstwa: flora rozkwitająca w filiżance, ziołowe eliksiry i wróżenie z fusów.' },
        { img: foodBeet, placeholder: true, title: 'Kuchnia wegetariańska', text: 'Wegetariańska carbonara czy bezmięsny gulasz? Smaki, które oszukają niejednego mięsożercę.' },
        { img: katowiceNook, adult: true, title: 'Dział ksiąg zakazanych', text: 'Tu czeka Tłuczek, najsłynniejsze piwo czarodziejów. Tylko dla dorosłych (18+).' },
      ],
    },
    effects: { lamps: true, revelio: false },
  },
};

export const citySlugs = Object.keys(cities);

export const social = {
  facebook: 'https://www.facebook.com/profile.php?id=100091798000880',
  instagram: 'https://www.instagram.com/alahamora_official/',
  tiktok: 'https://www.tiktok.com/@alahamora_official',
};
