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
      buttonText={stateButtonValue}
    />
  )
}

export default DeleteCardPopup;