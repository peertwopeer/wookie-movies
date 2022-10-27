const db_connect = require("../../config/db");
module.exports = {
  getMovies: async (req, res) => {
    let db = db_connect.getDB();
    let genresList = [];
    let genreCursor = db
      .collection("movies")
      .find({})
      .project({ genres: 1, _id: 0 });
    await genreCursor.forEach(
      (doc) =>
        (genresList = genresList.concat(
          doc.genres.filter((item) => genresList.indexOf(item) < 0)
        ))
    );
    let movies = [];

    for await (const genre of genresList) {
      let movie = db.collection("movies").find({ genres: genre });
      let movieByGenre = {
        genres: genre,
        movies: [],
      };
      await movie.forEach((doc) => {
        movieByGenre.movies.push({
          director: doc.director,
          imdb_rating: doc.imdb_rating,
          length: doc.length,
          poster: doc.poster,
          title: doc.title,
        });
      });
      movies.push(movieByGenre);
    }
    res.json(movies);
  },
};
