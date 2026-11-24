'use client';

// Komponent kliencki: potrzebuje przeglądarki (mysz, requestAnimationFrame),
// dlatego ma na górze 'use client'. Reszta strony to komponenty serwerowe.
import useWandCursor from '@/hooks/useWandCursor';

export default function WandCursor() {
  const wandRef = useWandCursor();

  return (
    <div ref={wandRef} className="wand" data-visible="false" aria-hidden="true">
      <span className="wand__stick" />
      <span className="wand__tip" />
    </div>
  );
}
