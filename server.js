const express = require('express')
const films = require('./src/api/films/routes')
const users = require('./src/api/users/routes')
const authentications = require('./src/api/authentication/routes')
const { verifyToken } = require('./src/middleware/tokenVerification')
const bodyParser = require('body-parser');
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const swaggerJsdoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
const apiDocumentation = require('./src/doc/apidocs.json')
require('dotenv').config()

const app = express()

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(apiDocumentation))
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('tiny'))
app.use(cookieParser());

app.use('/users', verifyToken, users)
app.use('/films', verifyToken, films)
app.use('/', authentications)
app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`)
})