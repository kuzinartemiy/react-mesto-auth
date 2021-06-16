class Api {
  constructor({baseUrl, token}) {
    this._baseUrl = baseUrl;
    this._token = token;
  }

  _getResponceData(res) {
    if(!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        Authorization: this._token,
      }
    })
      .then(this._getResponceData);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: {
        Authorization: this._token,
      }
    })
      .then(this._getResponceData);
  }

  editProfile({newName, newAbout}) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        Authorization: this._token,
      },
      body: JSON.stringify({
        name: newName,
        about: newAbout
      })
    })
      .then(this._getResponceData);
  }

  addCard({newCardName, newCardLink}) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: {
        Authorization: this._token,
      },
      body: JSON.stringify({
        name: newCardName,
        link: newCardLink
      })
    })
      .then(this._getResponceData);
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: this._token,
      }
    })
      .then(this._getResponceData);
  }

  addLike(id) {
    return fetch(`${this._baseUrl}/cards/likes/${id}`, {
      method:'PUT',
      headers: {
        Authorization: this._token,
      }
    })
      .then(this._getResponceData);
  }

  deleteLike(id) {
    return fetch(`${this._baseUrl}/cards/likes/${id}`, {
      method:'DELETE',
      headers: {
        Authorization: this._token,
      }
    })
      .then(this._getResponceData);
  }
}

export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-24',
  token: 'dff2004b-ae2b-4b49-ae11-6674a4b5c7dc'
})
