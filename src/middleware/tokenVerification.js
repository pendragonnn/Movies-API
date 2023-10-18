const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = (req, res, next) => {
  const token = req.header("Authorization")
    ? req.header("Authorization").split(" ")[1]
    : null;

  if (token == null)
    return res.status(401).json({
      statusCode: 401,
      message: "unauthorized",
    });

  jwt.verify(token, process.env.TOKEN_KEYWORD, (err, decoded) => {
    if (err)
      return res.status(403).json({
        statusCode: 403,
        message: "forbidden",
      });

    next();
  });
};

module.exports = { verifyToken };
