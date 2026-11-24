'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

const STORAGE_KEY = 'alahamora:city';

// Link do lokalu, który zapamiętuje wybór w localStorage
// i pokazuje znaczek „Ostatnio wybrane” przy drzwiach wybranych poprzednio.
export default function DoorLink({ slug, className, children }) {
  const [isLast, setIsLast] = useState(false);

  // localStorage istnieje tylko w przeglądarce – czytamy go dopiero po zamontowaniu.
  useEffect(() => {
    try {
      setIsLast(localStorage.getItem(STORAGE_KEY) === slug);
    } catch {
      // np. tryb prywatny z zablokowanym storage – po prostu nic nie pokazujemy
    }
  }, [slug]);

  const remember = () => {
    try {
      localStorage.setItem(STORAGE_KEY, slug);
    } catch {}
  };

  return (
    <Link href={`/${slug}/`} className={className} onClick={remember} data-last={isLast || undefined}>
      {children}
      {isLast && <span className="door__badge">Ostatnio wybrane</span>}
    </Link>
  );
}
