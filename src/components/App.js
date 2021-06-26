import React, { useEffect, useState } from 'react';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

import { api } from '../utils/Api.js';

import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {
  
  const [isEditAvatarPopupOpen, setEditAvatarPopup] = useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopup] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopup] = useState(false);

  const [cards, setCards] = useState([]);

  const [selectedCard, setSelectedCard] = useState(null);

  const [currentUser, setCurrentUser] = useState({});
  
  useEffect(() => {
    api.getUserInfo()
      .then(res => {
        setCurrentUser(res);
      })
    api.getInitialCards()
      .then(res => {
        setCards(...cards, res);
      })
  }, []);

  const handleCardClick = (targetCard) => {
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
    setSelectedCard(null);
  };

  const handleUpdateUser = ({name, about}) => {
    api.setUserInfo({name, about})
      .then(res => {
        setCurrentUser(res);
        closeAllPopups();
      });
  };

  const handleUpdateAvatar = ({avatar}) => {
    api.setUserAvatar({avatar})
      .then(res => {
        setCurrentUser(res);
        closeAllPopups();
      });
  };

  const handleCardLike = (card) => {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, isLiked)
      .then(newCard => {
        setCards(state => state.map(c => c._id === card._id ? newCard : c));
      });
  };

  const handleCardDelete = (card) => {
    api.deleteCard(card._id)
      .then(setCards(cards.filter(i => i._id !== card._id)));
  };

  const handleAddPlaceSubmit = ({name, link}) => {
    console.log({name, link});
    api.addCard({name, link})
      .then(res => {
        setCards([{name, link}, ...cards]);
        closeAllPopups();
      });
  };

  return(
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main 
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onImage={handleCardClick}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup
         isOpen={isEditAvatarPopupOpen}
         onClose={closeAllPopups}
         onUpdateAvatar={handleUpdateAvatar}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
};

export default App;
