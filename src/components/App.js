import React, { useEffect, useState } from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import Login from './Login';
import Register from './Register';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeleteCardPopup from './DeleteCardPopup';
import InfoTooltip from './InfoTooltip';

import api from '../utils/api.js';
import auth from '../utils/auth.js';

import { CurrentUserContext } from '../contexts/CurrentUserContext';

import ProtectedRoute from './ProtectedRoute';


function App() {

  const history = useHistory();
  
  const [isEditAvatarPopupOpen, setEditAvatarPopup] = useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopup] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopup] = useState(false);
  const [isDeleteCardPopupOpen, setDeleteCardPopup] = useState(false);
  const [isImagePopupOpen, setImagePopup] = useState(false);
  const [isInfoTooltipOpen, setInfoTooltip] = useState(false);
  const [isSuccess, setSuccess] = useState(false);

  
  const [isLoading, setIsLoading] = useState(false);

  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);

  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  
  useEffect(() => {
    if(localStorage.getItem('token')) {
      setLoggedIn(true);
      auth.getUserData(localStorage.getItem('token'))
        .then(res => {
          setEmail(res.data.email);
          setLoggedIn(true);
          history.push('/');
        })
    }

    Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([userData, cards]) => {
      setCurrentUser(userData);
      setCards(cards);
    })
    .catch(error => {
      console.log(`Ошибка при получении данных: ${error}`);
    })
  }, []);

  const handleCardClick = (targetCard) => {
    setImagePopup(true);
    setSelectedCard(targetCard);
  };

  const handleDeleteCardClick = (targetCard) => {
    setDeleteCardPopup(true);
    setSelectedCard(targetCard);
  };

  const handleEditAvatarClick = () => {
    setEditAvatarPopup(true);
  };

  const handleEditProfileClick = () => {
    setEditProfilePopup(true);
  };

  const handleAddPlaceClick = () => {
    setAddPlacePopup(true);
  };

  const closeAllPopups = () => {
    setEditAvatarPopup(false);
    setEditProfilePopup(false);
    setAddPlacePopup(false);
    setDeleteCardPopup(false);
    setImagePopup(false);
    setInfoTooltip(false);
    setSelectedCard(null);
  };

  const handleUpdateUser = ({name, about}) => {
    setIsLoading(true);

    api.setUserInfo({name, about})
      .then(res => {
        setCurrentUser(res);
        closeAllPopups();
        setIsLoading(false);
      })
      .catch(error => {
        console.log(`Ошибка при обновлении данных пользователя: ${error}`);
      });
  };

  const handleUpdateAvatar = ({avatar}) => {
    setIsLoading(true);

    api.setUserAvatar({avatar})
      .then(res => {
        setCurrentUser(res);
        closeAllPopups();
        setIsLoading(false);
      })
      .catch(error => {
        console.log(`Ошибка при обновлении аватара: ${error}`);
      });
  };

  const handleCardLike = (card) => {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, isLiked)
      .then(newCard => {
        setCards(state => state.map(c => c._id === card._id ? newCard : c));
      })
      .catch(error => {
        console.log(`Ошибка при установке/удалении лайка: ${error}`);
      });
  };

  const handleCardDelete = (card) => {
    setIsLoading(true);

    api.deleteCard(card._id)
      .then(() => {
        setCards(cards.filter(i => i._id !== card._id));
        closeAllPopups();
        setIsLoading(false);
      })
      .catch(error => {
        console.log(`Ошибка при удалении карточки: ${error}`);
      });
  };

  const handleAddPlaceSubmit = ({name, link}) => {
    setIsLoading(true);

    api.addCard({name, link})
      .then(res => {
        setCards([res, ...cards]);
        closeAllPopups();
        setIsLoading(false);
      })
      .catch(error => {
        console.log(`Ошибка при добавлении новой карточки: ${error}`);
      });
  };
  
  const handleRegister = (signUpData) => {
    auth.signUp(signUpData)
      .then(() => {
        setSuccess(true);
        setInfoTooltip(true);
        history.push('/sign-in');
      })
      .catch((error) => {
        setSuccess(false);
        setInfoTooltip(true);
        console.log(error);
      })
  }

  const handleLogin = (signInData) => {
    auth.signIn(signInData)
      .then(res => {
        localStorage.setItem('token',res.token);
        auth.getUserData(localStorage.getItem('token'))
          .then(res => {
            setEmail(res.data.email);
            setLoggedIn(true);
            history.push('/');
          })
      })
      .catch(error => {
        setSuccess(false);
        setInfoTooltip(true);
        console.log(error);
      })
  }

  const handleSignOut = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
    history.push('/sign-in');
  }

  return(
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          <Header email={email} onSignOut={handleSignOut}/>
          <Switch>
            <ProtectedRoute 
              exact path="/"
              loggedIn={loggedIn}
              component={Main}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onImage={handleCardClick}
              onCardDelete={handleDeleteCardClick}
              cards={cards}
              onCardLike={handleCardLike}
            />
            <Route path="/sign-in">
              <Login onLogin={handleLogin} />
            </Route>

            <Route path="/sign-up">
              <Register onRegister={handleRegister} />
            </Route>

            <Route>
              { loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" /> }
            </Route>
          </Switch>

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            isLoading={isLoading}
          />
          
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            isLoading={isLoading}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
            isLoading={isLoading}
          />

          <DeleteCardPopup
            isOpen={isDeleteCardPopupOpen}
            onClose={closeAllPopups}
            onDeleteCard={handleCardDelete}
            card={selectedCard}
            isLoading={isLoading}
          />

          <ImagePopup
            isOpen={isImagePopupOpen}
            card={selectedCard}
            onClose={closeAllPopups}
          />

          <InfoTooltip
            isOpen={isInfoTooltipOpen}
            onClose={closeAllPopups}
            isSuccess={isSuccess}
          />

          <Footer />
        </div>
      </CurrentUserContext.Provider>
    
    
  );
};

export default App;
