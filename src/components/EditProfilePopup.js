import { useEffect, useState, useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup(props) {

  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  const handleChangeName = (e) => {
    setName(e.target.value);
  }

  const handleChangeDescription = (e) => {
    setDescription(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    
    props.onUpdateUser({
      name : name,
      about: description
    });
  }

  return (
    <PopupWithForm 
        title='Редактировать профиль' 
        name='profile-edit' 
        isOpen={props.isOpen}
        onClose={props.onClose}
        onSubmit={handleSubmit}
      >
        <input value={name} onChange={handleChangeName} required name="inputName" type="text" placeholder="Имя" className="popup__input popup__input_field_name" minLength="2" maxLength="40"/>
        <span className="popup__input-error"/>
        <input value={description} onChange={handleChangeDescription} required name="inputJob" type="text" placeholder="Вид деятельности" className="popup__input popup__input_field_job" minLength="2" maxLength="200"/>
        <span className="popup__input-error"/>
    </PopupWithForm>
  )
}

export default EditProfilePopup;