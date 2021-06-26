import React from 'react';


function PopupWithForm (props) {
  
  const handleClick = () => {
    props.onClose();
  }

  const stateClassName = `popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : '' } `;
  
  return(
    <div className={stateClassName}>
      <div className="popup__container">
        <form onSubmit={props.onSubmit} id="edit-form" name={props.name} action="#" className="popup__form" noValidate autoComplete="off">
          <button onClick={handleClick} id="edit-close-button" aria-label="Закрыть" type="button" className="popup__close-button"></button>
          <h2 className="popup__title">{props.title}</h2>
          {props.children}
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm;