import Image from 'next/image';
import parchment from '@/assets/img/mapa/pergamin.webp';
// maska-postrzepiona: kształt z poszarpanymi brzegami od Łukasza (24.11); poprzednia, z miękkim brzegiem: maska-srodek.png
import innerMask from '@/assets/img/mapa/maska-postrzepiona.png';
import Icon from './Icon';

// Mapa na pergaminie: prawdziwa mapa (Google Maps, bez klucza API) przycięta do kształtu
// poszarpanego kawałka papieru na środku pergaminu. Na mapę nakładamy fakturę papieru (multiply),
// więc zagięcia i plamy przebijają przez ulice. Mapą można normalnie przesuwać i przybliżać.
export default function ParchmentMap({ query, mapsUrl, address }) {
  const src = `https://maps.google.com/maps?q=${encodeURIComponent(query)}&z=17&output=embed`;

  return (
    <div className="pmap" style={{ '--mask': `url(${innerMask.src})` }}>
      <Image className="pmap__paper" src={parchment} alt="" fill sizes="(max-width: 900px) 92vw, 580px" />
      {/* .pmap__cut: cień i ciemniejszy brzeg wzdłuż poszarpanej krawędzi (filtr musi być na rodzicu –
          na elemencie z maską przycięłaby go sama maska) */}
      <div className="pmap__cut">
        <div className="pmap__map">
          <iframe src={src} title={`Mapa dojazdu – ${address}`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        </div>
        <Image className="pmap__texture" src={parchment} alt="" fill sizes="(max-width: 900px) 92vw, 580px" aria-hidden="true" />
      </div>
      <div className="pmap__card">
        <strong>{address}</strong>
        <a className="btn btn--solid" href={mapsUrl} target="_blank" rel="noopener">
          <Icon name="pin" size={16} /> Prowadź do nas
        </a>
      </div>
    </div>
  );
}
