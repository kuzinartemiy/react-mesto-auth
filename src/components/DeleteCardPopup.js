import PopupWithForm from "./PopupWithForm";

function DeleteCardPopup(props) {

  const handleSubmit = (e) => {
    e.preventDefault();

    props.onDeleteCard(props.card);
  }

  return(
    <PopupWithForm
      title="Вы уверены?"
      name='delete-card'
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    />
  )
}

export default DeleteCardPopup;