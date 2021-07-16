import React from 'react';


function PopupWithForm (props) {
  
  const handleClick = () => {
    props.onClose();
  }

  const stateClassName = `popup ${props.isOpen ? 'popup_opened' : '' } `;
  
  return(
    <div className={stateClassName}>
      <div className="popup__container">
        <form onSubmit={props.onSubmit} name={props.name} action="#" className="popup__form" autoComplete="off">
          <button onClick={handleClick} aria-label="Закрыть" type="button" className="popup__close-button"></button>
          <h2 className="popup__title">{props.title}</h2>
          {props.children}
          <button aria-label="Сохранить" type="submit" className="popup__save-button">{props.buttonText}</button>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm;