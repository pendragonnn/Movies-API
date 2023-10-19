const express = require("express");
const router = express.Router();
const { MovieController } = require("../controllers/");
const { movieValidator } = require("../middleware/dataValidator");
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

// for access http://localhost:3000/movie/upload/{{img-name}}
router.use(
  "/upload",
  express.static(path.join(__dirname, "../upload/movie/"))
);

router.get("/", MovieController.showAllMovies);

router.get("/:id", MovieController.showMovieById);

router.post("/", movieValidator, MovieController.addMovie);

router.put( 
  "/upload",
  multer({ storage: diskStorage }).single("movie-poster"),
  (req, res) => {
    const file = req.file.path;
    if (!file) {
      res.status(400).send({ status: "false", data: "No File is selected" });
    }
    
    res.status(200).json({ status: 'success', data: file });
  }
);

router.put("/:id", movieValidator, MovieController.editMovie);

router.delete("/:id", MovieController.deleteMovie);

module.exports = router;
