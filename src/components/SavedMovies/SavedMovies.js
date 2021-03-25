import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

import './SavedMovies.css';

function SavedMovies({ loggedIn, onDeleteClick, savedMoviesCheckbox, onCheckboxClick, onSearchClick, isNotFound }) {
  const savedMovies = JSON.parse(localStorage.getItem('savedMovies')) || [];

  return (
    <>
      <Header loggedIn={loggedIn} />
      <section className="movies">
        <div className="movies__container">
          <SearchForm
            savedMoviesCheckbox={savedMoviesCheckbox}
            onCheckboxClick={onCheckboxClick}
            onSearchClick={onSearchClick}
          />
          <MoviesCardList
            savedMovies={savedMovies}
            onDeleteClick={onDeleteClick}
            isNotFound={isNotFound}
          />
          <div className="movies__divider"></div>
        </div>
      </section>
      <Footer />
    </>
  )
}

export default SavedMovies; 