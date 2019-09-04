const UserRepository = require('./userRepository');

class UserService {
  constructor() {
    this.repository = new UserRepository();
  }

  getCount() {
    return this.repository.getCount();
  }

  findByEmail(email) {
    return this.repository.findByEmail(email);
  }

  findById(id) {
    return this.repository.findById(id)
      .then(user => this.mapUserToDto(user));
  }

  addUser(user) {
    return this.repository.add(user);
  }

  addMany(users) {
    return this.repository.addMany(users);
  }

  editUser(dto) {
    const user = this.mapDtoToUser(dto);
    return this.repository.edit(dto.id, user);
  }

  deleteUser(id) {
    return this.repository.delete(id);
  }

  changePassword(id, salt, passwordHash) {
    return this.repository.changePassword(id, salt, passwordHash);
  }

  getPhoto(userId) {
    return this.repository.getPhoto(userId);
  }

  list(filter) {
    return Promise.all([
      this.repository.listFiltered(filter),
      this.repository.getCountFiltered(filter),
    ])
      .then(([data, count]) => {
        return {
          items: data.map(item => this.mapUserToDto(item)),
          totalCount: count,
        };
      });
  }

  /**
   * Maps user object ot something that's safe to return
   * @param user
   * @returns {*}
   */
  mapUserToDto(user) {
    return user ? {
      id: user._id,
      email: user.email,
      role: user.role,
      age: user.age,
      login: user.fullName,
      address: user.address || {},
      themeName: user.themeName,
      picture: user.picture,
      updates: user.updates,
    } : {};
  }

  mapDtoToUser(dto) {
    return dto ? {
      email: dto.email,
      age: dto.age,
      role: dto.role,
      login: dto.fullName,
      address: dto.address,
      themeName: dto.themeName,
      picture: dto.picture,
      updates: dto.updates,
    } : {};
  }
}

module.exports = UserService;
