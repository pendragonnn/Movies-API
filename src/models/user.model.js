const { UserRepository } = require("../repositories/");

class UserModel {
  constructor(email, gender, role) {
    this.email = email;
    this.gender = gender;
    this.role = role;
  }
  static getAllUsers = async (page, size) => {
    const result = await UserRepository.getAllUsers(page, size);

    return result.map(
      (user) => new UserModel(user.email, user.gender, user.role)
    );
  };

  static getUserById = async (id) => {
    const result = await UserRepository.getUserById(id);

    return result.map(
      (user) => new UserModel(user.email, user.gender, user.role)
    );
  };

  static getUserByEmail = async (email) => {
    const result = await UserRepository.getUserByEmail(email);

    return result.map(
      (user) => new UserModel(user.email, user.gender, user.role)
    );
  };

  static addUser = async (id, email, gender, password, role) => {
    const result = await UserRepository.addUser(
      id,
      email,
      gender,
      password,
      role
    );

    return result.map(
      (user) => new UserModel(user.email, user.gender, user.role)
    );
  };

  static editUser = async (id, email, gender, password, role) => {
    const result = await UserRepository.editUser(
      id,
      email,
      gender,
      password,
      role
    );

    return result.map(
      (user) => new UserModel(user.email, user.gender, user.role)
    );
  };

  static deleteUser = async (id) => {
    const result = await UserRepository.deleteUser(id);

    return result.map(
      (user) => new UserModel(user.email, user.gender, user.role)
    );
  };
}

module.exports = UserModel;
