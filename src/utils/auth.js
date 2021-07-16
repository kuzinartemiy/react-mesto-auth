class Auth {
  constructor({baseUrl, token}) {
    this._baseUrl = baseUrl;
    // this._token = token;
    // this._headers = {
    //   Authorization: this._token,
    //   'Content-Type': 'application/json'
    // };
  };

  _getResponseData(res) {
    if(!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    };
    return res.json();
  };

  signUp(signUpData) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "email": signUpData.email,
        "password": signUpData.password
      })
    })
    .then(this._getResponseData);
  }

  signIn(signInData) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'email': signInData.email,
        'password': signInData.password
      })
    })
    .then(this._getResponseData);
  }

  getUserData(jwt) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`
      },
    })
    .then(this._getResponseData);
  }





}







export default new Auth({
  baseUrl: 'https://auth.nomoreparties.co',

});