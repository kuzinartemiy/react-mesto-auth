import React, { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import Card from './Card.js';

function Main(props) {
  
  const currentUser = useContext(CurrentUserContext);

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
          {props.cards.map(card => {
            return(
              <Card 
                onCardClick={props.onImage} 
                cardData={card} 
                key={card._id}
                onCardLike={props.onCardLike}
                onCardDelete={props.onCardDelete}
              />
            )
          })}
        </ul>
      </section>
    </main>
  );
};

export default Main;