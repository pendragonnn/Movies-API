const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { UserModel } = require("../models/");
const random = require("random-string-generator");

require("dotenv").config();

class AuthController {
  static register = async (req, res) => {
    try {
      const { id, email, gender, password, role } = req.body;
      const userId = UserModel.addUser(id, email, gender, password, role);
      res.status(200).json({
        status: "success",
        meesage: `success adding new data with id ${userId}`,
      });
    } catch (error) {
      return res.status(500).json({
        status: "fail",
        message: `internal server error, ${error.message}`,
      });
    }
  };

  static login = async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await UserModel.getUserByEmail(email);

      const hash = crypto.pbkdf2Sync(
        password,
        process.env.PASSWORD_SALT,
        parseInt(process.env.PASSWORD_ITERATION),
        parseInt(process.env.PASSWORD_KEYLEN),
        process.env.PASSWORD_DIGEST
      );
      const enteredPassword = hash.toString("hex");

      if (user.length === 0)
        return res
          .status(404)
          .json({ status: "fail", message: "email not found" });

      const storedPassword = user[0].password;

      // console.log(storedPassword)
      // console.log(enteredPassword)

      if (storedPassword === enteredPassword) {
        const token = jwt.sign(req.body, process.env.TOKEN_KEYWORD, {
          expiresIn: "24h",
        });

        return res
          .status(200)
          .json({ status: "success", message: "login success", token });
      } else {
        return res
          .status(400)
          .json({ status: "fail", message: "wrong password" });
      }
    } catch (error) {
      return res.status(500).json({
        status: "fail",
        message: `internal server error, ${error.message}`,
      });
    }
  };

  static logout = (req, res) => {
    try {
      const randomToken = {
        email: random(20),
        password: random(20),
      };

      const randomJWTToken = jwt.sign(randomToken, "random");

      return res.json({
        statusCode: "200",
        message: "success logout",
        token: randomJWTToken,
      });
    } catch (error) {
      return res.status(500).json({
        status: "fail",
        message: `internal server error, ${error.message}`,
      });
    }
  };
}

module.exports = AuthController;
