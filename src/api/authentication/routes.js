const express = require('express')
const router = express.Router()
const { loginHandler, logoutHandler, registerHandler } = require('./handler')
const { verifyToken } = require('../../middleware/tokenVerification')

router.post('/register', registerHandler)
router.post('/login', loginHandler) 
router.get('/logout', verifyToken, logoutHandler)

module.exports = router