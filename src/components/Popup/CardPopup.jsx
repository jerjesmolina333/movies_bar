import Popup from "./Popup.jsx";
import btnCerrar from "../../../images/BotonCerrar.png";
import imgLike from "../../../images/Like.png";
import { getToken } from "../utils/token.js";
import { Api } from "../Api/Api.js";

export default function CardPopup(props) {
  const api = new Api();
  const { movie, onClose, userData, onMovieAdded } = props;

  function cierraVentanaBoton() {
    if (onClose) {
      onClose();
    }
  }

  function insertMovie({ data }) {

    const tempURL = "https://api.jerjesm.online/movies/";


    const jwt = getToken();
    const jsonParam = JSON.stringify({
      title: data.title,
      overView: data.overview,
      posterPath: `https://image.tmdb.org/t/p/w300${data.poster_path}`,
      release_date: data.release_date,
      vote_average: data.vote_average,
      vote_count: data.vote_count,
    });
    const objParams = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
      body: jsonParam,
    };
    return fetch(tempURL, objParams)
      .then(function (res) {
        if (!res.ok) {
          return res.text().then((text) => {
            console.error("❌ Error response:", text);
            throw new Error(`HTTP ${res.status} ${res.statusText}: ${text}`);
          });
        }
        const contentType = res.headers.get("content-type") || "";
        if (contentType.includes("application/json")) {
          return res.json().then((jsonData) => {
            return jsonData;
          });
        }
        return res.text().then((text) => {
          throw new Error(`Respuesta no JSON del servidor: ${text}`);
        });
      })
      .catch(function (error) {
        console.error("❌ insertMovie error:", error);
        return Promise.reject(`Error: ${error}`);
      });
  }

  async function handleLike(movie_id) {
    try {
      const data = await api.getInfoMovie(movie_id);
      await insertMovie({ data, userData });

      // Actualizar la lista de películas
      if (onMovieAdded) {
        await onMovieAdded();
      }

      alert("¡Película agregada a favoritos!");
    } catch (error) {
      console.error("Error al obtener información de la película:", error);
      alert("Error al agregar película a favoritos");
    }
  }

  return (
    <>
      <div className="movie_overlay">
        <img
          className="popup__cerrar"
          src={btnCerrar}
          alt="Imagen botón cerrar"
          onClick={() => cierraVentanaBoton()}
        />
        <div className="popup__heading">{movie.title}</div>
        <div className="movie__info-container">
          <div className="movie__image-container">
            <img
              width="250px"
              height="auto"
              src={"https://image.tmdb.org/t/p/w300" + movie.poster_path}
              alt={movie.title}
            />
          </div>
          <div className="movie__info">
            <div className="movie__text">{movie.overview}</div>
            <div className="movie__text">
              Fecha de lanzamiento: {movie.release_date}
            </div>
            <div className="movie__text">
              Calificación: {movie.vote_average}
            </div>
            <div className="movie__text">
              Votos recibidos: {movie.vote_count}
            </div>
          </div>
          <div>
            <img
              className="movie__like-button"
              src={imgLike}
              alt="Imagen like"
              onClick={() => handleLike(movie.id)}
            />
          </div>
        </div>
      </div>
    </>
  );
}
