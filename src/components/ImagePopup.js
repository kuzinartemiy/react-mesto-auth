function ImagePopup(props) {

  const handleClick = () => {
    props.onClose();
  }

  const stateClassName = `popup ${props.card ? 'popup_opened' : '' } `;

  return(
    <div id="photo-popup" className={stateClassName}>
      <div className="popup__photo-container">
        <button onClick={handleClick} id="photo-card-close-button" aria-label="Закрыть" type="button" className="popup__close-button"></button>
        <figure className="popup__figure">
          <img className="popup__big-image" src={props.card.link} alt="Фотография большого размера"/>
          <figcaption className="popup__caption">{props.card.name}</figcaption>
        </figure>
      </div>
    </div>
  )
}

export default ImagePopup;