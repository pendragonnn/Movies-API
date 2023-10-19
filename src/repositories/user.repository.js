const pool = require("../config/db_connect");

class UserRepository {
  static getAllUsers = async (page, size) => {
    if (page === undefined && size === undefined) {
      const query = `SELECT * FROM users`;

      const result = await pool.query(query);
      return result.rows;
    } else {
      const offset = (page - 1) * size;
      const query = `SELECT * FROM users ORDER BY id OFFSET ${offset} ROWS FETCH NEXT ${size} ROWS ONLY`;

      const result = await pool.query(query);
      return result.rows;
    }
  };

  static getUserById = async (id) => {
    const query = {
      text: "SELECT * FROM users WHERE id=$1",
      values: [id],
    };

    const result = await pool.query(query);
    return result.rows;
  };

  static getUserByEmail = async (email) => {
    const query = {
      text: "SELECT * FROM users WHERE email=$1",
      values: [email],
    };

    const result = await pool.query(query);
    return result.rows;
  };

  static addUser = async (id, email, gender, password, role) => {
    const query = {
      text: "INSERT INTO users VALUES ($1, $2, $3, $4, $5) RETURNING id",
      values: [id, email, gender, password, role],
    };

    const result = await pool.query(query);
    return result.rows[0].id;
  };

  static editUser = async (id, email, gender, password, role) => {
    const query = {
      text: "UPDATE users SET email=$2, gender=$3, password=$4, role=$5 WHERE id=$1 RETURNING id",
      values: [id, email, gender, password, role],
    };

    const result = await pool.query(query);
    return result.rows[0].id;
  };

  static deleteUser = async (id) => {
    const query = {
      text: "DELETE FROM users WHERE id=$1 returning id",
      values: [id],
    };

    const result = await pool.query(query);
    return result.rows[0].id;
  };
}

module.exports = UserRepository;
