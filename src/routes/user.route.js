const express = require("express");
const router = express.Router();
const { UserController } = require("../controllers/");
const { userValidator } = require("../middleware/dataValidator");
const path = require('path')

router.use(
  "/upload",
  express.static(path.join(__dirname, "../upload/user/"))
);

router.get("/", UserController.showAllUsers);

router.get("/:id", UserController.showUserById);

router.post("/", userValidator, UserController.addUser);

router.put( "/upload", UserController.uploadProfilePhoto);

router.put("/:id", userValidator, UserController.editUser);

router.delete("/:id", UserController.deleteUser);

module.exports = router;
