const pool = require('../config/db_connect');

const queryExecution = async(query) => {
  try {
    const result = await pool.query(query)
    return result.rows
  } catch (err) {
    return false
  }
}

module.exports = { queryExecution }