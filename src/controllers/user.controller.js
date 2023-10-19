const { UserModel } = require("../models/");
const crypto = require("crypto");
require("dotenv");

class UserController {
  static showAllUsers = async (req, res) => {
    try {
      const { page, size } = req.query;

      const users = await UserModel.getAllUsers(page, size);

      if (users.length === 0)
        return res
          .status(404)
          .json({ status: "fail", message: `movie not found/empty` });

      res.status(200).json({
        status: "success",
        data: users,
      });
    } catch (error) {
      return res.status(500).json({
        status: "fail",
        message: `internal server error, ${error.message}`,
      });
    }
  };

  static showUserById = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await UserModel.getUserById(id);

      if (user.length === 0)
        return res
          .status(404)
          .json({ status: "fail", message: `user not found` });

      res.status(200).json({
        status: "success",
        data: user,
      });
    } catch (error) {
      return res.status(500).json({
        status: "fail",
        message: `internal server error, ${error.message}`,
      });
    }
  };

  static addUser = async (req, res) => {
    try {
      const { id, email, gender, password, role } = req.body;

      const emailExist = await UserModel.getUserByEmail(email);

      if (emailExist.length > 0)
        return res
          .status(409)
          .json({ status: "fail", message: `user ${email} already exist` });

      const encryptedPassword = crypto
        .pbkdf2Sync(
          password,
          process.env.PASSWORD_SALT,
          parseInt(process.env.PASSWORD_ITERATION),
          parseInt(process.env.PASSWORD_KEYLEN),
          process.env.PASSWORD_DIGEST
        )
        .toString("hex");
      const user = await UserModel.addUser(
        id,
        email,
        gender,
        encryptedPassword,
        role
      );

      res.status(200).json({
        status: "success",
        message: `Success Add User`,
        data: user,
      });
    } catch (error) {
      return res.status(500).json({
        status: "fail",
        message: `internal server error, ${error.message}`,
      });
    }
  };

  static editUser = async (req, res) => {
    try {
      const { id } = req.params;
      const { email, gender, password, role } = req.body;

      const emailExist = await UserModel.getUserByEmail(email);
      const userId = await UserModel.getUserById(id);

      if (userId.length === 0)
        return res
          .status(404)
          .json({ status: "fail", message: `user not found` });

      if (emailExist.length > 0)
        return res
          .status(409)
          .json({ status: "fail", message: `user ${email} already exist` });

      const encryptedPassword = crypto
        .pbkdf2Sync(
          password,
          process.env.PASSWORD_SALT,
          parseInt(process.env.PASSWORD_ITERATION),
          parseInt(process.env.PASSWORD_KEYLEN),
          process.env.PASSWORD_DIGEST
        )
        .toString("hex");

      const user = await UserModel.editUser(
        id,
        email,
        gender,
        encryptedPassword,
        role
      );

      res.status(200).json({
        status: "success",
        message: `Success Update User`,
        newData: user,
      });
    } catch (error) {
      return res.status(500).json({
        status: "fail",
        message: `internal server error, ${error.message}`,
      });
    }
  };

  static deleteUser = async (req, res) => {
    try {
      const id = req.params.id;

      const idExist = await UserModel.getUserById(id);

      if (idExist.length === 0)
        return res
          .status(404)
          .json({ status: "fail", message: `user not found` });

      const user = await UserModel.deleteUser(id);

      res.status(200).json({
        status: "success",
        message: `Success Delete User`,
        data: user,
      });
    } catch (error) {
      return res.status(500).json({
        status: "fail",
        message: `internal server error, ${error.message}`,
      });
    }
  };
}

module.exports = UserController;
