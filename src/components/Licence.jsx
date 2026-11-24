import key from '@/assets/svg/klucz.svg';

// Baner „Otwórz z nami Alahamorę” (licencja marki) – nad stopką, w obu miastach.
// Na obecnej stronie lokalu: menu Katowic → alahamora.pl/alahamora-licencja/.
// W podglądzie przycisk jest nieaktywny („Wkrótce”).
export default function Licence() {
  return (
    <section className="licence" aria-labelledby="licence-title">
      <div className="wrap">
        <div className="licence__card" data-appear="">
          {/* klucz ze skrzydłami z logo – maska CSS, kolor z motywu miasta */}
          <span className="licence__key" style={{ '--key': `url(${key.src})` }} aria-hidden="true" />
          <div>
            <span className="licence__kicker">Licencja Alahamora</span>
            <h2 id="licence-title">Marzysz o własnej magicznej kawiarni?</h2>
            <p>
              <em>Marka Alahamora daje się zapamiętać.</em> Otwórz z nami kolejne miejsce pełne czarów – w swoim mieście,
              z naszym wystrojem, menu i doświadczeniem.
            </p>
          </div>
          <a className="btn btn--solid" aria-disabled="true" title="Wkrótce">
            Otwórz z nami Alahamorę
          </a>
        </div>
      </div>
    </section>
  );
}
