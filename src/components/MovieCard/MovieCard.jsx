import CardPopup from "../Popup/CardPopup";
import Popup from "../Popup/Popup.jsx";

export function MovieCard(props) {
  const { cardKey, movie, handleOpenPopup } = props;
  const imageUrl = "https://image.tmdb.org/t/p/w300" + movie.poster_path;
  const movieCardPopup = {
    title: movie.title,
    children: <CardPopup movie={movie} />,
  };

  function handleCardClick() {
    // alert("Diste click en la película: " + movie.title);
    handleOpenPopup(movieCardPopup);
  }
  return (
    <div className="cardContainer">
      <div className="movie__container">
        <img
          width={150}
          src={imageUrl}
          alt={movie.title}
          onClick={() => handleCardClick()}
        />
      </div>
      <li className="cardsList__item">
        <div className="movie__title">{movie.title}</div>
      </li>
    </div>
  );
}
