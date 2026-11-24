import { SITE_DESCRIPTION } from '@/lib/site';

// Manifest aplikacji (ikona po dodaniu strony do ekranu głównego telefonu).
// Ścieżki względne – działają też pod /alahamora/ na GitHub Pages.
export const dynamic = 'force-static';

export default function manifest() {
  return {
    name: 'Alahamora – magiczna kawiarnia',
    short_name: 'Alahamora',
    description: SITE_DESCRIPTION,
    start_url: './',
    scope: './',
    display: 'standalone',
    background_color: '#14171F',
    theme_color: '#14171F',
    lang: 'pl',
    icons: [{ src: 'icon.png', sizes: '512x512', type: 'image/png', purpose: 'any' }],
  };
}
