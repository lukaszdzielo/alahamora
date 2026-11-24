import { Cinzel, Lora, Cormorant_Garamond } from 'next/font/google';
import '@/styles/globals.css';

// next/font pobiera fonty przy budowaniu i serwuje je lokalnie (bez zapytań do Google u użytkownika).
const cinzel = Cinzel({ subsets: ['latin', 'latin-ext'], weight: ['600'], variable: '--font-display' });
const lora = Lora({ subsets: ['latin', 'latin-ext'], weight: ['400', '700'], variable: '--font-body' });
const cormorant = Cormorant_Garamond({
  subsets: ['latin', 'latin-ext'],
  weight: ['500'],
  style: ['italic'],
  variable: '--font-ink',
});

export const metadata = {
  title: { default: 'Alahamora – magiczna kawiarnia', template: '%s | Alahamora' },
  description: 'Magiczna kawiarnia w Katowicach i Gliwicach.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pl" className={`${cinzel.variable} ${lora.variable} ${cormorant.variable}`}>
      <body>{children}</body>
    </html>
  );
}
