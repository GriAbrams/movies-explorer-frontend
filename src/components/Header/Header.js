import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../images/logo.svg';
import Navigation from '../Navigation/Navigation';

import './Header.css';

function Header({ loggedIn }) {
  const { pathname } = useLocation();
  
  return (
    <header className={`${!loggedIn ? 'header' : `${pathname === '/' ? 'header_grey' : 'header_light'}`}`}>
      <div className="header__container">
        <Link to='/'>
          <img className="header__logo" src={logo} alt="Логотип диплома" />
        </Link>
        <Navigation loggedIn={loggedIn} />
      </div>
    </header>
  )
}

export default Header;