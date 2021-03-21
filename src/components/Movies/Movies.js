import './Movies.css';
import React from 'react';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

function Movies({ movies, savedMovies, loggedIn, isLoading, onLikeClick, onDeleteClick, onSearchClick, onCheckboxClick }) {
  return (
    <>
      <Header loggedIn={loggedIn} />
      <section className="movies">
        <div className="movies__container">
          <SearchForm
            onCheckboxClick={onCheckboxClick}
            onSearchClick={onSearchClick}
          />
          <MoviesCardList
            movies={movies}
            savedMovies={savedMovies}
            isLoading={isLoading}
            onLikeClick={onLikeClick}
            onDeleteClick={onDeleteClick}
          />
        </div>
      </section>
      <Footer />
    </>
  )
}

export default Movies;