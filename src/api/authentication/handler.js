const jwt = require('jsonwebtoken')
const { getUserByEmail, addUserService } = require('../../services/userService')
const { errorHandling } = require('../../exception/errorHandling')
require('dotenv').config()

const validator = async(email, password) => {
  const user = await getUserByEmail(email)

  if(user.length !== 0) {
    if(user[0].password !== password) {
      return { status: 'fail', message: 'wrong password'}
    }
  
     if(user[0].email === email && user[0].password === password) {
      return { status: 'success', message: 'login success'}
    } 
  } else {
    return { status: 'fail', message: 'email not found'}
  }
}

const loginHandler = async(req, res) => {
  const { email, password } = req.body 

  const validate = await validator(email, password)

  if(validate.status === 'fail') {
    res.status(404).json({ statusCode: '404', validate }) 
  } else {
    const token = jwt.sign(req.body, process.env.TOKEN_KEYWORD, {
      expiresIn: '1h'
    })
    res.cookie('token',token, {
      httpOnly: true,
    })
    
    res.status(200).json({ statusCode: '200', validate, token })
  }
}

const registerHandler = async(req, res) => {
  const { id, email, gender, password, role } = req.body
  const userId = await addUserService(id, email, gender, password, role)

  errorHandling(res, userId)
}

const logoutHandler = async(req, res) => { 
  res.clearCookie('token')

  return res.json({
    statusCode: '200',
    message: 'success logout',
  })
}

module.exports = { 
  loginHandler,
  logoutHandler,
  registerHandler
}