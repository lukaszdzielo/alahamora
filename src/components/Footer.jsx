import Logo from './Logo';
import { social } from '@/data/cities';

const icons = {
  facebook: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
      <path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.6-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H7.9v3h2.6V21Z" />
    </svg>
  ),
  instagram: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  ),
  tiktok: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
      <path d="M16.6 3c.3 2.2 1.6 3.6 3.9 3.8v2.7c-1.4.1-2.6-.3-3.9-1.1v5.3c0 6.4-7 8.4-9.8 3.8-1.8-3-.7-8.2 5.1-8.4v2.8c-.5.1-.9.2-1.3.3-1.3.4-2 1.3-1.8 2.7.4 2.7 5.3 3.5 4.9-1.8V3Z" />
    </svg>
  ),
};

const labels = { facebook: 'Facebook', instagram: 'Instagram', tiktok: 'TikTok' };

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__castle" aria-hidden="true" />
      <div className="wrap footer__top">
        <a href="#" className="footer__logo" aria-label="Alahamora – strona główna">
          <Logo />
        </a>
        <ul className="footer__social">
          {Object.entries(social).map(([key, href]) => (
            <li key={key}>
              <a href={href} target="_blank" rel="noopener" aria-label={labels[key]}>
                {icons[key]}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="wrap footer__bottom">
        <p className="footer__legal">
          <span>© {new Date().getFullYear()} Alahamora. Wszelkie prawa zastrzeżone.</span>
          <a href="#">Polityka prywatności</a>
          <a href="#">Regulamin</a>
        </p>
        <p>
          Realizacja:{' '}
          <a className="footer__credit" href="https://github.com/lukaszdzielo" target="_blank" rel="noopener">
            LD
          </a>
        </p>
      </div>
    </footer>
  );
}
