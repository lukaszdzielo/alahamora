import Icon from './Icon';

// Pasek z ogłoszeniem, który nachodzi na dół hero.
export default function Notice({ notice }) {
  const external = notice.button.href.startsWith('http');

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
        <a className="btn" href={notice.button.href} {...(external ? { target: '_blank', rel: 'noopener' } : {})}>
          {notice.button.label}
        </a>
      </aside>
    </div>
  );
}
