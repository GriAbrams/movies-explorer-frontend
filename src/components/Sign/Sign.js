import './Sign.css';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';

function Sign({ title, name, buttonText, children }) {
  return (
    <div className="sign">
      <div className="sign__container">
        <Link exact to='/'>
          <img className="sign__logo" src ={logo} alt="Логотип диплома" />
        </Link>
        <h2 className="sign__title">{title}</h2>
        <form className="sign__form" action="#" name={name}>
          <fieldset className="sign__fieldset">
            {children}
          </fieldset>
          <button className="sign__button">{buttonText}</button>
        </form>
        {name === "register" ? (
          <p className="sign__text">
            Уже зарегистрированы?&nbsp;
            <Link to="/signin" className="sign__link">Войти</Link>
          </p>
        ) : (
          <p className="sign__text">
            Ещё не зарегистрированы?&nbsp;
            <Link to="/signup" className="sign__link">Регистрация</Link>
          </p>
        )} 
      </div>
    </div>
  )
}

export default Sign;