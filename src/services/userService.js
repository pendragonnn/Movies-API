const { queryExecution } = require("./queryService");

const getAllUserService = async (page, size) => {
  if (page === undefined && size === undefined) {
    const query = `SELECT * FROM users ORDER BY id`;

    return await queryExecution(query);
  } else {
    const offset = (page - 1) * size;
    console.log(page + size);
    const query = `SELECT * FROM users ORDER BY id OFFSET ${offset} ROWS FETCH NEXT ${size} ROWS ONLY`;

    return await queryExecution(query);
  }
};

const getUserByIdService = async (id) => {
  const query = {
    text: "SELECT * FROM users WHERE id=$1",
    values: [id],
  };

  return await queryExecution(query);
};

const getUserByEmail = async (email) => {
  const query = {
    text: "SELECT * FROM users WHERE email=$1",
    values: [email],
  };

  return await queryExecution(query);
};

const addUserService = async (id, email, gender, password, role) => {
  const userExist = await getUserByEmail(email);
  const idExist = await getUserByIdService(id);

  if (userExist.length === 0 && idExist.length === 0) {
    const query = {
      text: "INSERT INTO users VALUES ($1, $2, $3, $4, $5) RETURNING id",
      values: [id, email, gender, password, role],
    };

    return await queryExecution(query);
  } else {
    userExist.unshift(true);
    return userExist;
  }
};

const updateUserService = async (id, email, gender, password, role) => {
  const query = {
    text: "UPDATE users SET email=$2, gender=$3, password=$4, role=$5 WHERE id=$1 RETURNING id",
    values: [id, email, gender, password, role],
  };

  return await queryExecution(query);
};

const deleteUserService = async (id) => {
  const query = {
    text: "DELETE FROM users WHERE id=$1 returning id",
    values: [id],
  };

  return await queryExecution(query);
};

module.exports = {
  getAllUserService,
  getUserByIdService,
  getUserByEmail,
  addUserService,
  updateUserService,
  deleteUserService,
};
