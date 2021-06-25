import React, { useEffect, useState, useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import {api} from '../utils/Api.js';
import Card from './Card.js';

function Main(props) {
  
  const currentUser = useContext(CurrentUserContext);

  const [cards, setCards] = useState([]);

  useEffect(() => {
    api.getInitialCards()
      .then(res => {
        setCards(...cards, res);
      })
  }, []);

  const handleCardLike = (card) => {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, isLiked)
      .then(newCard => {
        setCards(state => state.map(c => c._id === card._id ? newCard : c));
      })
  }

  const handleCardDelete = (card) => {
    api.deleteCard(card._id)
      .then(setCards(cards.filter(i => i._id !== card._id)));
  }

  return(
    <main className="content">
      <section className="profile">
        <div className="profile__avatar" style={{ backgroundImage: `url(${currentUser.avatar})`}}>
          <div className="profile__avatar-edit" onClick={props.onEditAvatar}/>
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <p className="profile__job">{currentUser.about}</p>
          <button onClick={props.onEditProfile} aria-label="Редактировать" type="button" className="profile__edit-button"/>
        </div>
        <button onClick={props.onAddPlace} aria-label="Добавить" type="button" className="profile__add-button"/>
      </section> 
      <section className="places">
        <ul className="places__list">
          {cards.map(card => {
            return(
              <Card 
                onCardClick={props.onImage} 
                cardData={card} 
                key={card._id}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
              />
            )
          })}
        </ul>
      </section>
    </main>
  )
}

export default Main;