import { Cinzel, Lora, Cormorant_Garamond } from 'next/font/google';
import '@/styles/globals.css';
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, SITE_INDEX, OG_BASE } from '@/lib/site';

// next/font pobiera fonty przy budowaniu i serwuje je lokalnie (bez zapytań do Google u użytkownika).
const cinzel = Cinzel({ subsets: ['latin', 'latin-ext'], weight: ['600'], variable: '--font-display' });
const lora = Lora({ subsets: ['latin', 'latin-ext'], weight: ['400', '700'], variable: '--font-body' });
const cormorant = Cormorant_Garamond({
  subsets: ['latin', 'latin-ext'],
  weight: ['500'],
  style: ['italic'],
  variable: '--font-ink',
});

// Metadane wspólne dla wszystkich podstron (podstrony nadpisują tytuł, opis, adres i obrazek).
export const metadata = {
  metadataBase: new URL(`${SITE_URL}/`),
  title: { default: 'Alahamora – magiczna kawiarnia w Gliwicach i Katowicach', template: '%s | Alahamora' },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  alternates: { canonical: '/' },
  openGraph: {
    ...OG_BASE,
    url: '/',
    images: [{ url: '/og/og.jpg', width: 1200, height: 630, alt: 'Alahamora – magiczna kawiarnia w Gliwicach i Katowicach' }],
  },
  twitter: { card: 'summary_large_image' },
  robots: SITE_INDEX ? { index: true, follow: true } : { index: false, follow: false },
  formatDetection: { telephone: false, address: false, email: false },
};

export const viewport = {
  themeColor: '#14171F',
  colorScheme: 'dark',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pl" className={`${cinzel.variable} ${lora.variable} ${cormorant.variable}`}>
      <body>{children}</body>
    </html>
  );
}
