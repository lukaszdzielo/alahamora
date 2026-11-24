import Link from 'next/link';
import Logo from './Logo';

const NAV = ['Menu', 'Gildia', 'Oferta', 'Galeria', 'Kontakt'];

export default function Header({ city }) {
  return (
    <header className="header">
      <div className="wrap header__inner">
        <Link href={`/${city.slug}/`} className="header__logo">
          <Logo sub={city.name} />
        </Link>
        <nav aria-label="Menu główne" className="header__nav">
          {NAV.map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`}>
              {item}
            </a>
          ))}
        </nav>
        <a className="btn btn--solid" href="#rezerwacja">
          Zarezerwuj
        </a>
      </div>
    </header>
  );
}
