const { UserRepository } = require('../repositories/')

class UserModel {
  static getAllUsers = async (page, size) => {
    return await UserRepository.getAllUsers(page, size)
  };

  static getUserById = async (id) => {
    return await UserRepository.getUserById(id);
  };

  static getUserByEmail = async (email) => {
    return await UserRepository.getUserByEmail(email)
  };

  static addUser = async (id, email, gender, password, role) => {
    return await UserRepository.addUser(id, email, gender, password, role)
  };

  static editUser = async (id, email, gender, password, role) => {
    return await UserRepository.editUser(id, email, gender, password, role)
  };

  static deleteUser = async (id) => {
    return await UserRepository.deleteUser(id)
  };
}

module.exports = UserModel;
