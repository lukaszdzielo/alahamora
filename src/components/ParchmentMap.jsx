import Image from 'next/image';
import parchment from '@/assets/img/mapa/pergamin.webp';
import innerMask from '@/assets/img/mapa/maska-postrzepiona.png';
import Icon from './Icon';
import Seal from './Seal';

// Mapa na kawałku papieru: prawdziwa mapa Google (bez klucza API) przycięta do kształtu
// z poszarpanymi brzegami (maska-postrzepiona.png). Na mapę nakładamy fakturę papieru (multiply).
//
// Znacznik: Google bez klucza nie pozwala podmienić pinezki, więc:
// - mapę ustawiamy samymi współrzędnymi (ll=…) – wtedy Google nie rysuje swojej pinezki,
// - w środku mapy (= dokładnie te współrzędne) leży lakowa pieczęć ze świecącą dziurką od klucza (Seal),
// - mapa jest nieruchoma (bez przesuwania), żeby pieczęć zawsze wskazywała lokal;
//   kliknięcie w mapę albo w przycisk otwiera nawigację w Google Maps.
export default function ParchmentMap({ coords, seal = 'red', query, mapsUrl, address }) {
  const src = coords
    ? `https://maps.google.com/maps?ll=${coords[0]},${coords[1]}&z=17&output=embed`
    : `https://maps.google.com/maps?q=${encodeURIComponent(query)}&z=17&output=embed`;

  return (
    <div className="pmap" style={{ '--mask': `url(${innerMask.src})` }}>
      {/* .pmap__cut: cień i ciemniejszy brzeg wzdłuż poszarpanej krawędzi (filtr musi być na rodzicu –
          na elemencie z maską przycięłaby go sama maska) */}
      <a className="pmap__cut" href={mapsUrl} target="_blank" rel="noopener" tabIndex={-1} aria-hidden="true">
        <div className="pmap__masked">
          <div className="pmap__map">
            <iframe src={src} title={`Mapa dojazdu – ${address}`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" tabIndex={-1} />
          </div>
          <Image className="pmap__texture" src={parchment} alt="" fill sizes="(max-width: 900px) 92vw, 580px" aria-hidden="true" />
        </div>
      </a>

      {coords && (
        <span className="pmap__marker" data-appear="" aria-hidden="true">
          <Seal variant={seal} />
        </span>
      )}

      <a className="btn btn--solid pmap__go" href={mapsUrl} target="_blank" rel="noopener">
        <Icon name="pin" size={16} /> Prowadź do nas
      </a>
    </div>
  );
}
