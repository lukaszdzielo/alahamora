'use client';

// Komponent kliencki: potrzebuje przeglądarki (mysz, requestAnimationFrame),
// dlatego ma na górze 'use client'. Reszta strony to komponenty serwerowe.
import useWandCursor from '@/hooks/useWandCursor';

export default function WandCursor() {
  const { wandRef, tiltRef, glowRef, sparksRef } = useWandCursor();

  return (
    <>
      {/* światło Lumos wokół czubka różdżki */}
      <div ref={glowRef} className="wand-glow" data-visible="false" aria-hidden="true" />
      {/* opyłki sypiące się z różdżki */}
      <div ref={sparksRef} className="wand-sparks" aria-hidden="true" />
      <div ref={wandRef} className="wand" data-visible="false" aria-hidden="true">
        <div ref={tiltRef} className="wand__tilt">
          <span className="wand__stick" />
          <span className="wand__tip" />
        </div>
      </div>
    </>
  );
}
