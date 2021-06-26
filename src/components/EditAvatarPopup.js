import { useRef } from "react";
import PopupWithForm from "./PopupWithForm";


function EditAvatarPopup(props) {

  const avatarLinkRef = useRef('');

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarLinkRef.current.value
    })
  }
  
  return(
    <PopupWithForm 
      title='Обновить аватар' 
      name='edit-avatar' 
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input ref={avatarLinkRef} required name="newCardLink" type="url" placeholder="Ссылка на новый аватар" className="popup__input popup__input_field_avatar-link"/>
      <span className="popup__input-error"/>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;