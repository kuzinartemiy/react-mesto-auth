function Card(props) {
  const card = props.cardData;

  const handleClick = () => {
    props.onCardClick(card);
  }

  return (
    <li className="place" key={props._id}>
      <button aria-label="Удалить" type="button" className="place__delete"></button>
      <img onClick={handleClick} src={card.link} alt={`Фотография ${card.name}`} className="place__image"/>
      <div className="place__info">
        <h2 className="place__title">{card.name}</h2>
        <div className="place__likes">
          <button aria-label="Нравится" type="button" className="place__like"></button>
          <span className="place__like-count">{card.likes.length}</span>
        </div>
      </div>
    </li>
  )
}

export default Card;