export class Api {
  insertMovie(data) {
    const tempURL = `https://api.jerjesm.online/movies/+${data.id}/images`;
    const jsonParam = JSON.stringify({
      name: data.name,
      link: data.link,
    });
    const objParams = {
      method: "POST",
      headers: {
        ...this._headers.headers,
        "Content-Type": "application/json",
      },
      body: jsonParam,
    };
    return fetch(tempURL, objParams)
      .then(function (res) {
        return res.json();
      })
      .catch(function (error) {
        return Promise.reject(`Error: ${error}`);
      });
  }
  getInfoMovie(movie_id) {
    return fetch(`https://api.themoviedb.org/3/movie/${movie_id}`, {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4N2U2NmQzMzZhOWE1ODYyYzkyODc3YzdlNDI1MGRhYSIsIm5iZiI6MTY1NjcyMTQ0Mi4zNjksInN1YiI6IjYyYmY5MDIyYWY2ZTk0MDQ2YzcwODFhYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6grAS3cQauiJqTi6k6qjKYVLxFRerPWbdojAXEjKEfc",
        "Content-Type": "application/json;charset=utf-8",
      },
    })
      .then((result) => result.json())
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.error("Error al cargar película:", error);
      });
  }
}
