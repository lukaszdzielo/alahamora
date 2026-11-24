'use client';

import { useEffect, useState } from 'react';
import Icon from './Icon';
import { scrollToTop } from '@/lib/scrollToId';

// Przycisk „do góry” – pojawia się po przewinięciu za hero, w prawym dolnym rogu.
export default function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const check = () => setShow(window.scrollY > Math.max(600, window.innerHeight * 0.9));
    check();
    window.addEventListener('scroll', check, { passive: true });
    return () => window.removeEventListener('scroll', check);
  }, []);

  return (
    <button
      type="button"
      className="to-top"
      data-show={show ? 'true' : undefined}
      aria-label="Wróć na górę strony"
      tabIndex={show ? 0 : -1}
      onClick={scrollToTop}
    >
      <Icon name="arrowUp" size={20} stroke={1.6} />
    </button>
  );
}
