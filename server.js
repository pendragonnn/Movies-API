const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const swaggerUi = require("swagger-ui-express");
const apiDocumentation = require("./src/doc/apidocs.json");
const router = require("./src/routes/index");
const errorHandler = require("./src/middleware/errorHandler");
require("dotenv").config();

const app = express();

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(apiDocumentation));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("tiny"));

app.use(router);

app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});
