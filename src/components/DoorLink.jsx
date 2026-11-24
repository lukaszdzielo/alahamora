'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Link do lokalu z animacją „wejścia w obraz”.
//
// 1) Na żywej stronie (Web Animations API) cała rama przybliża się do nas: rośnie i jedzie
//    na środek, aż jej szkło przykryje cały ekran; łuk szkła się prostuje, ściana gaśnie.
// 2) Jednocześnie zdjęcie w szkle zmienia skalę i położenie tak, że NA KOŃCU leży dokładnie
//    tak samo jak zdjęcie w hero (te same piksele w tym samym miejscu ekranu).
//    Gradienty hero leżą od razu w docelowym miejscu (.enter-shade) i tylko się rozjaśniają.
// 3) Dopiero wtedy przechodzimy na stronę miasta – krótkie przenikanie (View Transitions)
//    jest niewidoczne, bo obraz przed i po jest identyczny; potem wchodzą teksty.
//
// Brak wsparcia albo „ogranicz ruch” w systemie = zwykłe przejście (Link działa normalnie).

const ZOOM_MS = 1100;
const EASE = 'cubic-bezier(.55, 0, .3, 1)';

// W trakcie przejścia View Transition przeglądarka wstrzymuje rysowanie (rAF nie działa),
// dlatego na hero czekamy przez MutationObserver + setTimeout.
function waitForHero(slug, timeout = 1500) {
  return new Promise((resolve) => {
    const found = () => document.querySelector(`[data-hero="${slug}"]`);
    if (found()) return resolve();
    const observer = new MutationObserver(() => {
      if (found()) done();
    });
    const timer = setTimeout(done, timeout);
    function done() {
      observer.disconnect();
      clearTimeout(timer);
      resolve();
    }
    observer.observe(document.body, { childList: true, subtree: true });
  });
}

// prostokąt, jaki zajmuje zdjęcie przy object-fit: cover w pudełku w × h
function coverRect(iw, ih, w, h, px, py) {
  const s = Math.max(w / iw, h / ih);
  const pw = iw * s;
  const ph = ih * s;
  return { x: (w - pw) * px, y: (h - ph) * py, w: pw, h: ph };
}

export default function DoorLink({ slug, position = '50% 50%', className, label, children }) {
  const router = useRouter();
  const href = `/${slug}/`;

  const handleClick = (event) => {
    const canAnimate =
      typeof document !== 'undefined' &&
      'startViewTransition' in document &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // nowa karta, Ctrl/Cmd+klik itp. – zostawiamy przeglądarce
    if (!canAnimate || event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;

    const link = event.currentTarget;
    const frame = link.querySelector('.door__frame');
    const glass = link.querySelector('.door__glass');
    const img = glass?.querySelector('img');
    if (!frame || !img || !img.naturalWidth) return; // zdjęcie jeszcze się nie wczytało – zwykłe przejście

    event.preventDefault();
    if (link.dataset.opening !== undefined) return;
    link.dataset.opening = '';

    const root = document.documentElement;
    // szerokość strony bez paska przewijania: przy scrollbar-gutter: stable Chrome podaje
    // w root.clientWidth pełną szerokość okna, a hero ma szerokość .page (o pasek węższą)
    // – stąd było ok. 9 px przeskoku zdjęcia w bok po wejściu na stronę miasta
    const vw = link.closest('.page')?.clientWidth || document.body.clientWidth || root.clientWidth;
    const vh = window.innerHeight;
    const heroH = parseFloat(getComputedStyle(root).getPropertyValue('--hero-h')) || 820;
    const [px, py] = position.split(' ').map((v) => parseFloat(v) / 100);
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;

    const f = frame.getBoundingClientRect();
    const g = glass.getBoundingClientRect();
    const gw = glass.clientWidth;
    const gh = glass.clientHeight;

    // --- 1) rama: skala, przy której szkło przykryje ekran, i przesunięcie środka szkła na środek ekranu
    const s = Math.max(vw / gw, vh / gh) * 1.02;
    const gcx = g.left + g.width / 2;
    const gcy = g.top + g.height / 2;
    const originX = gcx - f.left;
    const originY = gcy - f.top;
    frame.style.transformOrigin = `${originX}px ${originY}px`;
    // lewy górny róg szkła na końcu animacji (w px ekranu)
    const ax = vw / 2 - (s * gw) / 2;
    const ay = vh / 2 - (s * gh) / 2;

    // --- 2) zdjęcie: z kadru w ramie do kadru hero
    const door = coverRect(iw, ih, gw, gh, px, py); // teraz (we współrzędnych szkła)
    const hero = coverRect(iw, ih, vw, heroH, px, py); // w hero (we współrzędnych ekranu)
    // object-fit: cover przycina zdjęcie do pudełka <img>, więc najpierw ustawiamy <img>
    // na pełny rozmiar zdjęcia (wygląda identycznie – resztę przycina szkło z overflow: hidden)
    Object.assign(img.style, {
      inset: 'auto',
      left: `${door.x}px`,
      top: `${door.y}px`,
      width: `${door.w}px`,
      height: `${door.h}px`,
      objectFit: 'fill',
    });
    const k = hero.w / s / door.w;
    const tx = (hero.x - ax) / s - door.x;
    const ty = (hero.y - ay) / s - door.y;

    // Gradienty hero NIE są częścią powiększanej ramy – leżą od razu w docelowym miejscu
    // (cały ekran, jak na stronie miasta) i tylko zmieniają przezroczystość.
    const shade = document.createElement('div');
    shade.className = 'enter-shade';
    shade.dataset.city = link.closest('[data-city]')?.dataset.city ?? '';
    document.body.appendChild(shade);

    const opts = { duration: ZOOM_MS, easing: EASE, fill: 'forwards' };
    const animations = [
      frame.animate([{ transform: 'none' }, { transform: `translate(${vw / 2 - gcx}px, ${vh / 2 - gcy}px) scale(${s})` }], opts),
      img.animate([{ transform: 'none' }, { transform: `translate(${tx}px, ${ty}px) scale(${k})` }], opts),
      glass.animate([{ borderRadius: getComputedStyle(glass).borderRadius }, { borderRadius: '0px' }], opts),
    ];
    animations.push(shade.animate([{ opacity: 0 }, { opacity: 0, offset: 0.45 }, { opacity: 1 }], opts));

    // ściana, logo i druga rama lekko się przybliżają i gasną
    const picker = link.closest('.picker');
    picker?.querySelectorAll(':scope > .bricks, :scope > .picker__logo, .picker__doors > li').forEach((el) => {
      if (el.contains(link)) return;
      el.style.transformOrigin = `${gcx}px ${gcy}px`;
      el.animate([{ opacity: 1, transform: 'none' }, { opacity: 0, transform: 'scale(1.2)' }], { ...opts, duration: ZOOM_MS * 0.8 });
    });

    // --- 3) gdy obraz w ramie = hero, przechodzimy na stronę miasta
    Promise.all(animations.map((a) => a.finished)).then(() => {
      root.dataset.entering = '';
      const transition = document.startViewTransition(async () => {
        router.push(href);
        await waitForHero(slug);
      });
      transition.finished.finally(() => {
        shade.remove();
        setTimeout(() => delete root.dataset.entering, 2000);
      });
    });
  };

  return (
    <Link href={href} className={className} onClick={handleClick} aria-label={label}>
      {children}
    </Link>
  );
}
