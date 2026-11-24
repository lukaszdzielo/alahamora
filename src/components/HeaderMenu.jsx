'use client';

import { useEffect, useState } from 'react';
import CitySelect from './CitySelect';
import scrollToId from '@/lib/scrollToId';

// Menu w nagłówku. Na szerokich ekranach wszystko w jednej linii,
// na telefonie (CSS: max-width 960px) chowa się pod przyciskiem „hamburger”.
// id sekcji, które istnieją na stronie miasta
const SECTIONS = ['menu', 'gildia', 'lokal', 'oferta', 'galeria', 'kontakt'];

export default function HeaderMenu({ nav, current, cityOptions }) {
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
          {nav.map((item) => {
            const id = item.toLowerCase();
            // sekcja, której nie ma na stronie (np. Blog) – link nieaktywny
            if (!SECTIONS.includes(id)) {
              return (
                <a key={item} aria-disabled="true" title="Wkrótce">
                  {item}
                </a>
              );
            }
            return (
              <a
                key={item}
                href={`#${id}`}
                onClick={(event) => {
                  setOpen(false);
                  if (scrollToId(id)) event.preventDefault();
                }}
              >
                {item}
              </a>
            );
          })}
        </nav>
        <CitySelect current={current} options={cityOptions} />
        <a className="btn btn--solid" aria-disabled="true" title="Wkrótce">
          Zarezerwuj
        </a>
      </div>
    </>
  );
}
