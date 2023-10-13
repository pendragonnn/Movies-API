const express = require("express");
const router = express.Router();
const {
  getAllFilmHandler,
  getFilmByIdHandler,
  addFilmHandler,
  updateFilmHandler,
  deleteFilmHandler,
} = require("./handler");

router.get("/", getAllFilmHandler);

router.get("/:id", getFilmByIdHandler);

router.post("/", addFilmHandler);

router.put("/:id", updateFilmHandler);

router.delete("/:id", deleteFilmHandler);

module.exports = router;
