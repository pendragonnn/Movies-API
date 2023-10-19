const { MovieRepository } = require("../repositories/");

class MovieModel {
  constructor(title, genres, year) {
    this.title = title;
    this.genres = genres;
    this.year = year;
  }

  static getAllMovies = async (page, size) => {
    const result = await MovieRepository.getAllMovies(page, size);

    return result.map(
      (movie) => new MovieModel(movie.title, movie.genres, movie.year)
    );
  };

  static getMovieById = async (id) => {
    const result = await MovieRepository.getMovieById(id);

    return result.map(
      (movie) => new MovieModel(movie.title, movie.genres, movie.year)
    );
  };

  static getMovieByName = async (title) => {
    const result = await MovieRepository.getMovieByName(title);

    return result.map(
      (movie) => new MovieModel(movie.title, movie.genres, movie.year)
    );
  };

  static addMovie = async (id, title, genres, year) => {
    const result = await MovieRepository.addMovie(id, title, genres, year);

    return result.map(
      (movie) => new MovieModel(movie.title, movie.genres, movie.year)
    );
  };

  static editMovie = async (id, title, genres, year) => {
    const result = await MovieRepository.editMovie(id, title, genres, year);

    return result.map(
      (movie) => new MovieModel(movie.title, movie.genres, movie.year)
    );
  };

  static deleteMovie = async (id) => {
    const result = await MovieRepository.deleteMovie(id);

    return result.map(
      (movie) => new MovieModel(movie.title, movie.genres, movie.year)
    );
  };
}

module.exports = MovieModel;
