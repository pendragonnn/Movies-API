const express = require("express");
const movieRouter = require("./movie.route");
const userRouter = require("./user.route");
const authRouter = require("./auth.route");
const { verifyToken } = require("../middleware/tokenVerification");

const router = express.Router();

router.use("/movies", verifyToken, movieRouter);

router.use("/users", verifyToken, userRouter);

router.use("/auth", authRouter);

module.exports = router;
