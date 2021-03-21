import './SavedMovies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

function SavedMovies({ savedMovies, loggedIn, onDeleteClick }) {
  return (
    <>
      <Header loggedIn={loggedIn} />
      <section className="movies">
        <div className="movies__container">
          <SearchForm />
          <MoviesCardList
            savedMovies={savedMovies}
            onDeleteClick={onDeleteClick}
          />
          <div className="movies__divider"></div>
        </div>
      </section>
      <Footer />
    </>
  )
}

export default SavedMovies; 