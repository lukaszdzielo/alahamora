import Icon from './Icon';

// Ozdobnik nad nagłówkami sekcji: linia – gwiazdka – linia.
export default function Ornament({ center = false }) {
  return (
    <span className={`ornament${center ? ' ornament--center' : ''}`} aria-hidden="true">
      <span className="ornament__line" />
      <span className="twinkle">
        <Icon name="star" size={15} stroke={1.4} />
      </span>
      <span className="ornament__line ornament__line--right" />
    </span>
  );
}
