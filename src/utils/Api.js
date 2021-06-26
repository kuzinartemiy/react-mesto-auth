class Api {
  constructor({baseUrl, token}) {
    this._baseUrl = baseUrl;
    this._token = token;
  }

  _getResponseData(res) {
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
      .then(this._getResponseData);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: {
        Authorization: this._token,
      }
    })
      .then(this._getResponseData);
  }

  setUserInfo({name, about}) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        about
      })
    })
      .then(this._getResponseData);
  }

  setUserAvatar({avatar}) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: avatar
      })
    })
      .then(this._getResponseData);
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
      .then(this._getResponseData);
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: this._token,
      }
    })
      .then(this._getResponseData);
  }

  changeLikeCardStatus(id, isLiked) {
    return fetch(`${this._baseUrl}/cards/likes/${id}`, {
      method:`${isLiked ? 'DELETE' : 'PUT'}`,
      headers: {
        Authorization: this._token,
      }
    })
      .then(this._getResponseData);
  }
}

export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-24',
  token: 'dff2004b-ae2b-4b49-ae11-6674a4b5c7dc'
})
