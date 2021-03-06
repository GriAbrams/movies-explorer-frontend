import './Promo.css';
import promoImg from '../../images/promo-img.svg';
import { HashLink } from 'react-router-hash-link';

function Promo() {
  return (
    <section className="promo">
      <div className="promo__container">
        <div className="promo__descr">
          <h1 className="promo__title">Учебный проект студента факультета Веб&#8209;разработки.</h1>
          <p className="promo__subtitle">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
          <HashLink to='#project' className="promo__link">Узнать больше</HashLink>
        </div> 
        <img className="promo__img" src={promoImg} alt="Планета веб-разработчика" />
      </div>
    </section>
  )
}

export default Promo;