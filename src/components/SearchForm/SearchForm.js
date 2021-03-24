import React from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

import './SearchForm.css';

function SearchForm({ onCheckboxClick, moviesCheckbox, savedMoviesCheckbox, onSearchClick }) {
  const [value, setValue] = React.useState('')

  function handleChange(evt) {
    setValue(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    if (value !== '') {
      onSearchClick(value);
      setValue('');
    }
  }

  return (
    <form className="search__form" name="seacrh" onSubmit={handleSubmit}>
      <input
        className="search__input"
        type="text"
        placeholder="Фильм"
        value={value}
        onChange={handleChange}
        required
      />
      <button className="search__button" type="submit"></button>
      <FilterCheckbox moviesCheckbox={moviesCheckbox} savedMoviesCheckbox={savedMoviesCheckbox} onCheckboxClick={onCheckboxClick}/>
    </form>
  )
}

export default SearchForm;