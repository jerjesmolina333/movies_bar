import Popup from "./Popup.jsx";
import btnCerrar from "../../../images/BotonCerrar.png";
import imgLike from "../../../images/Like.png";
import { getToken } from "../utils/token.js";
import { Api } from "../Api/Api.js";

export default function CardPopup(props) {
  const api = new Api();
  const { movie, onClose, userData } = props;

  function cierraVentanaBoton() {
    if (onClose) {
      onClose();
    }
  }

  function insertMovie({ data, userData }) {
    // console.log("===insertMovie userData:", userData);
    // console.log("===insertMovie userData._id:", userData._id);
    // console.log("===insertMovie data:", data);
    const tempURL = "https://api.jerjesm.online/movies/";
    // const tempURL = "https://jerjesm.online/movies/";
    // const tempURL = "/api-movies/movies";

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
        console.log("✅ insertMovie response status:", res.status);
        if (!res.ok) {
          return res.text().then((text) => {
            console.error("❌ Error response:", text);
            throw new Error(`HTTP ${res.status} ${res.statusText}: ${text}`);
          });
        }
        const contentType = res.headers.get("content-type") || "";
        if (contentType.includes("application/json")) {
          return res.json().then((jsonData) => {
            console.log("✅ insertMovie success response:", jsonData);
            return jsonData;
          });
        }
        return res.text().then((text) => {
          console.log("⚠️ Response is not JSON:", text);
          throw new Error(`Respuesta no JSON del servidor: ${text}`);
        });
      })
      .catch(function (error) {
        console.error("❌ insertMovie error:", error);
        return Promise.reject(`Error: ${error}`);
      });
  }

  async function handleLike(movie_id) {
    await api
      .getInfoMovie(movie_id)
      .then((data) => {
        insertMovie({ data, userData });
      })
      .catch((error) => {
        console.error("Error al obtener información de la película:", error);
      });
  }

  return (
    <>
      {/* {console.log("CardPopup props.movie:", props.movie)}
      {console.log("CardPopup props.id:", props.id)} */}
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
