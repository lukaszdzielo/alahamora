import Link from 'next/link';
import Logo from '@/components/Logo';
import Bricks from '@/components/Bricks';
import WandCursor from '@/components/WandCursor';
import { cities } from '@/data/cities';

// Strona 404 (przy eksporcie statycznym: out/404.html – GitHub Pages pokazuje ją dla
// nieistniejących adresów). Ta sama ceglana ściana co na ekranie wyboru.
export const metadata = {
  title: 'Nie znaleziono',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="page" data-city="picker">
      <main className="picker not-found">
        <Bricks />
        <Link href="/" className="picker__logo" aria-label="Alahamora – wybór lokalizacji">
          <Logo />
        </Link>
        <div className="not-found__text">
          <p className="not-found__code">404</p>
          <h1>Tej komnaty nie ma na mapie</h1>
          <p>Drzwi, których szukasz, zniknęły – albo nigdy ich tu nie było. Wybierz lokal i wejdź jeszcze raz.</p>
          <div className="not-found__links">
            {Object.values(cities).map((city) => (
              <Link key={city.slug} className="btn" href={`/${city.slug}/`}>
                {city.name}
              </Link>
            ))}
            <Link className="btn btn--solid" href="/">
              Wybór lokalizacji
            </Link>
          </div>
        </div>
      </main>
      <WandCursor />
    </div>
  );
}
