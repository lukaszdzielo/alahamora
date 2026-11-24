import LocationPicker from '@/components/LocationPicker';
import WandCursor from '@/components/WandCursor';
import JsonLd from '@/components/JsonLd';
import { cities } from '@/data/cities';
import { organizationSchema } from '@/lib/schema';

// Strona główna dziedziczy tytuł, opis i obrazek OG z layoutu (title.default).
export const metadata = {
  title: { absolute: 'Alahamora – magiczna kawiarnia w Gliwicach i Katowicach' },
};

// Komponent serwerowy: renderuje się do HTML przy `npm run build`.
export default function Home() {
  return (
    <div className="page" data-city="picker">
      <JsonLd data={organizationSchema()} />
      <LocationPicker cities={Object.values(cities)} />
      <WandCursor />
    </div>
  );
}
