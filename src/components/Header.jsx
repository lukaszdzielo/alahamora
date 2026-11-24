import Link from 'next/link';
import Logo from './Logo';
import HeaderMenu from './HeaderMenu';
import { cities } from '@/data/cities';

const cityOptions = Object.values(cities).map(({ slug, name }) => ({ slug, name }));

export default function Header({ city }) {
  return (
    <header className="header">
      <div className="wrap header__inner">
        <Link href={`/${city.slug}/`} className="header__logo" aria-label={`Alahamora ${city.name} – strona główna`}>
          <Logo sub={city.name} />
        </Link>
        <HeaderMenu nav={city.nav} current={city.slug} cityOptions={cityOptions} reserveUrl={city.reserveUrl} />
      </div>
    </header>
  );
}
