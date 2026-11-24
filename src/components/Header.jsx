import Link from 'next/link';
import Logo from './Logo';
import CitySelect from './CitySelect';
import { cities } from '@/data/cities';

const cityOptions = Object.values(cities).map(({ slug, name }) => ({ slug, name }));

export default function Header({ city }) {
  return (
    <header className="header">
      <div className="wrap header__inner">
        <Link href={`/${city.slug}/`} className="header__logo" aria-label={`Alahamora ${city.name} – strona główna`}>
          <Logo sub={city.name} />
        </Link>
        <nav aria-label="Menu główne" className="header__nav">
          {city.nav.map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`}>
              {item}
            </a>
          ))}
        </nav>
        <CitySelect current={city.slug} options={cityOptions} />
        <a className="btn btn--solid" href={city.reserveUrl} target="_blank" rel="noopener">
          Zarezerwuj
        </a>
      </div>
    </header>
  );
}
