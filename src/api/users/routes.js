const express = require("express");
const router = express.Router();
const {
  getAllUserHandler,
  getUserByIdHandler,
  addUserHandler,
  updateUserHandler,
  deleteUserHandler,
} = require("./handler");

router.get("/", getAllUserHandler);

router.get("/:id", getUserByIdHandler);

router.post("/", addUserHandler);

router.put("/:id", updateUserHandler);

router.delete("/:id", deleteUserHandler);

module.exports = router;
