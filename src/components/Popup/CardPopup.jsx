function CardPopup(props) {
  return (
    <>
      <div className="movie__info-container">
        <div className="movie__image-container">
          <img
            width="250px"
            height="auto"
            src={"https://image.tmdb.org/t/p/w300" + props.movie.poster_path}
            alt={props.movie.title}
          />
        </div>
        <div className="movie__info">
          <div className="movie__text">{props.movie.overview}</div>
          <div className="movie__text">
            Fecha de lanzamiento: {props.movie.release_date}
          </div>
          <div className="movie__text">
            Calificación: {props.movie.vote_average}
          </div>
          <div className="movie__text">
            Votos recibidos: {props.movie.vote_count}
          </div>
        </div>
      </div>
    </>
  );
}

export default CardPopup;
