const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controller");
const { userValidator } = require("../middleware/dataValidator");

router.get("/", UserController.showAllUsers);

router.get("/:id", UserController.showUserById);

router.post("/", userValidator, UserController.addUser);

router.put("/:id", userValidator, UserController.editUser);

router.delete("/:id", UserController.deleteUser);

module.exports = router;
