import './App.css';
import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import PageNotFound from '../PageNotFound/PageNotFound';
import { mainApi } from '../../utils/MainApi';
import { moviesApi } from '../../utils/MoviesApi';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { errors } from '../../utils/utils';

function App() {
  const history = useHistory();

  const [movies, setMovies] = React.useState([]); // Стейт фильмов с сервера
  const [savedMovies, setSavedMovies] = React.useState([]); // Стейт сохраненных фильмов
  const [currentUser, setCurrentUser] = React.useState({}); // Стейт данных текущего пользователя
  const [loggedIn, setLoggedIn] = React.useState(false); // Стейт авторизации
  const [isLoading, setIsLoading] = React.useState(false); // Стейт загрузки
  const [keyword, setKeyword] = React.useState(''); // Стейт ключевого слова для поиска
  const [isCheckboxChecked, setCheckboxChecked] = React.useState(false); // Стейт состояния чекбокса
  const [errorMessage, setErrorMessage] = React.useState('') // Стейт сообщений ошибок

  // Проверка токена
  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      mainApi.checkToken(token)
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          history.push('/movies');
        }
      }).catch(err => console.log(err));
    }
  }, [history]);

  // Регистрация пользователя
  function handleRegister(name, email, password) {
    mainApi.registerUser(name, email, password)
    .then((res) => {
      localStorage.setItem('token', res.token);
      setCurrentUser(res);
      setLoggedIn(true);
      history.push('/movies');
    })
    .catch((err) => {
      setErrorMessage(errors(err));
    });
  }

  // Авторизация пользователя
  function handleLogin(email, password) {
    mainApi.loginUser(email, password)
    .then((res) => {
      localStorage.setItem('token', res.token);
      setCurrentUser(res);
      setLoggedIn(true);
      history.push('/movies');
    })
    .catch((err) => {
      setErrorMessage(errors(err));
    });
  }

  // Выход из аккаунта
  function handleSignOut() {
    localStorage.removeItem('token');
    setLoggedIn(false);
    history.push('/');
  }

  // Получение данных о пользователе и сохраненных им фильмов
  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (loggedIn) {
    Promise.all([mainApi.getUserInfo(token), mainApi.getSavedMovies(token)])
      .then(([userData, savedMovies]) => {
        setCurrentUser(userData);
        setSavedMovies(savedMovies);
      }).catch((err) => console.log(err));
    }
  }, [loggedIn]);

  // Обновление информации о пользователе
  function handleUpdateUserInfo(inputValues) {
    const token = localStorage.getItem('token');
    mainApi.updateUserInfo(inputValues, token)
    .then((data) => {
      setCurrentUser(data);
    })
    .catch((err) => {
      setErrorMessage(errors(err));
    });
  }

  // Поиск фильмов
  function handleSearch(keyword) {
    setIsLoading(true);
    moviesApi.getMovies()
      .then((movies) => {
        const filteredMovies = movies.filter(movie => movie.nameRU.toLowerCase().includes(keyword.toLowerCase())
        || movie.description.toLowerCase().includes(keyword.toLowerCase()));
        localStorage.setItem('movies', JSON.stringify(filteredMovies));
        setMovies(filteredMovies);

        localStorage.setItem('keyword', JSON.stringify(keyword));
        setKeyword(keyword)
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false)
      });  
  }
  
  // Функция фильтрация короткометражек
  function handleCheckboxClick() {
    setCheckboxChecked(!isCheckboxChecked);
    const movies = JSON.parse(localStorage.getItem('movies'));
    const shortMovies = movies.filter((movie) => {
      if (isCheckboxChecked) {
        return movie;
      }
      return movie.duration < 41;
    });
    localStorage.setItem('movies', JSON.stringify(shortMovies));
    setMovies(shortMovies);
  }

  // Отображение найденных фильмов после перезагрузки страницы
  React.useEffect(() => {
    if (JSON.parse(localStorage.getItem('movies'))) {
      setMovies(JSON.parse(localStorage.getItem('movies')));
      setKeyword(JSON.parse(localStorage.getItem('keyword')));
    } else {
      localStorage.removeItem('movies');
      localStorage.removeItem('keyword');
    }
  }, []);

  // Добавление фильма в сохраненные
  function handleAddSavedMovie(movie) {
    const token = localStorage.getItem('token');
    mainApi.addSavedMovie(movie, token)
      .then((newSavedMovie) => {
        setSavedMovies([newSavedMovie, ...savedMovies]);
      }).catch((err) => console.log(err));
  }

  // Удаление фильма из сохраненных
  function handleDeleteSavedMovie(movie) {
    const token = localStorage.getItem('token');
    mainApi.deleteSavedMovie(movie, token)
    .then(() => {
      let newMovies = savedMovies.filter((savedMovie) => savedMovie._id !== movie);
      setSavedMovies(newMovies);
    }).catch((err) => console.log(err));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <Switch>
          <Route exact path='/'>
            <Main />
          </Route>
          <ProtectedRoute
            path='/movies'
            component={Movies}
            movies={movies}
            savedMovies={savedMovies}
            loggedIn={loggedIn}
            isLoading={isLoading}
            onLikeClick={handleAddSavedMovie}
            onDeleteClick={handleDeleteSavedMovie}
            onSearchClick={handleSearch}
            onCheckboxClick={handleCheckboxClick}
          />
          <ProtectedRoute
            path='/saved-movies'
            component={SavedMovies}
            savedMovies={savedMovies}
            loggedIn={loggedIn}
            onDeleteClick={handleDeleteSavedMovie}
          />
          <ProtectedRoute
            path='/profile'
            component={Profile}
            loggedIn={loggedIn}
            onUpdateUser={handleUpdateUserInfo}
            onSignOut={handleSignOut}
            errorMessage={errorMessage}
            />
          <Route path='/signup'>
            <Register
              errorMessage={errorMessage}
              onRegister={handleRegister}
            />
          </Route>
          <Route path='/signin'>
            <Login
              errorMessage={errorMessage}
              onLogin={handleLogin}
            />
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
