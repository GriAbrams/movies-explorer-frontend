import { GITHUB_LINK, PRAKTIKUM_LINK, FACEBOOK_LINK } from '../../utils/contants';

import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <p className="footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</p>
        <div className="footer__wrapper">
          <p className="footer__copyright">© 2020</p>
          <ul className="footer__links">
            <li className="footer__item">
              <a className="footer__link" href={PRAKTIKUM_LINK} target="_blank" rel="noreferrer">Яндекс.Практикум</a>
            </li>
            <li className="footer__item">
              <a className="footer__link" href={GITHUB_LINK} target="_blank" rel="noreferrer">Github</a>
            </li>
            <li className="footer__item">
              <a className="footer__link" href={FACEBOOK_LINK} target="_blank" rel="noreferrer">Facebook</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer;