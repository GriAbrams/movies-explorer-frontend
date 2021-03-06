import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm() {
  return (
    <form className="search__form">
      <input className="search__input" type="text" placeholder="Фильм" required />
      <button className="search__button"></button>
      <FilterCheckbox />
    </form>
  )
}

export default SearchForm;