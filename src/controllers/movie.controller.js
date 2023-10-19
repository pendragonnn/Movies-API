const { MovieModel } = require("../models/");

class MovieController {
  static showAllMovies = async (req, res) => {
    try {
      const { page, size } = req.query;

      const movies = await MovieModel.getAllMovies(page, size);

      if (movies.length === 0)
        return res
          .status(404)
          .json({ status: "fail", message: `data not found/empty` });

      res.status(200).json({
        status: "success",
        data: movies,
      });
    } catch (error) {
      return res
        .status(500)
        .json({
          status: "fail",
          message: `internal server error, ${error.message}`,
        });
    }
  };

  static showMovieById = async (req, res) => {
    try {
      const { id } = req.params;
      const movie = await MovieModel.getMovieById(id);

      if (movie.length === 0)
        return res
          .status(404)
          .json({ status: "fail", message: `movie not found` });

      res.status(200).json({
        status: "success",
        data: movie,
      });
    } catch (error) {
      return res
        .status(500)
        .json({
          status: "fail",
          message: `internal server error, ${error.message}`,
        });
    }
  };

  static addMovie = async (req, res) => {
    try {
      const { id, title, genres, year } = req.body;
      const movieExist = await MovieModel.getMovieByName(title);
      const idExist = await MovieModel.getMovieById(id);

      if (movieExist.length > 0 || idExist.length > 0)
        return res
          .status(409)
          .json({ status: "fail", message: `movie ${title} already exist` });

      const movieId = await MovieModel.addMovie(id, title, genres, year);

      res.status(200).json({
        status: "success",
        message: `Success Add Movie With ID ${movieId}`,
      });
    } catch (error) {
      return res
        .status(500)
        .json({
          status: "fail",
          message: `internal server error, ${error.message}`,
        });
    }
  };

  static editMovie = async (req, res) => {
    try {
      const { id } = req.params;
      const { title, genres, year } = req.body;

      const movieExist = await MovieModel.getMovieByName(title);
      const movie = await MovieModel.getMovieById(id);

      if (movie.length === 0)
        return res
          .status(404)
          .json({ status: "fail", message: `movie not found` });

      if (movieExist.length !== 0)
        return res
          .status(409)
          .json({ status: "fail", message: `movie ${title} already exist` });

      const movieId = await MovieModel.editMovie(id, title, genres, year);

      res.status(200).json({
        status: "success",
        message: `Success Update Movie With ID ${movieId}`,
      });
    } catch (error) {
      return res
        .status(500)
        .json({
          status: "fail",
          message: `internal server error, ${error.message}`,
        });
    }
  };

  static deleteMovie = async (req, res) => {
    try {
      const id = req.params.id;

      const idExist = await MovieModel.getMovieById(id);

      if (idExist.length === 0)
        return res
          .status(404)
          .json({ status: "fail", message: `movie not found` });

      const movieId = await MovieModel.deleteMovie(id);

      res.status(200).json({
        status: "success",
        message: `Success Delete Movie With ID ${movieId}`,
      });
    } catch (error) {
      return res
        .status(500)
        .json({
          status: "fail",
          message: `internal server error, ${error.message}`,
        });
    }
  };
}

module.exports = MovieController;
