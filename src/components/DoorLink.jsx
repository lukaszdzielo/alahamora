'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Link do lokalu z animacją „wejścia w obraz” (View Transitions API).
// Cała rama (z obramowaniem i zdjęciem) przybliża się do nas: rośnie i przesuwa się na środek hero,
// aż szkło ramy wypełni ekran; ściana za nią lekko się przybliża i gaśnie.
// Pod koniec przez powiększony obraz przenika już prawdziwe hero, a potem po kolei pojawiają się teksty.
// Brak wsparcia albo „ogranicz ruch” w systemie = zwykłe przejście (Link działa normalnie).

// Uwaga: w trakcie przejścia przeglądarka wstrzymuje rysowanie strony,
// więc requestAnimationFrame nie działa – sprawdzamy DOM przez MutationObserver + setTimeout.
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

export default function DoorLink({ slug, className, label, children }) {
  const router = useRouter();
  const href = `/${slug}/`;

  const handleClick = (event) => {
    const canAnimate =
      typeof document !== 'undefined' &&
      'startViewTransition' in document &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // nowa karta, Ctrl/Cmd+klik itp. – zostawiamy przeglądarce
    if (!canAnimate || event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;

    event.preventDefault();
    const frame = event.currentTarget.querySelector('.door__frame');
    const glass = frame.querySelector('.door__glass');
    const f = frame.getBoundingClientRect();
    const g = glass.getBoundingClientRect();
    const root = document.documentElement;
    const heroHeight = parseFloat(getComputedStyle(root).getPropertyValue('--hero-h')) || 820;
    const vw = window.innerWidth;
    const vh = Math.min(window.innerHeight, heroHeight);

    // o ile powiększyć ramę, żeby szkło przykryło widoczną część hero (z małym zapasem)
    const scale = Math.max(vw / g.width, vh / g.height) * 1.08;
    // przesunięcie środka szkła na środek widocznej części hero
    const dx = vw / 2 - (g.left + g.width / 2);
    const dy = vh / 2 - (g.top + g.height / 2);
    // migawka ramy jest skalowana względem środka ramy – poprawka o różnicę środków ramy i szkła
    const ox = (g.left + g.width / 2) - (f.left + f.width / 2);
    const oy = (g.top + g.height / 2) - (f.top + f.height / 2);

    root.style.setProperty('--vt-scale', scale.toFixed(3));
    root.style.setProperty('--vt-dx', `${(dx - ox * (scale - 1)).toFixed(1)}px`);
    root.style.setProperty('--vt-dy', `${(dy - oy * (scale - 1)).toFixed(1)}px`);
    root.style.setProperty('--vt-origin', `${(g.left + g.width / 2).toFixed(0)}px ${(g.top + g.height / 2).toFixed(0)}px`);
    root.dataset.entering = '';

    frame.style.viewTransitionName = 'door-zoom';

    const transition = document.startViewTransition(async () => {
      router.push(href);
      await waitForHero(slug); // „zdjęcie” nowego stanu robimy, gdy hero jest już na stronie
    });

    transition.finished.finally(() => {
      frame.style.viewTransitionName = '';
      // teksty hero mają opóźnione wejście tylko po animacji – potem wracamy do normalnych opóźnień
      setTimeout(() => delete root.dataset.entering, 2500);
    });
  };

  return (
    <Link href={href} className={className} onClick={handleClick} aria-label={label}>
      {children}
    </Link>
  );
}
