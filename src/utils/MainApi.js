import { MOVIE_URL } from './contants';

class Api {
  constructor (config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  _sendRequest(link, params) {
    return fetch(link, params)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res);
      });
  }

  registerUser(name, email, password) {
    return this._sendRequest(`${this._url}/signup`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ name, email, password })
    });
  }

  loginUser(email, password) {
    return this._sendRequest(`${this._url}/signin`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ email, password })
    });
  }

  checkToken(token) {
    return this._sendRequest(`${this._url}/users/me`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
  }

  getUserInfo(token) {
    return this._sendRequest(`${this._url}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
  }

  updateUserInfo(data, token) {
    return this._sendRequest(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email
      })
    });
  }

  addSavedMovie(data, token) {
    return this._sendRequest(`${this._url}/movies`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        country: data.country || 'Not Indicated',
        director: data.director || 'Not Indicated',
        duration: data.duration || 'Not Indicated',
        year: data.year || 'Not Indicated',
        description: data.description || 'Not Indicated',
        image: `${MOVIE_URL}${data.image.url}`,
        trailer: data.trailerLink || 'Not Indicated',
        thumbnail: `${MOVIE_URL}${data.image.formats.thumbnail.url}`,
        movieId: data.id,
        nameRU: data.nameRU || 'Not Indicated',
        nameEN: data.nameEN || 'Not Indicated',
      })
    });
  }

  getSavedMovies(token) {
    return this._sendRequest(`${this._url}/movies`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
  }

  deleteSavedMovie(movieId, token) {
    return this._sendRequest(`${this._url}/movies/${movieId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
  }
}

export const mainApi = new Api({
  url: 'http://localhost:3000',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});