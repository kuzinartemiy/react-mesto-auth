import { useRef } from "react";
import PopupWithForm from "./PopupWithForm";


function EditAvatarPopup(props) {

  const avatarLinkRef = useRef('');

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarLinkRef.current.value
    })
    avatarLinkRef.current.value = '';
  }

  const stateButtonValue = `${props.isLoading ? 'Сохранение...' : 'Сохранить'}`
  
  return(
    <PopupWithForm 
      title='Обновить аватар' 
      name='edit-avatar' 
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      buttonText={stateButtonValue}
    >
      <input ref={avatarLinkRef} required name="newCardLink" type="url" placeholder="Ссылка на новый аватар" className="popup__input popup__input_field_avatar-link"/>
      <span className="popup__input-error"/>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;