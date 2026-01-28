import { MovieFavCard } from "../movieFavCard/movieFavCard";
import btnCerrar from "../../../images/BotonCerrar.png";

export default function FavsPopup({ moviesList, onClose }) {
  console.log("moviesList en FavsPopup:", moviesList);

  function cierraVentanaBoton() {
    if (onClose) {
      onClose();
    }
  }

  return (
    <div className="favs__container">
      <div className="favs__header">
        <h2>Películas Favoritas</h2>
        <img
          className="favsPopup__cerrar"
          src={btnCerrar}
          alt="Imagen botón cerrar"
          onClick={() => cierraVentanaBoton()}
        />
      </div>
      {moviesList?.map((movie) => (
        <MovieFavCard
          key={movie._id || movie.id}
          title={movie.title}
          posterPath={movie.posterPath}
          onClose={onClose}
        />
      ))}
    </div>
  );
}
