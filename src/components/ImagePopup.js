function ImagePopup(props) {

  const handleClick = () => {
    props.onClose();
  }

  const stateClassName = `popup ${props.isOpen ? 'popup_opened' : '' } `;
  const stateImgSrc = `${props.card ? props.card.link : '#' } `;
  const stateImgName = `${props.card ? props.card.name : '' } `;

  return(
    <div id="photo-popup" className={stateClassName}>
      <div className="popup__photo-container">
        <button onClick={handleClick} id="photo-card-close-button" aria-label="Закрыть" type="button" className="popup__close-button"/>
        <figure className="popup__figure">
          <img className="popup__big-image" src={stateImgSrc} alt="Фотография большого размера"/>
          <figcaption className="popup__caption">{stateImgName}</figcaption>
        </figure>
      </div>
    </div>
  )
}

export default ImagePopup;