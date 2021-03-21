import './MoviesCardList.css';
import React from 'react';
import { useLocation } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';

function MoviesCardList({ movies, savedMovies, isLoading, onLikeClick, onDeleteClick}) {
  const { pathname } = useLocation();
  const isTablet = useMediaQuery({ query: '(max-width: 768px)' });
  const isMobile = useMediaQuery({ query: '(max-width: 425px)' });
  const [moviesCount, setMoviesCount] = React.useState(isMobile ? 5 : isTablet ? 8 : 12);
  const [currentMovies, setCurrentMovies] = React.useState([]);

  function handleMoreButtonClick() {
    setMoviesCount(isMobile || isTablet ? moviesCount + 2 : moviesCount + 3);
  }

  React.useEffect(() => {
    pathname === '/movies' &&
    setCurrentMovies(movies.slice(0, moviesCount));
  }, [pathname, movies, moviesCount]);

  return (
    <div className="movies-list">
      {isLoading ? (
        <Preloader />
      ): (
        <div className="movies-list__elements">
        {pathname === '/movies' ? (
          <>
            {!isLoading && currentMovies.length === 0 &&
            <>
              <span></span>
              <p className="movies-list__error">Ничего не найдено</p>
            </>}
            {currentMovies.map((movie) => (
            <MoviesCard
              movie={movie}
              key={movie.id}
              savedMovies={savedMovies}
              onLikeClick={onLikeClick}
              onDeleteClick={onDeleteClick}
            />
            ))}
          </>
        ) : (
          <>
            {savedMovies.map((movie) => (
              <MoviesCard
                movie={movie}
                key={movie._id}
                savedMovies={savedMovies}
                onLikeClick={onLikeClick}
                onDeleteClick={onDeleteClick}
              />
            ))}
          </>
        )}
      </div>
      )}
      {!isLoading && pathname === '/movies' && (
        <div className="movies-list__load-more">
          {movies.length > moviesCount && <button className="movies-list__button" onClick={handleMoreButtonClick}>Ещё</button>}
        </div>
      )}
    </div>
  )
}

export default MoviesCardList;