import Ornament from './Ornament';
import Lamp from './Lamp';

// Nagłówek sekcji: ozdobnik albo latarnia (Katowice), tytuł i opis.
// lamp: false | 'side' | 'side-short' | 'center'
export default function SectionHead({ id, title, lead, lamp = false, center = false, children }) {
  const side = lamp === 'side' || lamp === 'side-short';

  return (
    <div className={`section-head${side ? ' section-head--lamp' : ''}${center ? ' section-head--center' : ''}`}>
      {lamp === 'center' && (
        <div className="lamp-center">
          <Lamp id={id} center short />
        </div>
      )}
      {side && <Lamp id={id} short={lamp === 'side-short'} />}
      {!lamp && <Ornament center={center} />}
      <h2 data-appear="">{title}</h2>
      {lead && <p data-appear="">{lead}</p>}
      {children}
    </div>
  );
}
