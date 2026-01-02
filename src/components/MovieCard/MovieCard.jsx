function mensajeCl() {
  alert("Haz hecho click en la imagen");
}

export function MovieCard({ movie }) {
  const imageUrl = "https://image.tmdb.org/t/p/w300" + movie.poster_path;
  return (
    <div className="cardContainer">
      <div className="movie__container">
        <img
          width={150}
          src={imageUrl}
          alt={movie.title}
          onClick={() => mensajeCl()}
        />
      </div>
      <li className="cardsList__item">
        <div className="movie__title">{movie.title}</div>
      </li>
    </div>
  );
}
