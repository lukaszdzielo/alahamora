import { preload } from 'react-dom';
import images from '@/data/images.json';

// Zdjęcie z gotowymi rozmiarami (scripts/images.mjs): <picture> z AVIF i WebP w kilku szerokościach,
// przeglądarka sama wybiera format i rozmiar na podstawie `sizes`.
// Zastępuje next/image, który przy eksporcie statycznym (images.unoptimized) nie robi srcset.
// Interfejs jak w next/image: src = import zdjęcia, fill, sizes, priority, className, style.

const BASE = process.env.NEXT_PUBLIC_BASE_PATH || '';

// adres z importu: /_next/static/media/<nazwa>.<hash>.<ext> → <nazwa>
const nameOf = (src) => (typeof src === 'string' ? src : src.src).split('/').pop().replace(/\.[^.]+\.[^.]+$/, '');

const url = (name, w, fmt) => `${BASE}/_img/${name}-${w}.${fmt}`;
const srcSet = (name, widths, fmt) => widths.map((w) => `${url(name, w, fmt)} ${w}w`).join(', ');

const FILL = { position: 'absolute', inset: 0, width: '100%', height: '100%' };

export default function Picture({ src, alt = '', sizes = '100vw', fill = false, priority = false, className, style, ...rest }) {
  const name = nameOf(src);
  const info = images[name];

  // zdjęcie spoza listy (np. nowe, a skrypt jeszcze nie przeszedł) – zwykły <img> z oryginału
  if (!info) {
    return (
      <img
        src={typeof src === 'string' ? src : src.src}
        alt={alt}
        className={className}
        style={fill ? { ...FILL, ...style } : style}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        {...rest}
      />
    );
  }

  const { w, h, widths } = info;
  // domyślny src: wariant ok. 800 px (albo największy, jeśli zdjęcie jest mniejsze)
  const fallback = widths.find((x) => x >= 800) ?? widths[widths.length - 1];
  const avif = srcSet(name, widths, 'avif');

  if (priority) {
    preload(url(name, fallback, 'avif'), { as: 'image', type: 'image/avif', imageSrcSet: avif, imageSizes: sizes, fetchPriority: 'high' });
  }

  return (
    <picture>
      <source type="image/avif" srcSet={avif} sizes={sizes} />
      <img
        src={url(name, fallback, 'webp')}
        srcSet={srcSet(name, widths, 'webp')}
        sizes={sizes}
        width={fill ? undefined : w}
        height={fill ? undefined : h}
        alt={alt}
        className={className}
        style={fill ? { ...FILL, ...style } : style}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : undefined}
        decoding={priority ? 'sync' : 'async'}
        {...rest}
      />
    </picture>
  );
}
