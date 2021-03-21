import './Sign.css';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';

function Sign({ title, name, buttonText, children, onSubmit, isValid, isError, errorMessage }) {
  return (
    <div className="sign">
      <div className="sign__container">
        <Link to='/'>
          <img className="sign__logo" src ={logo} alt="Логотип диплома" />
        </Link>
        <h2 className="sign__title">{title}</h2>
        <form
          className="sign__form"
          action="#"
          name={name}
          onSubmit={onSubmit}
          noValidate
        >
          <fieldset className="sign__fieldset">
            {children}
          </fieldset>
          <fieldset className="sign__fieldset">
            <p className="sign__server-error">{errorMessage}</p>
            <button className="sign__button" type="submit" disabled={!isValid}>{buttonText}</button>
          </fieldset>
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