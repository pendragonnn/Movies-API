const { MovieRepository } = require('../repositories/')

class MovieModel {
  static getAllMovies = async (page, size) => {
    return await MovieRepository.getAllMovies(page, size)
  };

  static getMovieById = async (id) => {
    return await MovieRepository.getMovieById(id);
  };

  static getMovieByName = async (title) => {
    return await MovieRepository.getMovieByName(title);
  };

  static addMovie = async (id, title, genres, year) => {
    return await MovieRepository.addMovie(id, title, genres, year)
  };

  static editMovie = async (id, title, genres, year) => {
    return await MovieRepository.editMovie(id, title, genres, year)
  };

  static deleteMovie = async (id) => {
    return await MovieRepository.deleteMovie(id)
  };
}

module.exports = MovieModel;
