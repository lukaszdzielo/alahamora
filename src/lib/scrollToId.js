// Płynne przewijanie do sekcji w JS (bez CSS scroll-behavior: smooth).
// Animacja requestAnimationFrame z łagodnym przyspieszeniem i hamowaniem;
// przy „ogranicz ruch” w systemie – skok bez animacji.

const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

let frame = 0;

export default function scrollToId(id, { offset = 0 } = {}) {
  const target = document.getElementById(id);
  if (!target) return false;

  const startY = window.scrollY;
  const endY = Math.max(0, target.getBoundingClientRect().top + startY - offset);
  const distance = endY - startY;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const finish = () => {
    // dostępność: przenosimy fokus do sekcji (bez ponownego przewijania)
    if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
    history.replaceState(null, '', `#${id}`);
  };

  cancelAnimationFrame(frame);
  if (reduce || Math.abs(distance) < 2) {
    window.scrollTo(0, endY);
    finish();
    return true;
  }

  // czas zależny od odległości: 500–1200 ms
  const duration = Math.min(1200, Math.max(500, Math.abs(distance) * 0.35));
  const t0 = performance.now();

  // przerwij animację, gdy użytkownik sam zacznie przewijać
  const cancel = () => cancelAnimationFrame(frame);
  window.addEventListener('wheel', cancel, { passive: true, once: true });
  window.addEventListener('touchstart', cancel, { passive: true, once: true });

  const step = (now) => {
    const t = Math.min(1, (now - t0) / duration);
    window.scrollTo(0, startY + distance * easeInOutCubic(t));
    if (t < 1) frame = requestAnimationFrame(step);
    else {
      window.removeEventListener('wheel', cancel);
      window.removeEventListener('touchstart', cancel);
      finish();
    }
  };
  frame = requestAnimationFrame(step);
  return true;
}
