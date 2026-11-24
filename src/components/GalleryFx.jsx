import { mulberry32 } from '@/lib/random';

// Drobna magia na zdjęciach w galerii (jak na płótnie):
//   flicker – migoczące światło lamp, punkty [x %, y %, średnica % szerokości zdjęcia]
//   twinkle – gwiazdki / światełka (liczba = ziarno losowania)
//   dust    – unoszące się drobinki kurzu (ziarno)
//   gleam   – błysk przesuwający się po zdjęciu (mosiądz, porcelana)
//   flash   – co jakiś czas błysk flesza (kącik do zdjęć)
//   hue     – zdjęcie powoli zmienia barwę (eliksiry) – klasa na <img>, patrz Gallery.jsx
//
// Warstwa .gfx ma proporcje ZDJĘCIA i jest „dopasowana jak object-fit: cover”,
// więc punkty w % zdjęcia trafiają w lampy przy każdym kadrze ramy.
export default function GalleryFx({ fx, ratio }) {
  if (!fx) return null;
  const out = [];

  fx.flicker?.forEach(([x, y, d], j) => {
    out.push(
      <span key={`f${j}`} className="gfx__flick" style={{ left: `${x}%`, top: `${y}%`, width: `${d}%`, animationDelay: `-${(j * 0.9).toFixed(1)}s` }} />,
    );
  });

  if (fx.twinkle) {
    const rnd = mulberry32(fx.twinkle);
    for (let j = 0; j < 12; j += 1) {
      out.push(
        <span
          key={`t${j}`}
          className="gfx__dot"
          style={{
            left: `${(6 + rnd() * 88).toFixed(1)}%`,
            top: `${(6 + rnd() * 84).toFixed(1)}%`,
            animationDelay: `-${(rnd() * 4).toFixed(1)}s`,
            animationDuration: `${(2.2 + rnd() * 2.3).toFixed(1)}s`,
          }}
        />,
      );
    }
  }

  if (fx.dust) {
    const rnd = mulberry32(fx.dust * 7);
    for (let j = 0; j < 8; j += 1) {
      out.push(
        <span
          key={`d${j}`}
          className="gfx__mote"
          style={{
            left: `${(8 + rnd() * 84).toFixed(1)}%`,
            animationDelay: `-${(rnd() * 12).toFixed(1)}s`,
            animationDuration: `${(10 + rnd() * 6).toFixed(1)}s`,
          }}
        />,
      );
    }
  }

  if (fx.gleam) out.push(<span key="g" className="gfx__gleam" />);
  if (fx.flash) out.push(<span key="fl" className="gfx__flash" />);

  if (!out.length) return null;
  return (
    <span className="gfx" style={{ '--ar': ratio }} aria-hidden="true">
      {out}
    </span>
  );
}
