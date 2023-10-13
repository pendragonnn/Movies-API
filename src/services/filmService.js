const { queryExecution } = require('./queryService')

const getAllFilmService = async(page, size) => {
  if(page === undefined && size === undefined) {
    const query = `SELECT * FROM movies ORDER BY id`
  
    return await queryExecution(query)
  } else {
    const offset = (page - 1) * size
    console.log(page + size)
    const query = `SELECT * FROM movies ORDER BY id OFFSET ${offset} ROWS FETCH NEXT ${size} ROWS ONLY`
  
    return await queryExecution(query)
  }
}

const getFilmByIdService = async(id) => {
  const query = {
    text: "SELECT * FROM movies WHERE id=$1",
    values: [id],
  };
  
  return await queryExecution(query)
}

const getFilmByNameService = async(title) => {
  const query = {
    text: "SELECT * FROM movies WHERE title=$1",
    values: [title],
  };
  
  return await queryExecution(query)
}

const addFilmService = async(id, title, genres, year) => {
  const filmExist = await getFilmByNameService(title)
  const idExist = await getFilmByIdService(id)

  if(filmExist.length === 0 && idExist.length === 0) {
    const query = {
      text: "INSERT INTO movies VALUES ($1, $2, $3, $4) RETURNING id",
      values: [id, title, genres, year]
    }
    return await queryExecution(query)
  } else {
    filmExist.unshift(true)
    return filmExist
  }
}

const updateFilmService = async(id, title, genres, year) => {
  const query = {
    text: "UPDATE movies SET title=$2, genres=$3, year=$4 WHERE id=$1 RETURNING id",
    values: [id, title, genres, year]
  }

  return await queryExecution(query)
}

const deleteFilmService = async(id) => {
  const query = { 
    text:'DELETE FROM movies WHERE id=$1 returning id', 
    values: [id] 
  }

  return await queryExecution(query)
}

module.exports = {
  getAllFilmService, 
  getFilmByIdService,
  addFilmService,
  updateFilmService,
  deleteFilmService
}