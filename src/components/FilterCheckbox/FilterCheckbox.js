import React from 'react';
import './FilterCheckbox.css';

function FilterCheckbox({ onCheckboxClick }) {
  return (
    <label className="checkbox">
      <input className="checkbox сheckbox_invisible" type="checkbox" onClick={onCheckboxClick} />
      <span className="checkbox checkbox_visible"></span>
      <span className="checkbox__text">Короткометражки</span>
    </label>
  )
}

export default FilterCheckbox;