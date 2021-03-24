import React from 'react';
import { useLocation } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import {
  MOVIES_TO_SHOW_SCREEN,
  MOVIES_TO_SHOW_TABLET,
  MOVIES_TO_SHOW_MOBILE,
  MORE_MOVIES_SCREEN,
  MORE_MOVIES_TABLET_MOBILE,
  MOVIES_ERROR_MESSAGE,
} from '../../utils/contants';

import './MoviesCardList.css';

function MoviesCardList({ movies, savedMovies, isLoading, onLikeClick, onDeleteClick, searchError, isNotFound }) {
  const { pathname } = useLocation();
  const isTablet = useMediaQuery({ query: '(max-width: 768px)' });
  const isMobile = useMediaQuery({ query: '(max-width: 425px)' });
  const [moviesCount, setMoviesCount] = React.useState(isMobile ? MOVIES_TO_SHOW_MOBILE : isTablet ? MOVIES_TO_SHOW_TABLET : MOVIES_TO_SHOW_SCREEN);
  const [currentMovies, setCurrentMovies] = React.useState([]);

  function handleMoreButtonClick() {
    setMoviesCount(isMobile || isTablet ? moviesCount + MORE_MOVIES_TABLET_MOBILE : moviesCount + MORE_MOVIES_SCREEN);
  }

  React.useEffect(() => {
    pathname === '/movies' && setCurrentMovies(movies.slice(0, moviesCount));
  }, [pathname, movies, moviesCount]);

  return (
    <div className="movies-list">
      {isLoading ? (
        <Preloader />
      ) : searchError ? (
        <p className="movies-list__server-error">{MOVIES_ERROR_MESSAGE}</p>
      ) : isNotFound ? (
        <p className="movies-list__error">Ничего не найдено</p>
      ) : (
        <div className="movies-list__elements">
          {pathname === '/movies' ? (
            <>
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