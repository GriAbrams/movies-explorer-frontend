import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';
import Navigation from '../Navigation/Navigation';

import './Header.css';

function Header({ loggedIn }) {
  return (
    <header className={`${!loggedIn ? 'header' : 'header_logged'}`}>
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