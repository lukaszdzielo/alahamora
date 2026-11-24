import LocationPicker from '@/components/LocationPicker';
import WandCursor from '@/components/WandCursor';
import { cities } from '@/data/cities';

export const metadata = {
  title: 'Wybierz lokalizację',
};

// Komponent serwerowy: renderuje się do HTML przy `npm run build`.
export default function Home() {
  return (
    <div className="page" data-city="picker">
      <LocationPicker cities={Object.values(cities)} />
      <WandCursor />
    </div>
  );
}
