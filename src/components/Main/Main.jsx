import { useState } from "react";
import movies from "../../movies.json";
import { MovieCard } from "../MovieCard/MovieCard";

export default function Main() {
  const [currentIndex, setCurrentIndex] = useState(0);

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

  return (
    <div className="carousel">
      <button
        className="carousel__button carousel__button--prev"
        onClick={prevSlide}
      >
        ←
      </button>

      <div className="carousel__content">
        <MovieCard key={movies[currentIndex].id} movie={movies[currentIndex]} />
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
