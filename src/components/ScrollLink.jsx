'use client';

import scrollToId from '@/lib/scrollToId';

// Link do sekcji na tej samej stronie (href="#menu"), przewijany płynnie w JS.
export default function ScrollLink({ href, onClick, children, ...props }) {
  const handleClick = (event) => {
    onClick?.(event);
    if (event.defaultPrevented || !href?.startsWith('#')) return;
    if (scrollToId(href.slice(1))) event.preventDefault();
  };

  return (
    <a href={href} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}
