class Api {
  constructor (config) {
    this._url = config.url;
  }

  _sendRequest(link, params) {
    return fetch(link, params)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  getMovies() {
    return this._sendRequest(`${this._url}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
  }
}

export const moviesApi = new Api({
  url: 'https://api.nomoreparties.co/beatfilm-movies'
});