import Link from 'next/link';
import Logo from './Logo';
import HeaderMenu from './HeaderMenu';

export default function Header({ city }) {
  return (
    <header className="header">
      <div className="wrap header__inner">
        <Link href={`/${city.slug}/`} className="header__logo" aria-label={`Alahamora ${city.name} – strona główna`}>
          <Logo sub={city.name} />
        </Link>
        <HeaderMenu nav={city.nav} />
      </div>
    </header>
  );
}
