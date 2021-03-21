import './MoviesCard.css';
import React from 'react';
import { useLocation } from 'react-router-dom';
import { transformDuration, checkTrailerHref, checkImageSrc } from '../../utils/utils';

function MoviesCard({ movie, savedMovies, onLikeClick, onDeleteClick }) {
  const { pathname } = useLocation();
  const isLiked = savedMovies.some((item) => item.nameRU === movie.nameRU);

  const handleClickLikeButton = () => {
    if(!isLiked) {
      onLikeClick(movie);
    } else {
      const savedMovie = savedMovies.filter((m) => m !== movie);
      onDeleteClick(savedMovie[0]._id);
    }
  }

  function handleClickDeleteButton() {
    onDeleteClick(movie._id);
  }

  return (
    <div className="movie">
      <div className="movie__descr">
        <div className="movie__wrapper">
          <h2 className="movie__title">{movie.nameRU}</h2>
          <p className="movie__duration">{transformDuration(movie.duration)}</p>
        </div>
        {pathname === '/movies' ? (
          <button className={`movie__button ${isLiked ? 'movie__button_like' : 'movie__button_dislike'}`} onClick={handleClickLikeButton}></button>
        ) : (
          <button className="movie__button movie__button_delete" onClick={handleClickDeleteButton}></button>
        )}
      </div>
      <a className="movie__link" href={checkTrailerHref(movie)} target="_blank" rel="noreferrer">
        <img className="movie__image" src={checkImageSrc(movie)} alt={`Обложка фильма «${movie.nameRU}»`} />
      </a>
    </div>
  )
}

export default MoviesCard;