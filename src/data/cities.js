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

import foodMysticat from '@/assets/img/food-mysticat.webp';
import foodBagel from '@/assets/img/food-rainbow-bagel.webp';
import gliwicePotions from '@/assets/img/gliwice-potions.webp';
import gliwiceFace from '@/assets/img/gliwice-stone-face.webp';
import katowiceBlueHall from '@/assets/img/katowice-blue-hall.webp';
import katowiceSconces from '@/assets/img/katowice-sconces.webp';
import katowiceDoors from '@/assets/img/katowice-doors.webp';
import katowiceLanterns from '@/assets/img/katowice-lanterns.webp';
import katowiceMoss from '@/assets/img/katowice-moss-wall.webp';

// `placeholder: true` = zdjęcie zastępcze (brak zdjęcia tej atrakcji) – do podmiany.

export const cities = {
  gliwice: {
    slug: 'gliwice',
    name: 'Gliwice',
    inCity: 'w Gliwicach', // do tytułu strony (SEO)
    themeColor: '#0F2621',
    og: '/og/gliwice.jpg', // obrazek do udostępnień 1200×630 (public/og)
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
    openingHours: { opens: '12:00', closes: '21:00' }, // codziennie – do danych strukturalnych
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
    menu: {
      layout: 'list', // Gliwice: zdjęcie + lista; Katowice: łuki
      title: 'Dania, których nie ma nigdzie indziej',
      lead: 'Dymiące eliksiry, lody spaghetti, kultowy MystiCat i pyszne obiady.',
      image: gliwicePotions,
      imageAlt: 'Kolorowe eliksiry',
      items: [
        { img: gliwicePotions, title: 'Dymiące eliksiry', text: 'Napoje, które parują, mienią się i zmieniają kolor.' },
        { icon: 'ice', title: 'Lody spaghetti', text: 'Deser, który wygląda jak obiad. Spróbuj go odróżnić.' },
        { img: foodMysticat, title: 'MystiCat', text: 'Kultowy deser w kształcie kota na kolorowej posypce.' },
        { img: foodBeet, title: 'Dania obiadowe', text: 'Pyszne dania na ciepło, gdy magia wzbudzi apetyt.' },
      ],
      menuUrl: '#', // TODO: link do pełnego menu Gliwic
    },
    offers: {
      title: 'Urodziny, klasy i rodzinne okazje',
      lead: 'Urodziny, wycieczki szkolne i rodzinne uroczystości w Gildii. Przygotujemy menu i atrakcje pod Twoją okazję.',
      items: [
        { icon: 'cake', title: 'Urodziny', text: 'Magiczne przyjęcie z przebraniami i menu dla młodych czarodziejów.' },
        { icon: 'group', title: 'Grupy i szkoły', text: 'Wycieczki klasowe i wyjścia zorganizowane do Gildii.' },
        { icon: 'wand', title: 'Imprezy okolicznościowe', text: 'Chrzciny, komunie, rocznice i spotkania w czarodziejskim wnętrzu.' },
        { icon: 'paper', title: 'Voucher jak z gazety', text: 'Prezent w formie strony z magicznej gazety, mailem albo na miejscu.' },
      ],
    },
    gallery: {
      title: 'Zajrzyj do Gildii',
      lead: 'Zielone salony, mosiężne talerze na kaflach i kamienna twarz w gąszczu.',
      url: null, // galeria Gliwic – link na razie nieaktywny
      // ramy: kolejno dla 12 miejsc na ścianie (patrz Gallery.jsx)
      frames: ['silver-orn', 'black', 'gothic-gold', 'oval-wood', 'wood', 'arch-silver', 'black-orn-gold', 'oval-gold', 'gothic-black', 'gold', 'wood-orn', 'bronze'],
      items: [
        { img: gliwicePortraits, caption: 'Galeria portretów' },
        { img: gliwicePlates, caption: 'Mosiężne talerze' },
        { img: gliwiceFace, caption: 'Kamienna twarz' },
        { img: gliwiceBall, alt: 'Kryształowa kula' },
        { img: gliwiceTeapot, caption: 'Antyki' },
        { img: gliwicePotions, caption: 'Eliksiry' },
        { img: gliwiceForest, caption: 'Zielone sklepienie' },
        { img: gliwicePinkTea, alt: 'Herbata w różowej porcelanie' },
        { img: gliwiceCamera, caption: 'Kącik do zdjęć' },
        { img: gliwicePinkRoom, caption: 'Różowy pokój' },
        { img: gliwiceHero, caption: 'Zielony salon' },
        { img: foodMysticat, caption: 'MystiCat' },
      ],
    },
    contact: {
      title: 'Odwiedź Gildię w Gliwicach',
      lead: 'Bez wejściówek i bez planowania. Drzwi Gildii są otwarte codziennie od południa.',
      hoursLong: 'Poniedziałek–niedziela, 12:00–21:00',
      mapQuery: 'Alahamora, Zwycięstwa 34, 44-100 Gliwice',
      coords: [50.2967827, 18.6714271], // punkt lokalu z Google Maps – środek mapy i miejsce różdżki
      mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Alahamora+Zwyci%C4%99stwa+34+Gliwice',
      other: { slug: 'katowice', img: katowicePortraits, title: 'Zajrzyj też do Katowic', text: 'Magiczna kawiarnia przy Mariackiej Tylnej: bubble tea i ruchome obrazy.' },
    },
    effects: { lamps: false, revelio: true },
  },

  katowice: {
    slug: 'katowice',
    name: 'Katowice',
    inCity: 'w Katowicach',
    themeColor: '#121829',
    og: '/og/katowice.jpg',
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
    openingHours: { opens: '12:00', closes: '21:00' },
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
    menu: {
      layout: 'arches',
      title: 'Z magicznej karty',
      lead: 'Rzemieślnicze bajgle we wszystkich kolorach tęczy, kremy robione od podstaw i eliksiry z magicznych ziół.',
      items: [
        { img: foodMysticat, title: 'MystiCat', text: 'Kultowy deser w kształcie kota na kolorowej posypce.' },
        { img: foodBagel, title: 'Tęczowe bajgle', text: 'Wypiekane przez naszych prefektów, na słodko i na słono.' },
        { img: foodCake, title: 'Ciasta z kolorowym kremem', text: 'Kremy robione od podstaw, z odrobiną sekretnej magii.' },
        { img: foodBeet, title: 'Obiad bez mięsa', text: 'Sezonowe dania wegetariańskie, które zaskakują smakiem.' },
      ],
      menuUrl: '#', // TODO: link do pełnego menu Katowic
    },
    offers: {
      title: 'Urodziny, klasy i wyjątkowe okazje',
      lead: 'Zorganizujemy magiczne urodziny, lekcję dla klasy albo warsztaty. Wybierz okazję, resztą zajmą się czarodzieje.',
      items: [
        { icon: 'group', title: 'Wyjście klasowe', price: '10 zł', text: 'Lekcja w bibliotece czarodziejów dla szkół i grup.' },
        { icon: 'cake', title: 'Magiczne urodziny', text: 'Przyjęcie w zaczarowanym wnętrzu z menu dla małych i dużych czarodziejów.' },
        { icon: 'wand', title: 'Warsztaty', text: 'Zajęcia z eliksirów, zielarstwa i wróżbiarstwa dla początkujących.' },
        { icon: 'gift', title: 'Czekolada ze złotym biletem', text: 'Magiczna czekolada na prezent, a w środku złoty bilet do kawiarni.' },
      ],
    },
    gallery: {
      title: 'Zajrzyj do środka',
      lead: 'Granatowe ściany, złote ramy, setki światełek i drzwi, które prowadzą nie wiadomo dokąd.',
      url: null, // galeria Katowic – link na razie nieaktywny
      frames: ['gold-orn', 'black-silver', 'gothic-silver', 'oval-wood', 'wood', 'arch-gold', 'black-orn', 'oval-silver', 'gothic-black', 'silver', 'wood-orn', 'pewter'],
      items: [
        { img: katowiceBlueHall, caption: 'Granatowa sala' },
        { img: katowiceSconces, caption: 'Kinkiety' },
        { img: katowiceDoors, caption: 'Drzwi do innych światów' },
        { img: katowicePortraits, alt: 'Obrazy w złotych ramach' },
        { img: katowicePlate, caption: 'Stara zastawa' },
        { img: katowiceLanterns, caption: 'Lampiony' },
        { img: katowiceBooth, caption: 'Dormitorium' },
        { img: foodCake, alt: 'Ciasto z magicznej kawiarni' },
        { img: katowiceMoss, caption: 'Podwórko' },
        { img: katowiceNook, caption: 'Dział ksiąg zakazanych' },
        { img: katowiceHero, caption: 'Granatowy salon' },
        { img: foodMysticat, caption: 'MystiCat' },
      ],
    },
    contact: {
      title: 'Odwiedź nas w Katowicach',
      lead: 'Znajdziesz nas w podwórku przy ulicy Mariackiej Tylnej, kilka minut spacerem od Rynku.',
      hoursLong: 'Poniedziałek–niedziela, 12:00–21:00',
      mapQuery: 'Alahamora, Mariacka Tylna 5a, 40-001 Katowice',
      coords: [50.2572143, 19.0253965],
      mapsUrl: 'https://maps.app.goo.gl/dj2uHzEp8ATLQQyW8',
      other: { slug: 'gliwice', img: gliwiceHero, title: 'Zajrzyj też do Gliwic', text: 'Gildia Czarodziejów: zielone salony, klub dziecięcy i lody spaghetti.' },
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
