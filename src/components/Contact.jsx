import Image from 'next/image';
import Link from 'next/link';
import Icon from './Icon';
import SectionHead from './SectionHead';
import ParchmentMap from './ParchmentMap';

export default function Contact({ city, lamps }) {
  const { contact } = city;
  const rows = [
    ['pin', 'Adres', city.address],
    ['clock', 'Godziny otwarcia', contact.hoursLong],
    ['phone', 'Telefon', <a key="t" href={`tel:${city.phone.replace(/\s/g, '')}`}>{city.phone}</a>],
    ['mail', 'E-mail', <a key="m" href={`mailto:${city.email}`}>{city.email}</a>],
  ];

  return (
    <section id="kontakt" className="contact">
      <div className="wrap contact__grid">
        <div className="contact__info">
          <SectionHead id="contact" title={contact.title} lead={contact.lead} lamp={lamps ? 'side' : false} />
          <ul className="contact__list">
            {rows.map(([icon, label, value]) => (
              <li key={label} data-appear="">
                <Icon name={icon} size={20} />
                <span>
                  <small>{label}</small>
                  {value}
                </span>
              </li>
            ))}
          </ul>
          <Link className="contact__other" href={`/${contact.other.slug}/`} data-appear="">
            <span className="contact__other-img">
              <Image src={contact.other.img} alt="" fill sizes="64px" />
            </span>
            <span>
              <strong>{contact.other.title}</strong>
              <span>{contact.other.text}</span>
            </span>
          </Link>
        </div>
        <div data-appear="">
          <ParchmentMap query={contact.mapQuery} mapsUrl={contact.mapsUrl} address={city.addressShort} />
        </div>
      </div>
    </section>
  );
}
