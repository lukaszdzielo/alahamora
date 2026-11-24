'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Link do lokalu z animacją „wejścia w obraz” (View Transitions API).
// Rama (z zdjęciem) i zdjęcie hero mają tę samą nazwę przejścia 'hero-photo':
// przeglądarka powiększa ramę do rozmiaru hero, rama się rozpływa, a zdjęcie
// w trakcie ruchu płynnie zmienia kadr (object-fit: cover) z pionowego na panoramiczny.
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

    event.preventDefault();
    const frame = event.currentTarget.querySelector('.door__frame');

    // kadr zdjęcia w trakcie przejścia – taki sam jak w ramie i w hero
    document.documentElement.style.setProperty('--vt-pos', position);
    frame.style.viewTransitionName = 'hero-photo';

    const transition = document.startViewTransition(async () => {
      router.push(href);
      await waitForHero(slug); // „zdjęcie” nowego stanu robimy, gdy hero jest już na stronie
    });

    transition.finished.finally(() => {
      frame.style.viewTransitionName = '';
    });
  };

  return (
    <Link href={href} className={className} onClick={handleClick} aria-label={label}>
      {children}
    </Link>
  );
}
