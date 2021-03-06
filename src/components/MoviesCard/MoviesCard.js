import './MoviesCard.css';

function MoviesCard({ movie, isLiked }) {
  return (
    <div className="movie">
      <div className="movie__descr">
        <div className="movie__wrapper">
          <h2 className="movie__title">{movie.title}</h2>
          <p className="movie__duration">{movie.duration}</p>
        </div>
        {!isLiked ? (
          <button className={`movie__button ${!movie.isLiked ? 'movie__button_dislike' : 'movie__button_like'}`}></button>
        ) : (
          <button className="movie__button movie__button_delete"></button>
        )}
      </div>
      <img className="movie__image" src={movie.image} alt={movie.title} />
    </div>
  )
}

export default MoviesCard;