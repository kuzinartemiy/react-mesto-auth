import PopupWithForm from "./PopupWithForm";

function DeleteCardPopup(props) {

  const handleSubmit = (e) => {
    e.preventDefault();

    props.onDeleteCard(props.card);
  }

  const stateButtonValue = `${props.isLoading ? 'Удаление...' : 'Да'}`

  return(
    <PopupWithForm
      title="Вы уверены?"
      name='delete-card'
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <button aria-label="Удалить" type="submit" className="popup__save-button" id="edit-save-button">{stateButtonValue}</button>
    </PopupWithForm>
  )
}

export default DeleteCardPopup;