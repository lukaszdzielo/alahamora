'use client';

import Image from 'next/image';
import { useId, useRef } from 'react';

// Zwierciadło: rama stoi w miejscu, a zdjęcie w środku lekko „pływa” za kursorem
// i przesuwa się po nim połysk. Zamiast stanu (useState) ustawiamy zmienne CSS przez ref –
// ruch myszy nie powoduje ponownego renderowania komponentu.
export default function MirrorCard({ item }) {
  const glassRef = useRef(null);
  const arcId = useId();

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
        {/* tytuł wygrawerowany na łuku ramy */}
        <svg className="mirror__arc" aria-hidden="true" viewBox="0 0 300 150">
          <defs>
            <path id={arcId} d="M 12,150 A 138,138 0 0 1 288,150" fill="none" />
          </defs>
          <text>
            <textPath href={`#${arcId}`} startOffset="50%" textAnchor="middle">
              {item.title}
            </textPath>
          </text>
        </svg>
        <div className="mirror__glass" ref={glassRef}>
          <Image className="mirror__img" src={item.img} alt="" fill sizes="(max-width: 700px) 80vw, 350px" />
          <span className="mirror__mist" aria-hidden="true" />
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
