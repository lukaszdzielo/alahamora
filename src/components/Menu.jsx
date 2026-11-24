import Image from 'next/image';
import Icon from './Icon';
import Clouds from './Clouds';
import SectionHead from './SectionHead';

// „Z magicznej karty” – dwa układy z danych:
// 'arches' (Katowice): cztery łuki ze zdjęciami potraw,
// 'list'   (Gliwice):  duże zdjęcie + lista z okrągłymi miniaturami.
export default function Menu({ menu, lamps }) {
  const button = (
    <a className="btn" {...(menu.menuUrl && menu.menuUrl !== '#' ? { href: menu.menuUrl } : { 'aria-disabled': 'true', title: 'Wkrótce' })}>
      Całe menu
    </a>
  );

  if (menu.layout === 'arches') {
    return (
      <section id="menu" className="menu menu--arches">
        <Clouds id="menu-clouds" />
        <div className="wrap menu__inner">
          <SectionHead id="menu" title={menu.title} lead={menu.lead} lamp={lamps ? 'center' : false} center />
          <div className="dishes">
            {menu.items.map((item) => (
              <article key={item.title} className="dish" data-appear="">
                <div className="dish__arch">
                  {item.img ? (
                    <Image src={item.img} alt={item.title} fill sizes="(max-width: 700px) 90vw, 280px" />
                  ) : (
                    <span className="dish__icon"><Icon name={item.icon} size={96} stroke={1.1} /></span>
                  )}
                  <h3>{item.title}</h3>
                </div>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
          <div className="menu__more">{button}</div>
        </div>
      </section>
    );
  }

  return (
    <section id="menu" className="menu menu--list">
      <Clouds id="menu-clouds" />
      <div className="wrap menu__grid">
        <div className="menu__photo" data-appear="">
          <Image src={menu.image} alt={menu.imageAlt || ''} fill sizes="(max-width: 900px) 90vw, 560px" />
        </div>
        <div className="menu__col">
          <SectionHead id="menu" title={menu.title} lead={menu.lead} lamp={lamps ? 'side-short' : false} />
          <ul className="menu__list">
            {menu.items.map((item) => (
              <li key={item.title} data-appear="">
                <span className="menu__thumb">
                  {item.img ? (
                    <Image src={item.img} alt="" fill sizes="100px" />
                  ) : (
                    <Icon name={item.icon} size={50} stroke={1.3} />
                  )}
                </span>
                <span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </span>
              </li>
            ))}
          </ul>
          <div>{button}</div>
        </div>
      </div>
    </section>
  );
}
