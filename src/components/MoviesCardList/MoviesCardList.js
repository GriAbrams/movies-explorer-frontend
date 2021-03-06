import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ movies, isLiked, loadMore }) {
  return (
    <div className="movies-list">
      <div className="movies-list__elements">
        {movies.map(movie => (
          <MoviesCard movie={movie} key={movie.movieId} isLiked={isLiked} />
        ))}
      </div>
      {loadMore && (
        <div className="movies-list__load-more">
          <button className="movies-list__button">Ещё</button>
        </div>
      )}
    </div>
  )
}

export default MoviesCardList;