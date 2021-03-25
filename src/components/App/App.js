import React from 'react';
import { Route, Switch, useHistory, useLocation, Redirect } from 'react-router-dom';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import PageNotFound from '../PageNotFound/PageNotFound';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { mainApi } from '../../utils/MainApi';
import { moviesApi } from '../../utils/MoviesApi';
import { filterMovies, errors } from '../../utils/utils';
import { SHORT_MOVIES_DURATION, SUCCESS_MESSAGE } from '../../utils/contants';

import './App.css';

function App() {
  const history = useHistory();
  const { pathname } = useLocation();

  const [token, setToken] = React.useState(''); // Стейт токена
  const [movies, setMovies] = React.useState([]); // Стейт фильмов с сервера
  const [savedMovies, setSavedMovies] = React.useState([]); // Стейт сохраненных фильмов
  const [findedMovies, setFindedMovies] = React.useState([]); // Стейт найденных фильмов
  const [findedSavedMovies, setFindedSavedMovies] = React.useState([]); // Стейт найденных сохраненных фильмов
  const [currentUser, setCurrentUser] = React.useState({}); // Стейт данных текущего пользователя
  const [loggedIn, setLoggedIn] = React.useState(false); // Стейт авторизации
  const [isLoading, setIsLoading] = React.useState(false); // Стейт загрузки
  const [moviesCheckbox, setMoviesCheckbox] = React.useState(false); // Стейт состояния чекбокса фильмов
  const [savedMoviesCheckbox, setSavedMoviesCheckbox] = React.useState(false); // Стейте состояния чекбокса сохраненных фильмов
  const [errorMessage, setErrorMessage] = React.useState('') // Стейт сообщений ошибок
  const [successMessage, setSuccessMessage] = React.useState('') // Стейт успешных сообщений 
  const [searchError, setSearchError] = React.useState(false); // Стейт ошибки сервера фильмов
  const [isNotFound, setNotFound] = React.useState(false); // Стейт отображения релультата поиска

  // Авторизация пользователя
  function handleLogin(email, password) {
    mainApi.loginUser(email, password)
    .then((res) => {
      localStorage.setItem('token', res.token);
      setLoggedIn(true);
      history.push('/movies');
    })
    .catch((err) => {
      setErrorMessage(errors(err));
      setTimeout(function() {setErrorMessage('')}, 2000);
    });
  }

  // Регистрация пользователя
  function handleRegister(name, email, password) {
    mainApi.registerUser(name, email, password)
    .then(() => {
      handleLogin(email, password);
    })
    .catch((err) => {
      setErrorMessage(errors(err));
      setTimeout(function() {setErrorMessage('')}, 2000);
    });
  }

  // Проверка токена
  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      mainApi.checkToken(token)
      .then((res) => {
        if (res) {
          setToken(token);
          setLoggedIn(true);
          history.push('/movies');
        }
      }).catch(err => console.log(err));
    }
  }, [history]);

  // Получение данных о пользователе и сохраненных им фильмов
  React.useEffect(() => {
    if (token) {
    Promise.all([mainApi.getUserInfo(token), mainApi.getSavedMovies(token)])
      .then(([userData, savedMovies]) => {
        setCurrentUser(userData);
        const userMovies = savedMovies.filter((movie) => movie.owner === userData._id);
        localStorage.setItem('savedMovies', JSON.stringify(userMovies));
        setSavedMovies(userMovies);
        setFindedSavedMovies(userMovies);
      }).catch((err) => console.log(err));
    }
  }, [token]);

  // Обновление информации о пользователе
  function handleUpdateUserInfo(inputValues) {
    mainApi.updateUserInfo(inputValues, token)
    .then((data) => {
      setCurrentUser(data);
      setSuccessMessage(SUCCESS_MESSAGE);
      setTimeout(function() {setSuccessMessage('')}, 5000);
    })
    .catch((err) => {
      setErrorMessage(errors(err));
      setTimeout(function() {setErrorMessage('')}, 2000);
    });
  }

  function handleSearch(keyword) {
    setNotFound(false);
    if (movies.length === 0 && pathname === '/movies') {
      setIsLoading(true);
      moviesApi.getMovies()
        .then((movies) => {
          setMovies(movies);
          return movies;
        })
        .then((movies) => {
          const filteredMovies = filterMovies(movies, keyword);
          localStorage.setItem('movies', JSON.stringify(filteredMovies));
          setFindedMovies(filteredMovies);
          filteredMovies.length === 0 && setNotFound(true);
        })
        .catch(() => {
          setSearchError(true);
        })
        .finally(() => {
          setIsLoading(false);
        })
    } else {
      if (pathname === '/movies') {
        const filteredMovies = filterMovies(movies, keyword);
        localStorage.setItem('movies', JSON.stringify(filteredMovies));
        setFindedMovies(filteredMovies);
        filteredMovies.length === 0 && setNotFound(true);
      } else {
        const filteredSavedMovies = filterMovies(savedMovies, keyword);
        localStorage.setItem('savedMovies', JSON.stringify(filteredSavedMovies));
        setFindedSavedMovies(filteredSavedMovies);
        filteredSavedMovies.length === 0 && setNotFound(true);
      }
    }
  }

  function handleCheckboxClick() {
    if (pathname === '/movies') {
      if (!moviesCheckbox) {
        localStorage.setItem('movies', JSON.stringify(findedMovies.filter((movie) => movie.duration <= SHORT_MOVIES_DURATION)));
      } else {
        localStorage.setItem('movies', JSON.stringify(findedMovies));
      }
      setMoviesCheckbox(!moviesCheckbox);
    } else {
      if (!savedMoviesCheckbox) {
        localStorage.setItem('savedMovies', JSON.stringify(findedSavedMovies.filter((savedMovie) => savedMovie.duration <= SHORT_MOVIES_DURATION)));
      } else {
        localStorage.setItem('savedMovies', JSON.stringify(findedSavedMovies));
      }
      setSavedMoviesCheckbox(!savedMoviesCheckbox);
    }
  }

  // Добавление фильма в сохраненные
  function handleAddSavedMovie(movie) {
    mainApi.addSavedMovie(movie, token)
      .then((newSavedMovie) => {
        localStorage.setItem('savedMovies', JSON.stringify([newSavedMovie, ...savedMovies]));
        setSavedMovies([newSavedMovie, ...savedMovies]);
        setFindedSavedMovies([newSavedMovie, ...savedMovies]);
      }).catch((err) => console.log(err));
  }

  // Удаление фильма из сохраненных
  function handleDeleteSavedMovie(movie) {
    mainApi.deleteSavedMovie(movie, token)
    .then(() => {
      let newMovies = savedMovies.filter((savedMovie) => savedMovie._id !== movie);
      localStorage.setItem('savedMovies', JSON.stringify(newMovies));
      setSavedMovies(newMovies);
      setFindedSavedMovies(newMovies);
    }).catch((err) => console.log(err));
  }

    // Выход из аккаунта
    function handleSignOut() {
      localStorage.removeItem('token');
      localStorage.removeItem('movies');
      localStorage.removeItem('savedMovies');
      setCurrentUser({});
      setMovies([]);
      setFindedMovies([]);
      setSavedMovies([]);
      setFindedSavedMovies([]);
      setMoviesCheckbox(false);
      setSavedMoviesCheckbox(false);
      setLoggedIn(false);
      history.push('/');
    }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <Switch>
          <Route exact path='/'>
            <Main 
              loggedIn={loggedIn}
            />
          </Route>
          <ProtectedRoute
            path='/movies'
            component={Movies}
            savedMovies={savedMovies}
            loggedIn={loggedIn}
            isLoading={isLoading}
            onLikeClick={handleAddSavedMovie}
            onDeleteClick={handleDeleteSavedMovie}
            onSearchClick={handleSearch}
            moviesCheckbox={moviesCheckbox}
            onCheckboxClick={handleCheckboxClick}
            searchError={searchError}
            isNotFound={isNotFound}
          />
          <ProtectedRoute
            path='/saved-movies'
            component={SavedMovies}
            loggedIn={loggedIn}
            onDeleteClick={handleDeleteSavedMovie}
            onSearchClick={handleSearch}
            savedMoviesCheckbox={savedMoviesCheckbox}
            onCheckboxClick={handleCheckboxClick}
            isNotFound={isNotFound}
          />
          <ProtectedRoute
            path='/profile'
            component={Profile}
            loggedIn={loggedIn}
            onUpdateUser={handleUpdateUserInfo}
            onSignOut={handleSignOut}
            errorMessage={errorMessage}
            successMessage={successMessage}
            />
          <Route path='/signup'>
            {loggedIn ? (
              <Redirect to='/movies' />
            ) : (
              <Register
                errorMessage={errorMessage}
                onRegister={handleRegister}
              />
            )}
          </Route>
          <Route path='/signin'>
            {loggedIn ? (
              <Redirect to='/movies' />
            ) : (
              <Login
                errorMessage={errorMessage}
                onLogin={handleLogin}
              />
            )}
          </Route>
          <Route path='*'>
            <PageNotFound />
          </Route>
        </Switch>
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App;
