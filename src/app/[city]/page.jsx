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
import WandCursor from '@/components/WandCursor';
import LampsController from '@/components/LampsController';

// Mówi Next.js, które strony wygenerować przy eksporcie: /katowice/ i /gliwice/.
export function generateStaticParams() {
  return citySlugs.map((city) => ({ city }));
}

// Adresy spoza listy -> 404 (wymagane przy output: 'export').
export const dynamicParams = false;

export async function generateMetadata({ params }) {
  const { city } = await params;
  const data = cities[city];
  return {
    title: data ? `Magiczna kawiarnia ${data.name}` : 'Nie znaleziono',
    description: data?.lead,
  };
}

export default async function CityPage({ params }) {
  const { city } = await params;
  const data = cities[city];
  if (!data) notFound();

  return (
    <div className="page" data-city={data.theme}>
      <Header city={data} />
      <main>
        <Hero city={data} />
        <Notice notice={data.notice} />
        <Features features={data.features} lamp={data.effects.lamps} />
        <Menu menu={data.menu} lamps={data.effects.lamps} />
        <Offers offers={data.offers} lamps={data.effects.lamps} />
        <Gallery gallery={data.gallery} lamps={data.effects.lamps} />
        <Contact city={data} lamps={data.effects.lamps} />
      </main>
      <Footer />
      <AppearController />
      {data.effects.lamps && <LampsController />}
      <WandCursor />
    </div>
  );
}
