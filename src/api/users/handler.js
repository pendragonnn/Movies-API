const { 
  getAllUserService, 
  getUserByIdService,
  addUserService,
  updateUserService,
  deleteUserService
  } = require('../../services/userService')

const { errorHandling } = require('../../exception/errorHandling')

const getAllUserHandler = async(req, res) => {
  const { page, size } = req.query

  const users = await getAllUserService(page, size)
  
  errorHandling(res, users)
}

const getUserByIdHandler = async(req, res) => {
  const { id } = req.params
  const userId = await getUserByIdService(id)

  errorHandling(res, userId)
}

const addUserHandler = async(req, res) => {
  const { id, email, gender, password, role } = req.body

  if(!id || !email || !gender || !password || !role) {
    res.status(400).json({ status: 'fail', msg: 'empty data'})
  } else {
    const userId = await addUserService(id, email, gender, password, role)
  
    errorHandling(res, userId)
  }
}

const updateUserHandler = async(req, res) => {
  const { id } = req.params
  const { email, gender, password, role } = req.body

  if(!email || !gender || !password || !role) {
    res.status(400).json({ status: 'fail', msg: 'empty data'})
  } else {
    const userId = await updateUserService(id, email, gender, password, role)

    errorHandling(res, userId)
  }
}

const deleteUserHandler = async(req, res) => {
  const id = req.params.id

  const userId = await deleteUserService(id)

  errorHandling(res, userId)
}

module.exports = {
  getAllUserHandler,
  getUserByIdHandler,
  addUserHandler,
  updateUserHandler,
  deleteUserHandler
}