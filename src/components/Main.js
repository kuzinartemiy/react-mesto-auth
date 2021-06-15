import React from 'react';

function Main(props) {

  return(
    <main className="content">
      <section className="profile">
        <div className="profile__avatar">
          <div className="profile__avatar-edit" onClick={props.onEditAvatar}/>
        </div>
        <div className="profile__info">
          <h1 className="profile__name">Жак-Ив Кусто</h1>
          <p className="profile__job">Исследователь океана</p>
          <button onClick={props.onEditProfile} aria-label="Редактировать" type="button" className="profile__edit-button"/>
        </div>
        <button onClick={props.onAddPlace} aria-label="Добавить" type="button" className="profile__add-button"/>
      </section> 
      <section className="places">
        <ul className="places__list"></ul>
      </section>
      {/* <div id="edit-profile-popup" className="popup">
        <div className="popup__container">
          <form id="edit-form" name="profile-edit" action="#" className="popup__form" noValidate autoComplete="off">
            <button id="edit-close-button" aria-label="Закрыть" type="button" className="popup__close-button"></button>
            <h2 className="popup__title">Редактировать профиль</h2>
            <input required name="inputName" type="text" placeholder="Имя" className="popup__input popup__input_field_name" minLength="2" maxLength="40"/>
            <span className="popup__input-error"></span>
            <input required name="inputJob" type="text" placeholder="Вид деятельности" className="popup__input popup__input_field_job" minLength="2" maxLength="200"/>
            <span className="popup__input-error"></span>
            <button aria-label="Сохранить" type="submit" className="popup__save-button" id="edit-save-button">Сохранить</button>
          </form>
        </div>
      </div>
      <div id="add-popup" className="popup">
        <div className="popup__container">
          <form id="add-card-form" name="profile-add" action="#" className="popup__form" noValidate autoComplete="off">
            <button id="add-card-close-button" aria-label="Закрыть" type="button" className="popup__close-button"></button>
            <h2 className="popup__title">Новое место</h2>
            <input required name="newCardName" type="text" placeholder="Название" className="popup__input popup__input_field_card-name" minLength="2" maxLength="30"/>
            <span className="popup__input-error"></span>
            <input required name="newCardLink" type="url" placeholder="Ссылка на картинку" className="popup__input popup__input_field_card-link"/>
            <span className="popup__input-error"></span>
            <button aria-label="Создать" type="submit" className="popup__save-button" id="add-card-save-button">Создать</button>
          </form>
        </div>Name
      </div>
      <div id="photo-popup" className="popup">
        <div className="popup__photo-container">
          <button id="photo-card-close-button" aria-label="Закрыть" type="button" className="popup__close-button"></button>
          <figure className="popup__figure">
            <img className="popup__big-image" src="#" alt="Фотография большого размера"/>
            <figcaption className="popup__caption"></figcaption>
          </figure>
        </div>
      </div>
      <div id="delete-popup" className="popup">
        <div className="popup__container">
          <form id="delete-card-form" name="card-delete" action="#" className="popup__form" noValidate autoComplete="off">
            <button id="delete-card-close-button" aria-label="Закрыть" type="button" className="popup__close-button"></button>
            <h2 className="popup__title">Вы уверены?</h2>
            <button aria-label="Удалить" type="submit" className="popup__save-button" id="card-delete-button">Да</button>
          </form>
        </div>
      </div>
      <div id="edit-avatar-popup" className="popup">
        <div className="popup__container">
          <form id="edit-avatar-form" name="edit-avatar" action="#" className="popup__form" noValidate autoComplete="off">
            <button id="edit-avatar-close-button" aria-label="Закрыть" type="button" className="popup__close-button"></button>
            <h2 className="popup__title">Обновить аватар</h2>
            <input required name="newCardLink" type="url" placeholder="Ссылка на новый аватар" className="popup__input popup__input_field_avatar-link"/>
            <span className="popup__input-error"></span>
            <button aria-label="Обновить" type="submit" className="popup__save-button" id="edit-avatar-button">Сохранить</button>
          </form>
        </div>
      </div> */}
    </main>
  )
}

export default Main;