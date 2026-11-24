'use client';

import Image from 'next/image';
import { useRef } from 'react';

// Zwierciadło: rama stoi w miejscu, a zdjęcie w środku lekko „pływa” za kursorem
// i przesuwa się po nim połysk. Zamiast stanu (useState) ustawiamy zmienne CSS przez ref –
// ruch myszy nie powoduje ponownego renderowania komponentu.
// frost = numer kolejny lustra ze szronem (1, 2, 3…) – decyduje o opóźnieniu, żeby lustra
// nie zamarzały jednocześnie; brak = bez szronu.
export default function MirrorCard({ item, frost }) {
  const glassRef = useRef(null);

  const onMove = (event) => {
    const el = glassRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (event.clientX - r.left) / r.width; // 0..1
    const y = (event.clientY - r.top) / r.height;
    el.style.setProperty('--tx', `${(0.5 - x) * 5}%`);
    el.style.setProperty('--ty', `${(0.5 - y) * 5}%`);
    el.style.setProperty('--sx', `${x * 100}%`);
    el.style.setProperty('--sy', `${y * 100}%`);
    el.dataset.active = 'true';
  };

  const onLeave = () => {
    const el = glassRef.current;
    if (!el) return;
    el.style.setProperty('--tx', '0%');
    el.style.setProperty('--ty', '0%');
    el.dataset.active = 'false';
  };

  return (
    <article className="mirror" onPointerMove={onMove} onPointerLeave={onLeave}>
      <div className="mirror__frame">
        <div className="mirror__glass" ref={glassRef}>
          <Image className="mirror__img" src={item.img} alt="" fill sizes="(max-width: 700px) 80vw, 350px" />
          <span className="mirror__mist" aria-hidden="true" />
          {frost && (
            <>
              {/* szron: co ok. 12 s lustro na chwilę zachodzi mgiełką i lodowymi kryształkami */}
              <span className="mirror__frost mirror__frost--blur" style={{ animationDelay: `${(frost - 1) * 4}s` }} aria-hidden="true" />
              <svg className="mirror__frost" style={{ animationDelay: `${(frost - 1) * 4}s` }} aria-hidden="true" preserveAspectRatio="none">
                <filter id={`frost-${frost}`} x="0" y="0" width="100%" height="100%">
                  <feTurbulence type="fractalNoise" baseFrequency="0.02 0.045" numOctaves="4" seed={frost + 3} result="a" />
                  <feColorMatrix in="a" type="matrix" values="0 0 0 0 0.93  0 0 0 0 0.97  0 0 0 0 1  0 0 0 2.2 -0.9" result="haze" />
                  <feTurbulence type="turbulence" baseFrequency="0.9" numOctaves="2" seed={frost + 9} result="b" />
                  <feColorMatrix in="b" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 9 -6.2" result="ice" />
                  <feMerge>
                    <feMergeNode in="haze" />
                    <feMergeNode in="ice" />
                  </feMerge>
                </filter>
                <rect width="100%" height="100%" filter={`url(#frost-${frost})`} />
              </svg>
            </>
          )}
          <span className="mirror__sheen" aria-hidden="true" />
          <span className="mirror__shine" aria-hidden="true" />
        </div>
      </div>
      <div className="mirror__text">
        {item.adult && <span className="badge">18+</span>}
        <h3>{item.title}</h3>
        <p>{item.text}</p>
      </div>
    </article>
  );
}
