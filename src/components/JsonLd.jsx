// Dane strukturalne (schema.org) dla Google: wstawiamy jako <script type="application/ld+json">.
// Zamiana „<” chroni przed przypadkowym zamknięciem tagu <script> przez treść danych.
export default function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}
