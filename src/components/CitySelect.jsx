'use client';

import { useRouter } from 'next/navigation';
import Icon from './Icon';

// Wybór lokalu w nagłówku – <select> skaluje się do dowolnej liczby miast.
export default function CitySelect({ current, options }) {
  const router = useRouter();

  return (
    <label className="city-select">
      <span className="sr-only">Wybierz lokal</span>
      <Icon name="pin" size={16} className="city-select__pin" />
      <select value={current} onChange={(event) => router.push(`/${event.target.value}/`)}>
        {options.map(({ slug, name }) => (
          <option key={slug} value={slug}>
            {name}
          </option>
        ))}
      </select>
      <Icon name="chevron" size={16} stroke={2} className="city-select__chevron" />
    </label>
  );
}
