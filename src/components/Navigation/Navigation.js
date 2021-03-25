import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

import './Navigation.css';

function Navigation({ loggedIn }) {
  const isTablet = useMediaQuery({ query: '(max-width: 768px)' });
  const [isOpen, setIsOpen] = React.useState(false);

  function handleMenuClick() {
    setIsOpen(!isOpen);
  }

  return (
    <nav className="navigation">
      {!loggedIn ? (
        <>
          <Link to='/signup' className="navigation__link navigation__link_register">Регистрация</Link>
          <Link to='/signin' className="navigation__link navigation__link_login">Войти</Link> 
        </>
      ) : (
        isTablet ? (
          <>
            <button className={`navigation-mobile__button ${!isOpen ? 'navigation-mobile__button_burger' : 'navigation-mobile__button_close'}`} onClick={handleMenuClick}></button>
            <div className={`${!isOpen ? 'navigation-mobile' : 'navigation-mobile_visible'}`}>
              <div className="navigation-mobile__container">
                <div className="navigation-mobile__wrapper">
                  <NavLink to="/" className="navigation-mobile__movies">Главная</NavLink>
                  <NavLink to="/movies" className="navigation-mobile__movies" activeClassName="navigation-mobile__movies_active">Фильмы</NavLink>
                  <NavLink to="/saved-movies" className="navigation-mobile__movies" activeClassName="navigation-mobile__movies_active">Сохранённые фильмы</NavLink>
                </div>
                <Link to='/profile' className="navigation__link navigation__link_account">Аккаунт</Link>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="navigation__wrapper">
              <NavLink to='/movies' className="navigation__movies" activeClassName="navigation__movies_active">Фильмы</NavLink>
              <NavLink to='/saved-movies' className="navigation__movies" activeClassName="navigation__movies_active">Сохранённые фильмы</NavLink>
            </div>
            <Link to='/profile' className="navigation__link navigation__link_account">Аккаунт</Link>
          </>
        )
      )}
    </nav> 
  )
}

export default Navigation;