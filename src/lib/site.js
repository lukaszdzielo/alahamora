// Ustawienia SEO wspólne dla całej strony.
//
// SITE_URL – pełny adres strony (z podkatalogiem, bez „/” na końcu). Potrzebny do
// adresów kanonicznych, mapy strony i obrazków OG (Facebook/Messenger chcą pełnych linków).
// Na docelowej domenie ustaw w workflow: NEXT_PUBLIC_SITE_URL=https://twojadomena.pl
//
// SITE_INDEX – czy wyszukiwarki mogą indeksować stronę. Domyślnie NIE: to koncepcja
// na GitHub Pages, nie powinna konkurować w Google z prawdziwą alahamora.pl.
// Na docelowej domenie ustaw SITE_INDEX=1.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://lukaszdzielo.github.io/alahamora').replace(/\/+$/, '');
export const SITE_INDEX = process.env.SITE_INDEX === '1';

export const SITE_NAME = 'Alahamora';
export const SITE_DESCRIPTION =
  'Alahamora – magiczna kawiarnia w Gliwicach i Katowicach. Dymiące eliksiry, magiczne bubble tea, ruchome obrazy, przebrania czarodziejów i urodziny w zaczarowanym klimacie.';

// Pełny adres podstrony, np. abs('/gliwice/') -> https://…/alahamora/gliwice/
export const abs = (path = '/') => `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;

// Wspólne pola Open Graph. Next nie łączy obiektu openGraph z layoutu z tym z podstrony
// (podstrona zastępuje go w całości), więc każda podstrona dokleja te pola sama.
export const OG_BASE = { type: 'website', locale: 'pl_PL', siteName: SITE_NAME };
