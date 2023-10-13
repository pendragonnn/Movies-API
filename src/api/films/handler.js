const { 
  getAllFilmService, 
  getFilmByIdService,
  addFilmService,
  updateFilmService,
  deleteFilmService
  } = require('../../services/filmService')

const { errorHandling } = require('../../exception/errorHandling')

const getAllFilmHandler = async(req, res) => {
  const { page, size } = req.query

  const films = await getAllFilmService(page, size)
  
  errorHandling(res, films)
  
}

const getFilmByIdHandler = async(req, res) => {
  const { id } = req.params
  const film = await getFilmByIdService(id)

  errorHandling(res, film)
}

const addFilmHandler = async(req, res) => {
  const { id, title, genres, year } = req.body

  if(!id || !title || !genres || !year) {
    res.status(400).json({ status: 'fail', msg: 'empty data'})
  } else {
    const filmId = await addFilmService(id, title, genres, year)
  
    errorHandling(res, filmId)
  }
}

const updateFilmHandler = async(req, res) => {
  const { id } = req.params
  const { title, genres, year } = req.body

  if(!title || !genres || !year) {
    res.status(400).json({ status: 'fail', msg: 'empty data'})
  } else {
    const filmId = await updateFilmService(id, title, genres, year)
  
    errorHandling(res, filmId)
  }
}

const deleteFilmHandler = async(req, res) => {
  const id = req.params.id

  const filmId = await deleteFilmService(id)

  errorHandling(res, filmId)
}

module.exports = {
  getAllFilmHandler,
  getFilmByIdHandler,
  addFilmHandler,
  updateFilmHandler,
  deleteFilmHandler
}