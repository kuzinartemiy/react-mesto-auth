import React, { useEffect, useState } from 'react';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';

import { api } from '../utils/Api.js';

import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {
  
  const [isEditAvatarPopupOpen, setEditAvatarPopup] = useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopup] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopup] = useState(false);

  const [selectedCard, setSelectedCard] = useState(null);

  const [currentUser, setCurrentUser] = useState({});
  
  useEffect(() => {
    api.getUserInfo()
      .then(res => {
        setCurrentUser(res);
      })
  }, [])

  const handleCardClick = (targetCard) => {
    setSelectedCard(targetCard);
  }

  const handleEditAvatarClick = () => {
    setEditAvatarPopup(true);
  }

  const handleEditProfileClick = () => {
    setEditProfilePopup(true);
  }

  const handleAddPlaceClick = () => {
    setAddPlacePopup(true);
  }

  const closeAllPopups = () => {
    setEditAvatarPopup(false);
    setEditProfilePopup(false);
    setAddPlacePopup(false);
    setSelectedCard(null);
  }

  const handleUpdateUser = ({name, about}) => {
    
    api.setUserInfo({name, about})
      .then(res => {
        setCurrentUser(res);
        closeAllPopups();
      })
  }

  const handleUpdateAvatar = ({avatar}) => {
    api.setUserAvatar({avatar})
      .then(res => {
        setCurrentUser(res);
        closeAllPopups();
      })
  }

  return(
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main 
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onImage={handleCardClick}
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
        <PopupWithForm 
          title='Новое место' 
          name='add-card' 
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
        >
          <input required name="newCardName" type="text" placeholder="Название" className="popup__input popup__input_field_card-name" minLength="2" maxLength="30"/>
          <span className="popup__input-error"/>
          <input required name="newCardLink" type="url" placeholder="Ссылка на картинку" className="popup__input popup__input_field_card-link"/>
          <span className="popup__input-error"/>
        </PopupWithForm>
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App;
