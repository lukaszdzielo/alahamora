// Zestaw ikon liniowych (24×24, kolor = currentColor).
const PATHS = {
  clock: <><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></>,
  pin: <><path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0C18.5 15.4 12 21 12 21Z" /><circle cx="12" cy="10" r="2.3" /></>,
  phone: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />,
  school: <><path d="M2.5 9 12 4.5 21.5 9 12 13.5Z" /><path d="M6.5 11v5c0 1.6 2.5 3 5.5 3s5.5-1.4 5.5-3v-5" /><path d="M21.5 9v6" /></>,
  door: <><path d="M6 21V8a6 6 0 0 1 12 0v13" /><path d="M3 21h18" /><circle cx="14.5" cy="14" r=".9" /></>,
  // drzwi ze strzałką „wyjdź” – powrót do ekranu wyboru lokalu
  doorExit: <><path d="M14 21V8a5 5 0 0 0-10 0v13" /><path d="M2 21h13" /><circle cx="11" cy="14" r=".9" /><path d="M22 12h-6M18.5 9 16 12l2.5 3" /></>,
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  arrowLeft: <path d="M19 12H5M11 6l-6 6 6 6" />,
  arrowUp: <path d="M12 19V5M6 11l6-6 6 6" />,
  cal: <><rect x="3.5" y="5" width="17" height="15" rx="2" /><path d="M3.5 10h17M8 3v4M16 3v4" /></>,
  star: <path d="M12 2.5l2 7.5 7.5 2-7.5 2-2 7.5-2-7.5-7.5-2 7.5-2z" />,
  chevron: <path d="m6 9 6 6 6-6" />,
  mail: <><rect x="3" y="5.5" width="18" height="13" rx="2" /><path d="m3.5 7 8.5 6 8.5-6" /></>,
  ice: <><ellipse cx="12" cy="16.5" rx="9" ry="3" /><path d="M5 15c1-3 2.5-5 7-5s6 2 7 5" /><path d="M7 14.5c1.2-1.5 2.4-2.2 3.8-1.5 1.2.7 2.4.7 3.4-.3 1.1-.8 2.3-.4 3.3 1.1" /><circle cx="12" cy="7" r="1.6" /></>,
  cake: <><path d="M4 20v-7h16v7" /><path d="M2.5 20h19" /><path d="M4 15.5c2 1.5 4 1.5 6 0s4-1.5 6 0 3 1 4 0" /><path d="M8 13v-3M12 13v-3M16 13v-3" /></>,
  group: <><circle cx="8.5" cy="8" r="3" /><circle cx="16.5" cy="9" r="2.5" /><path d="M2.5 20c.5-3.5 3-5.5 6-5.5s5.5 2 6 5.5" /><path d="M14 15c1-.5 1.8-.8 2.5-.8 2.5 0 4.5 1.8 5 4.8" /></>,
  wand: <><path d="M4 20 15 9" /><path d="M17 3l.9 2.1L20 6l-2.1.9L17 9l-.9-2.1L14 6l2.1-.9z" /><path d="M20 12l.5 1 1 .5-1 .5-.5 1-.5-1-1-.5 1-.5z" /></>,
  gift: <><rect x="3.5" y="9" width="17" height="4" rx=".8" /><path d="M5 13v7h14v-7M12 9v11" /><path d="M12 9c-2 0-4.5-.5-4.5-2.5 0-1.5 1.5-2 2.5-1.5S12 7.5 12 9Zm0 0c2 0 4.5-.5 4.5-2.5 0-1.5-1.5-2-2.5-1.5S12 7.5 12 9Z" /></>,
  paper: <><path d="M4.5 4h13v16h-11a2 2 0 0 1-2-2Z" /><path d="M17.5 7h2v11a2 2 0 0 1-2 2" /><path d="M7 7.5h8M7 10.5h8M7 13.5h5" /></>,
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
