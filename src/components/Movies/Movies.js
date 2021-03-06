import './Movies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import Preloader from '../Preloader/Preloader';
import movies from '../../utils/movies';

function Movies() {
  return (
    <>
      <Header loggedIn={true} />
      <section className="movies">
        <div className="movies__container">
          <SearchForm />
          {movies.length === 0 ? (
            <Preloader />
          ) : (
            <MoviesCardList movies={movies} isLiked={false} loadMore={true} />
          )}
        </div>
      </section>
      <Footer />
    </>
  )
}

export default Movies;