const { movieSchema, userLoginSchema, userSchema } = require("../schema");

const userLoginValidator = (req, res, next) => {
  const dataToValidate = req.body;

  const { error } = userLoginSchema.validate(dataToValidate);

  if (error) {
    const errorMessage = error.details
      .map((detail) => detail.message)
      .join(", ");
    return res
      .status(400)
      .json({ status: "fail", message: `login failed, ${errorMessage}` });
  }

  next();
};

const movieValidator = (req, res, next) => {
  const dataToValidate = req.body;

  console.log(req.body);

  const { error } = movieSchema.validate(dataToValidate);

  if (error) {
    const errorMessage = error.details
      .map((detail) => detail.message)
      .join(", ");
    return res
      .status(400)
      .json({ status: "fail", message: `login failed, ${errorMessage}` });
  }

  next();
};

const userValidator = (req, res, next) => {
  const dataToValidate = req.body;

  const { error } = userSchema.validate(dataToValidate);

  if (error) {
    const errorMessage = error.details
      .map((detail) => detail.message)
      .join(", ");
    return res
      .status(400)
      .json({ status: "fail", message: `login failed, ${errorMessage}` });
  }

  next();
};

module.exports = {
  movieValidator,
  userValidator,
  userLoginValidator,
};
