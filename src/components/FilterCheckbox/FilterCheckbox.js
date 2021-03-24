import React from 'react';
import { useLocation } from 'react-router-dom';

import './FilterCheckbox.css';

function FilterCheckbox({ moviesCheckbox, savedMoviesCheckbox, onCheckboxClick }) {
  const { pathname } = useLocation();
  
  return (
    <div className="checkbox">
      {pathname === '/movies' ? (
        <button className={`checkbox__button ${moviesCheckbox ? 'checkbox__button_active' : 'checkbox__button_inactive'}`} type="button" onClick={onCheckboxClick}></button>
      ) : (
        <button className={`checkbox__button ${savedMoviesCheckbox ? 'checkbox__button_active' : 'checkbox__button_inactive'}`} type="button" onClick={onCheckboxClick}></button>
      )}
      <span className="checkbox__text">Короткометражки</span>
    </div>
  )
}

export default FilterCheckbox;