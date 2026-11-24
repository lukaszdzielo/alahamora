'use client';

import { useEffect } from 'react';

// Elementy z atrybutem data-appear pojawiają się RAZ, gdy wjadą w ekran, i zostają.
// IntersectionObserver zamiast nasłuchiwania scrolla – przeglądarka sama mówi, co jest widoczne.
export default function AppearController() {
  useEffect(() => {
    const items = Array.from(document.querySelectorAll('[data-appear]'));
    if (!('IntersectionObserver' in window)) {
      items.forEach((el) => el.setAttribute('data-appear', 'in'));
      return;
    }

    // drobne opóźnienie dla kolejnych elementów w tym samym rodzicu („fala”)
    items.forEach((el) => {
      const siblings = Array.from(el.parentElement?.children ?? []).filter((n) => n.hasAttribute('data-appear'));
      el.style.setProperty('--appear-delay', `${Math.min(siblings.indexOf(el), 6) * 0.1}s`);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute('data-appear', 'in');
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -12% 0px' },
    );
    items.forEach((el) => observer.observe(el));
    document.documentElement.classList.add('appear-ready');

    return () => observer.disconnect();
  }, []);

  return null;
}
