import trashImg from "../../../images/Trash.svg";
export function MovieFavCard(props) {
  const imageUrl = "https://image.tmdb.org/t/p/w300" + props.posterPath;

  function handleDeleteClick() {
    alert("Eliminar película de favoritos: " + props.id);
    if (props.handleDeleteMovie) {
      props.handleDeleteMovie(props.id);
    }
  }
  return (
    // <div className="cardContainer">
    <div className="movieFavCard__container">
      <img width={200} height={280} src={imageUrl} alt={props.title} />
      <div className="movieFavCard__title">{props.title}</div>
      <div className="movieFavCard__delete-button">
        <img
          src={trashImg}
          className="movieFavCard__delete-image"
          alt="Eliminar de favoritos"
          onClick={() => handleDeleteClick()}
        />
      </div>
    </div>
    // </div>
  );
}
