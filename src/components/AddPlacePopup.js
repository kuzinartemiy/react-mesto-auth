import { useState } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {

  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleChangeLink = (e) => {
    setLink(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    props.onAddPlace({
      name: name,
      link: link
    });
  };

  const stateButtonValue = `${props.isLoading ? 'Добавление...' : 'Добавить'}`

  return (
    <PopupWithForm 
        title='Новое место' 
        name='add-card' 
        isOpen={props.isOpen}
        onClose={props.onClose}
        onSubmit={handleSubmit}
      >
        <input value={name} onChange={handleChangeName} required name="newCardName" type="text" placeholder="Название" className="popup__input popup__input_field_card-name" minLength="2" maxLength="30"/>
        <span className="popup__input-error"/>
        <input value={link} onChange={handleChangeLink} required name="newCardLink" type="url" placeholder="Ссылка на картинку" className="popup__input popup__input_field_card-link"/>
        <span className="popup__input-error"/>
        <button aria-label="Сохранить" type="submit" className="popup__save-button" id="edit-save-button">{stateButtonValue}</button>
    </PopupWithForm>
  );
};

export default AddPlacePopup;