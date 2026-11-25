import { notFound } from 'next/navigation';
import { cities, citySlugs } from '@/data/cities';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Notice from '@/components/Notice';
import Features from '@/components/Features';
import Menu from '@/components/Menu';
import Offers from '@/components/Offers';
import Gallery from '@/components/Gallery';
import Contact from '@/components/Contact';
import AppearController from '@/components/AppearController';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import Licence from '@/components/Licence';
import WandCursor from '@/components/WandCursor';
import LampsController from '@/components/LampsController';
import RevelioController from '@/components/RevelioController';
import JsonLd from '@/components/JsonLd';
import { citySchema } from '@/lib/schema';
import { OG_BASE } from '@/lib/site';

// Mówi Next.js, które strony wygenerować przy eksporcie: /katowice/ i /gliwice/.
export function generateStaticParams() {
  return citySlugs.map((city) => ({ city }));
}

// Adresy spoza listy -> 404 (wymagane przy output: 'export').
export const dynamicParams = false;

export async function generateMetadata({ params }) {
  const { city } = await params;
  const data = cities[city];
  if (!data) return { title: 'Nie znaleziono' };
  const path = `/${data.slug}/`;
  const title = `Magiczna kawiarnia ${data.inCity}`;
  const alt = `${data.h1.before}${data.h1.em} – ${data.address}`;
  return {
    title,
    description: data.lead,
    alternates: { canonical: path },
    openGraph: {
      ...OG_BASE,
      title: `${title} | Alahamora`,
      description: data.lead,
      url: path,
      images: [{ url: data.og, width: 1200, height: 630, alt }],
    },
    twitter: { title: `${title} | Alahamora`, description: data.lead, images: [data.og] },
  };
}

// Kolor paska przeglądarki na telefonie = tło danego lokalu.
export async function generateViewport({ params }) {
  const { city } = await params;
  return { themeColor: cities[city]?.themeColor ?? '#14171F', colorScheme: 'dark' };
}

export default async function CityPage({ params }) {
  const { city } = await params;
  const data = cities[city];
  if (!data) notFound();

  return (
    <div className="page" data-city={data.theme}>
      <JsonLd data={citySchema(data)} />
      <Header city={data} />
      <main>
        <Hero city={data} />
        <Notice notice={data.notice} />
        <Features rv={data.revelio} features={data.features} lamp={data.effects.lamps} />
        <Menu rv={data.revelio} menu={data.menu} lamps={data.effects.lamps} />
        <Offers rv={data.revelio} offers={data.offers} lamps={data.effects.lamps} />
        <Gallery rv={data.revelio} gallery={data.gallery} lamps={data.effects.lamps} />
        <Contact city={data} lamps={data.effects.lamps} />
        <Licence />
      </main>
      <Footer reviews={data.contact.reviews} />
      <BackToTop />
      <AppearController />
      {data.effects.lamps && <LampsController />}
      {/* Revelio: w Gliwicach rysunki i notatki, w obu miastach zamek w stopce */}
      <RevelioController />
      <WandCursor />
    </div>
  );
}
