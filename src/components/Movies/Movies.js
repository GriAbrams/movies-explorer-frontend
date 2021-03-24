import React from 'react';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

import './Movies.css';

function Movies({
  savedMovies,
  loggedIn,
  isLoading,
  onLikeClick,
  onDeleteClick,
  onSearchClick,
  moviesCheckbox,
  onCheckboxClick,
  searchError,
  isNotFound,
}) {
  const movies = JSON.parse(localStorage.getItem('movies')) || [];

  return (
    <>
      <Header loggedIn={loggedIn} />
      <section className="movies">
        <div className="movies__container">
          <SearchForm
            moviesCheckbox={moviesCheckbox}
            onCheckboxClick={onCheckboxClick}
            onSearchClick={onSearchClick}
          />
          <MoviesCardList
            movies={movies}
            savedMovies={savedMovies}
            isLoading={isLoading}
            onLikeClick={onLikeClick}
            onDeleteClick={onDeleteClick}
            searchError={searchError}
            isNotFound={isNotFound}
          />
        </div>
      </section>
      <Footer />
    </>
  )
}

export default Movies;