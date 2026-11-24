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
  // Przy eksporcie statycznym Next nie ma serwera do optymalizacji obrazków.
  images: { unoptimized: true },
  // podgląd na telefonie w tej samej sieci Wi‑Fi (npm run dev:phone) – zezwól na adresy z sieci lokalnej
  allowedDevOrigins: ['192.168.*.*', '10.*.*.*', '172.*.*.*', '*.local'],
};

export default nextConfig;
