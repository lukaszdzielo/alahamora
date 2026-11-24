/** @type {import('next').NextConfig} */
const nextConfig = {
  // Eksport statyczny: `npm run build` tworzy folder `out/` z gotowym HTML
  // dla każdego widoku (/, /katowice/, /gliwice/) – działa na zwykłym hostingu.
  output: 'export',
  trailingSlash: true,
  // Przy eksporcie statycznym Next nie ma serwera do optymalizacji obrazków.
  images: { unoptimized: true },
};

export default nextConfig;
