import React, { useEffect, useState } from 'react';
import {api} from '../utils/Api.js';

function Main(props) {
  
  const [userName, setUserName] = useState();
  const [userDescription, setUserDescription] = useState();
  const [userAvatar, setUserAvatar] = useState();

  const [cards, setCards] = useState([]);

  useEffect(() => {
    api.getUserInfo()
      .then(res => {
        setUserName(res.name);
        setUserDescription(res.about);
        setUserAvatar(res.avatar);
      })
  }, []);

  useEffect(() => {
    api.getInitialCards()
      .then(res => {
        setCards(...cards, res);
      })
  }, []);

  return(
    <main className="content">
      <section className="profile">
        <div className="profile__avatar" style={{ backgroundImage: `url(${userAvatar})`}}>
          <div className="profile__avatar-edit" onClick={props.onEditAvatar}/>
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{userName}</h1>
          <p className="profile__job">{userDescription}</p>
          <button onClick={props.onEditProfile} aria-label="Редактировать" type="button" className="profile__edit-button"/>
        </div>
        <button onClick={props.onAddPlace} aria-label="Добавить" type="button" className="profile__add-button"/>
      </section> 
      <section className="places">
        <ul className="places__list">
          {cards.map(card => {
            return (
              <li className="place" key={card._id}>
                <button aria-label="Удалить" type="button" className="place__delete"></button>
                <img src={card.link} alt={`Фотография ${card.name}`} className="place__image"/>
                <div className="place__info">
                  <h2 className="place__title">{card.name}</h2>
                  <div className="place__likes">
                    <button aria-label="Нравится" type="button" className="place__like"></button>
                    <span className="place__like-count">{card.likes.length}</span>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      </section>
    </main>
  )
}

export default Main;