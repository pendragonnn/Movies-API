const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/auth.controller");
const { verifyToken } = require("../middleware/tokenVerification");
const { userLoginValidator } = require("../middleware/dataValidator");

router.post("/register", AuthController.register);

router.post("/login", userLoginValidator, AuthController.login);

router.get("/logout", verifyToken, AuthController.logout);

module.exports = router;
