const pool = require("../config/db_connect");

class MovieRepository {
  static getAllMovies = async (page, size) => {
    if (page === undefined && size === undefined) {
      const query = "SELECT * FROM movies";
      const result = await pool.query(query);
      return result.rows;
    } else {
      const offset = (page - 1) * size;
      const query = `SELECT * FROM movies ORDER BY id OFFSET ${offset} ROWS FETCH NEXT ${size} ROWS ONLY`;

      const result = await pool.query(query);
      return result.rows;
    }
  };

  static getMovieById = async (id) => {
    const query = {
      text: "SELECT * FROM movies WHERE id=$1",
      values: [id],
    };

    const result = await pool.query(query);
    return result.rows;
  };

  static getMovieByName = async (title) => {
    const query = {
      text: "SELECT * FROM movies WHERE title=$1",
      values: [title],
    };

    const result = await pool.query(query);
    return result.rows;
  };

  static addMovie = async (id, title, genres, year) => {
    const query = {
      text: "INSERT INTO movies VALUES ($1, $2, $3, $4) RETURNING id",
      values: [id, title, genres, year],
    };

    const result = await pool.query(query);
    return result.rows[0].id;
  };

  static editMovie = async (id, title, genres, year) => {
    const query = {
      text: "UPDATE movies SET title=$2, genres=$3, year=$4 WHERE id=$1 RETURNING id",
      values: [id, title, genres, year],
    };

    const result = await pool.query(query);
    return result.rows[0].id;
  };

  static deleteMovie = async (id) => {
    const query = {
      text: "DELETE FROM movies WHERE id=$1 returning id",
      values: [id],
    };

    const result = await pool.query(query);
    return result.rows[0].id;
  };
}

module.exports = MovieRepository;
