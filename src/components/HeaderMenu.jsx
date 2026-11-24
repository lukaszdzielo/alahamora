'use client';

import { useEffect, useState } from 'react';
import CitySelect from './CitySelect';

// Menu w nagłówku. Na szerokich ekranach wszystko w jednej linii,
// na telefonie (CSS: max-width 960px) chowa się pod przyciskiem „hamburger”.
export default function HeaderMenu({ nav, current, cityOptions, reserveUrl }) {
  const [open, setOpen] = useState(false);

  // zamknij menu klawiszem Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (event) => event.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <button
        type="button"
        className="header__burger"
        aria-expanded={open}
        aria-controls="header-menu"
        aria-label={open ? 'Zamknij menu' : 'Otwórz menu'}
        onClick={() => setOpen((value) => !value)}
      >
        <span />
        <span />
        <span />
      </button>

      <div id="header-menu" className="header__menu" data-open={open || undefined}>
        <nav aria-label="Menu główne" className="header__nav">
          {nav.map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setOpen(false)}>
              {item}
            </a>
          ))}
        </nav>
        <CitySelect current={current} options={cityOptions} />
        <a className="btn btn--solid" href={reserveUrl} target="_blank" rel="noopener">
          Zarezerwuj
        </a>
      </div>
    </>
  );
}
