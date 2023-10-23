const express = require("express");
const router = express.Router();
const { MovieController } = require("../controllers/");
const { movieValidator } = require("../middleware/dataValidator");
const path = require("path");

// for access http://localhost:3000/movie/upload/{{img-name}}
router.use(
  "/upload",
  express.static(path.join(__dirname, "../upload/movie/"))
);

router.get("/", MovieController.showAllMovies);

router.get("/:id", MovieController.showMovieById);

router.post("/", movieValidator, MovieController.addMovie);

router.put("/upload", MovieController.uploadPosterMovie);

router.put("/:id", movieValidator, MovieController.editMovie);

router.delete("/:id", MovieController.deleteMovie);

module.exports = router;
