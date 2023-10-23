const { MovieModel } = require("../models/");
const multer = require("multer");
const path = require("path");

const diskStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../upload/movie"));
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

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
      return res.status(500).json({
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
      return res.status(500).json({
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

      const movie = await MovieModel.addMovie(id, title, genres, year);

      res.status(200).json({
        status: "success",
        message: `Success Add Movie`,
        data: movie,
      });
    } catch (error) {
      return res.status(500).json({
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
      const movieId = await MovieModel.getMovieById(id);

      if (movieId.length === 0)
        return res
          .status(404)
          .json({ status: "fail", message: `movie not found` });

      if (movieExist.length !== 0)
        return res
          .status(409)
          .json({ status: "fail", message: `movie ${title} already exist` });

      const movie = await MovieModel.editMovie(id, title, genres, year);

      res.status(200).json({
        status: "success",
        message: `Success Update Movie`,
        newData: movie,
      });
    } catch (error) {
      return res.status(500).json({
        status: "fail",
        message: `internal server error, ${error.message}`,
      });
    }
  };

  static uploadPosterMovie = async (req, res) => {
    const upload = multer({ storage: diskStorage }).single("movie-poster");
    upload(req, res, (err) => {
      if (err) {
        return res.status(500).json({ status: "error", data: err.message });
      }

      const file = req.file.path;
      if (!file) {
        res.status(400).send({ status: "false", data: "No File is selected" });
      }

      res.status(200).json({ status: "success", data: file });
    });
  };

  static deleteMovie = async (req, res) => {
    try {
      const id = req.params.id;

      const idExist = await MovieModel.getMovieById(id);

      if (idExist.length === 0)
        return res
          .status(404)
          .json({ status: "fail", message: `movie not found` });

      const movie = await MovieModel.deleteMovie(id);

      res.status(200).json({
        status: "success",
        message: `Success Delete Movie`,
        deletedData: movie,
      });
    } catch (error) {
      return res.status(500).json({
        status: "fail",
        message: `internal server error, ${error.message}`,
      });
    }
  };
}

module.exports = MovieController;
