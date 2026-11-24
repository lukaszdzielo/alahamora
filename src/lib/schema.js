import { cities, social } from '@/data/cities';
import { SITE_NAME, SITE_DESCRIPTION, abs } from './site';

// Dane strukturalne schema.org: marka (Organization) i lokale (CafeOrCoffeeShop).

const ORG_ID = abs('/#organizacja');

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORG_ID,
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: abs('/'),
    logo: abs('/icon.png'),
    image: abs('/og/og.jpg'),
    sameAs: Object.values(social),
    subOrganization: Object.values(cities).map((c) => ({ '@id': abs(`/${c.slug}/#lokal`) })),
  };
}

export function citySchema(city) {
  const [street, locality] = city.address.split(/,\s*(?=[^,]+$)/);
  const url = abs(`/${city.slug}/`);
  return {
    '@context': 'https://schema.org',
    '@type': 'CafeOrCoffeeShop',
    '@id': `${url}#lokal`,
    name: `${SITE_NAME} ${city.name}`,
    alternateName: `${city.h1.before}${city.h1.em}`,
    description: city.lead,
    url,
    image: [abs(city.og), abs(city.hero.src.src.replace(/^.*?\/_next\//, '/_next/'))],
    telephone: city.phone.replace(/\s+/g, ''),
    email: city.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: street,
      addressLocality: locality,
      addressCountry: 'PL',
    },
    hasMap: city.contact.mapsUrl,
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: city.openingHours.opens,
        closes: city.openingHours.closes,
      },
    ],
    acceptsReservations: true,
    sameAs: Object.values(social),
    parentOrganization: { '@id': ORG_ID },
  };
}
