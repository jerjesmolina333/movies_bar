import { useState, useEffect } from "react";
// import movies from "../../movies.json";
import { MovieCard } from "../MovieCard/MovieCard";

export default function Main(props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch("https://api.themoviedb.org/3/discover/movie", {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4N2U2NmQzMzZhOWE1ODYyYzkyODc3YzdlNDI1MGRhYSIsIm5iZiI6MTY1NjcyMTQ0Mi4zNjksInN1YiI6IjYyYmY5MDIyYWY2ZTk0MDQ2YzcwODFhYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6grAS3cQauiJqTi6k6qjKYVLxFRerPWbdojAXEjKEfc",
        "Content-Type": "application/json;charset=utf-8",
      },
    })
      .then((result) => result.json())
      .then((data) => {
        setMovies(data.results);
        // console.log("Películas cargadas: ", movies);
      })
      .catch((error) => {
        console.error("Error al cargar películas:", error);
      });
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? movies.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === movies.length - 1 ? 0 : prevIndex + 1
    );
  };

  if (movies.length === 0) {
    return <div className="carousel">Cargando películas...</div>;
  }

  return (
    <div className="carousel">
      <button
        className="carousel__button carousel__button--prev"
        onClick={prevSlide}
      >
        ←
      </button>

      <div className="carousel__content">
        <MovieCard
          cardKey={movies[currentIndex].id}
          movie={movies[currentIndex]}
          handleOpenPopup={props.handleOpenPopup}
        />
      </div>

      <button
        className="carousel__button carousel__button--next"
        onClick={nextSlide}
      >
        →
      </button>

      <div className="carousel__indicators">
        {movies.map((_, index) => (
          <button
            key={index}
            className={`carousel__indicator ${
              index === currentIndex ? "carousel__indicator--active" : ""
            }`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Ir a película ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
