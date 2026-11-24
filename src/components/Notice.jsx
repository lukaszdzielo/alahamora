import Icon from './Icon';
import ScrollLink from './ScrollLink';

// Pasek z ogłoszeniem, który nachodzi na dół hero.
// Przycisk: kotwica (#oferta) – płynne przewijanie; link do rezerwacji – na razie nieaktywny.
export default function Notice({ notice }) {
  const { href, label } = notice.button;

  return (
    <div className="wrap notice-wrap">
      <aside className="notice">
        <span className="notice__icon flicker">
          <Icon name={notice.icon} size={24} />
        </span>
        <div className="notice__body">
          <strong>{notice.title}</strong>
          <span>{notice.text}</span>
        </div>
        {href.startsWith('#') ? (
          <ScrollLink className="btn" href={href}>
            {label}
          </ScrollLink>
        ) : (
          <a className="btn" aria-disabled="true" title="Wkrótce">
            {label}
          </a>
        )}
      </aside>
    </div>
  );
}
