// Na GitHub Pages strona działa pod adresem /alahamora/, lokalnie pod /.
// Workflow ustawia PAGES_BASE_PATH=/alahamora; przy `npm run dev` zmienna jest pusta.
const basePath = process.env.PAGES_BASE_PATH || '';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Eksport statyczny: `npm run build` tworzy folder `out/` z gotowym HTML
  // dla każdego widoku (/, /katowice/, /gliwice/).
  output: 'export',
  trailingSlash: true,
  basePath,
  // dla <Picture>: adresy gotowych rozmiarów zdjęć w public/_img też potrzebują basePath
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  // Przy eksporcie statycznym Next nie ma serwera do optymalizacji obrazków –
  // rozmiary AVIF/WebP robi scripts/images.mjs, a wyświetla je components/Picture.jsx.
  images: { unoptimized: true },
};

export default nextConfig;
