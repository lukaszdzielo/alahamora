import Picture from './Picture';
import parchment from '@/assets/img/mapa/pergamin.webp';
import innerMask from '@/assets/img/mapa/maska-postrzepiona.png';
import Icon from './Icon';
import Seal from './Seal';

// Mapa na kawałku papieru: statyczny wycinek OpenStreetMap w kolorach pergaminu
// (src/assets/img/mapa/osm-*.webp – OpenFreeMap, styl „liberty” przekolorowany: tło #ecdfc2,
// zabudowa #dccaa2, ulice #f4ead2, napisy kursywą #4a3520; bez POI, granic i 3D; zoom 16,2,
// 600×600 px × 2), przycięty do kształtu z poszarpanymi brzegami (maska-postrzepiona.png),
// z fakturą papieru (multiply).
//
// Środek obrazka = współrzędne lokalu, więc lakowa pieczęć (Seal) leży na środku mapy.
// Mapa jest obrazkiem – bez skryptów i ciasteczek Google; kliknięcie w mapę albo w przycisk
// otwiera nawigację w Google Maps. Podpis „© OpenStreetMap” jest wymagany licencją (ODbL).
export default function ParchmentMap({ img, coords, seal = 'red', mapsUrl, address }) {
  return (
    <div className="pmap" style={{ '--mask': `url(${innerMask.src})` }}>
      {/* .pmap__cut: cień i ciemniejszy brzeg wzdłuż poszarpanej krawędzi (filtr musi być na rodzicu –
          na elemencie z maską przycięłaby go sama maska) */}
      <a className="pmap__cut" href={mapsUrl} target="_blank" rel="noopener" tabIndex={-1} aria-hidden="true">
        <div className="pmap__masked">
          <Picture className="pmap__map" src={img} alt="" fill sizes="600px" />
          <Picture className="pmap__texture" src={parchment} alt="" fill sizes="(max-width: 900px) 92vw, 580px" aria-hidden="true" />
        </div>
      </a>

      {coords && (
        <span className="pmap__marker" data-appear="" aria-hidden="true">
          <Seal variant={seal} />
        </span>
      )}

      <p className="pmap__credit">
        <span className="sr-only">Mapa dojazdu – {address}. </span>
        Mapa: <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">© OpenStreetMap</a>
      </p>

      <a className="btn btn--solid pmap__go" href={mapsUrl} target="_blank" rel="noopener">
        <Icon name="pin" size={16} /> Prowadź do nas
      </a>
    </div>
  );
}
