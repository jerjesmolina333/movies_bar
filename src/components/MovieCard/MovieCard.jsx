import CardPopup from "../Popup/CardPopup";
import Popup from "../Popup/Popup.jsx";

export function MovieCard({ movie, handleOpenPopupMovie, onClose, userData }) {
  const imageUrl = "https://image.tmdb.org/t/p/w300" + movie.poster_path;

  function handleCardClick() {
    const movieCardPopup = {
      movie: movie,
      onClose: onClose,
      userData: userData,
    };
    handleOpenPopupMovie(movieCardPopup);
  }
  return (
    <div className="cardContainer">
      <div className="movie__container">
        <img
          width={200}
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
