// Zestaw ikon liniowych (24×24, kolor = currentColor).
const PATHS = {
  clock: <><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></>,
  pin: <><path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0C18.5 15.4 12 21 12 21Z" /><circle cx="12" cy="10" r="2.3" /></>,
  phone: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />,
  school: <><path d="M2.5 9 12 4.5 21.5 9 12 13.5Z" /><path d="M6.5 11v5c0 1.6 2.5 3 5.5 3s5.5-1.4 5.5-3v-5" /><path d="M21.5 9v6" /></>,
  door: <><path d="M6 21V8a6 6 0 0 1 12 0v13" /><path d="M3 21h18" /><circle cx="14.5" cy="14" r=".9" /></>,
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  arrowLeft: <path d="M19 12H5M11 6l-6 6 6 6" />,
  cal: <><rect x="3.5" y="5" width="17" height="15" rx="2" /><path d="M3.5 10h17M8 3v4M16 3v4" /></>,
  star: <path d="M12 2.5l2 7.5 7.5 2-7.5 2-2 7.5-2-7.5-7.5-2 7.5-2z" />,
  chevron: <path d="m6 9 6 6 6-6" />,
};

export default function Icon({ name, size = 18, stroke = 1.7, className }) {
  return (
    <svg
      className={className}
      aria-hidden="true"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ flex: 'none' }}
    >
      {PATHS[name]}
    </svg>
  );
}
