import { MOVIE_URL } from './contants';
import notFoundImage from '../images/not-found-image.jpg';

const transformDuration = (duration) => {
  const hours = Math.floor(duration / 60);
  const minutes = duration - Math.floor(hours * 60);
  return `${hours === 0 ? '' : `${hours}ч`} ${minutes === 0 ? '' : `${minutes}м`}`
}

const checkTrailerHref = (movie) => {
  if (movie.trailerLink) {
    return movie.trailerLink;
  }
  return movie.trailer;
}

const checkImageSrc = (movie) => {
  if (movie.image && movie.image.url) {
    return `${MOVIE_URL}${movie.image.url}`;
  }
  if (movie.image) {
    return movie.image;
  }
  return notFoundImage;
}

const errors = (err) => {
  if (err.status === 400) {
    return 'При авторизации произошла ошибка. Переданный токен некорректен.';
  } 
  if (err.status === 401) {
    return 'Вы ввели неправильный логин или пароль';
  }
  if (err.status === 403) {
    return 'При авторизации произошла ошибка. Токен не передан или передан не в том формате';
  }
  if (err.status === 404) {
    return '404 Страница по указанному маршруту не найдена.';
  }
  if (err.status === 409) {
    return 'Пользователь с таким email уже существует.';
  }
  return '500 На сервере произошла ошибка.';
}

const resultErrorMessage = 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'

export {
  transformDuration,
  checkTrailerHref,
  checkImageSrc,
  errors,
  resultErrorMessage,
}