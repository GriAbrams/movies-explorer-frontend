import './SavedMovies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import savedMovies from '../../utils/savedMovies';

function SavedMovies() {
  return (
    <>
      <Header loggedIn={true} />
      <section className="movies">
        <div className="movies__container">
          <SearchForm />
          <MoviesCardList movies={savedMovies} isLiked={true} loadMore={false} />
          <div className="movies__divider"></div>
        </div>
      </section>
      <Footer />
    </>
  )
}

export default SavedMovies; 