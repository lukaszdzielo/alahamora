import { citySlugs } from '@/data/cities';
import { abs } from '@/lib/site';

// sitemap.xml: strona wyboru lokalizacji + podstrony miast.
export const dynamic = 'force-static';

export default function sitemap() {
  return [
    { url: abs('/'), changeFrequency: 'monthly', priority: 1 },
    ...citySlugs.map((slug) => ({ url: abs(`/${slug}/`), changeFrequency: 'weekly', priority: 0.9 })),
  ];
}
