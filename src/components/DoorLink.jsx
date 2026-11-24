'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Link do lokalu z animacją „wejścia w obraz” (View Transitions API).
// Hero ma już ten sam kadr co „okno” w ramie, więc nie przenikamy dwóch zdjęć,
// tylko odsłaniamy hero: wycinek (clip-path) rośnie od prostokąta ramy do całego ekranu.
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

    // Prostokąt „okna” w ramie – od niego zaczyna się odsłanianie hero.
    const glass = event.currentTarget.querySelector('.door__glass');
    const rect = glass.getBoundingClientRect();
    const heroHeight = Math.max(window.innerHeight, 560); // = .hero { min-height }
    const root = document.documentElement.style;
    root.setProperty('--vt-top', `${rect.top}px`);
    root.setProperty('--vt-left', `${rect.left}px`);
    root.setProperty('--vt-right', `${window.innerWidth - rect.right}px`);
    root.setProperty('--vt-bottom', `${heroHeight - rect.bottom}px`);

    // nazwa przejścia tylko na klikniętej ramie (w hero jest ta sama: 'hero-photo')
    glass.style.viewTransitionName = 'hero-photo';

    const transition = document.startViewTransition(async () => {
      router.push(href);
      await waitForHero(slug); // „zdjęcie” nowego stanu robimy, gdy hero jest już na stronie
    });

    transition.finished.finally(() => {
      glass.style.viewTransitionName = '';
    });
  };

  return (
    <Link href={href} className={className} onClick={handleClick} aria-label={label}>
      {children}
    </Link>
  );
}
