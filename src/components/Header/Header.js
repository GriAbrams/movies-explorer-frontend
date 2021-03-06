import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';
import Navigation from '../Navigation/Navigation';

function Header({ loggedIn }) {
  return (
    <header className={`${!loggedIn ? 'header' : 'header_logged'}`}>
      <div className="header__container">
        <Link exact to='/'>
          <img className="header__logo" src ={logo} alt="Логотип диплома" />
        </Link>
        {!loggedIn ? (
          <Navigation loggedIn={false} />
        ) : (
          <Navigation loggedIn={true} />
        )}
      </div>
    </header>
  )
}

export default Header;