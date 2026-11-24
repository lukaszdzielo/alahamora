import { SITE_URL, SITE_INDEX } from '@/lib/site';

// robots.txt (przy eksporcie statycznym generowany raz, przy buildzie).
// Uwaga: wyszukiwarki czytają robots.txt tylko z głównego katalogu domeny,
// więc na GitHub Pages (/alahamora/) działa dopiero na docelowej domenie.
export const dynamic = 'force-static';

export default function robots() {
  return {
    rules: SITE_INDEX ? { userAgent: '*', allow: '/' } : { userAgent: '*', disallow: '/' },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
