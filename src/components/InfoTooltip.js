

function InfoTooltip(props) {

  const handleClick = () => {
    props.onClose();
  }

  const statePopupClassName = `popup ${props.isOpen ? 'popup_opened' : ''}`;
  const stateLogoClassName = `popup__logo ${props.isSuccess ? 'popup__logo_type_success' : 'popup__logo_type_fail'}`;

  return (
    <div className={statePopupClassName}>
      <div className="popup__container">
        <button onClick={handleClick} aria-label="Закрыть" type="button" className="popup__close-button"></button>
        <div className={stateLogoClassName}></div>
        <p className="popup__title popup__title_type_info">{props.isSuccess ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте еще раз.'}</p>
      </div>
    </div>
  )
}

export default InfoTooltip