import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
  const card = props.cardData;
  console.log(card);

  const currentUser = useContext(CurrentUserContext);

  const handleClick = () => {
    props.onCardClick(card);
  }

  const handleDeleteClick = () => {
    props.onCardDeleteClick(card);
  }

  const isOwn = card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = `place__delete ${isOwn ? 'place__delete_active' : ''}`;

  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = `place__like ${isLiked ? 'place__like_active' : ''}`; 

  const handleLikeClick = () => {
    props.onCardLike(card);
  }

  return (
    <li className="place" key={props._id}>
      <button onClick={handleDeleteClick} aria-label="Удалить" type="button" className={cardDeleteButtonClassName}></button>
      <img onClick={handleClick} src={card.link} alt={`Фотография ${card.name}`} className="place__image"/>
      <div className="place__info">
        <h2 className="place__title">{card.name}</h2>
        <div className="place__likes">
          <button onClick={handleLikeClick} aria-label="Нравится" type="button" className={cardLikeButtonClassName}></button>
          <span className="place__like-count">{card.likes.length}</span>
        </div>
      </div>
    </li>
  )
}

export default Card;