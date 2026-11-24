// Chmury na styku sekcji: dwie warstwy przesuwają się powoli w lewo w nieskończonej pętli.
//
// Każda warstwa to gotowa tekstura (src/assets/img/chmury, 1760×440 px), która jest
// okresowa w poziomie – lewa krawędź idealnie przechodzi w prawą (szum wygenerowany przez
// FFT, skrypt canvas/gen_chmury.py). Tekstura powtarza się jako tło jednego elementu,
// więc nie ma żadnego łączenia ani szczeliny między kaflami.
// (Wcześniej: dwa kafle SVG z feTurbulence obok siebie – w Safari i przy ułamkowych
// pikselach było widać miejsce styku.)
export default function Clouds() {
  return (
    <div className="clouds" aria-hidden="true">
      <div className="clouds__track clouds__track--a" />
      <div className="clouds__track clouds__track--b" />
    </div>
  );
}
