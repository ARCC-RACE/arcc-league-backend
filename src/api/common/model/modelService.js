const ModelRepository = require('./modelRepository');

class ModelService {
  constructor() {
    this.repository = new ModelRepository();
  }

  getCount() {
    return this.repository.getCount();
  }

  /**
   * Finds Model by name
   * @returns {*}
   * @param modelName
   */
  findByName(modelName) {
    return this.repository.findByName(modelName);
  }

  /**
   * Finds Model by ID
   * @param id
   * @returns {PromiseLike<any> | Promise<any>}
   */
  findById(id) {
    return this.repository.findById(id)
      .then(user => this.mapModelToDto(user));
  }

  /**
   * Adds a model
   * @param model
   * @returns {*}
   */
  addModel(model) {
    return this.repository.add(model);
  }

  /**
   * Edits a model based on ID
   * @param dto Object with model paramters
   * @returns {*}
   */
  editModel(dto) {
    const model = this.mapDtoToModel(dto);
    return this.repository.edit(dto.id, model);
  }

  deleteModel(id) {
    return this.repository.delete(id);
  }

  /**
   * Lists all of the models available. Queries collection for filter
   * @param filter Query to search collection
   * @returns {Promise<{totalCount: *, items: *}>}
   */
  list(filter) {
    return Promise.all([
      this.repository.listFiltered(filter),
      this.repository.getCountFiltered(filter),
    ])
      .then(([data, count]) => {
        return {
          items: data.map(item => this.mapModelToDto(item)),
          totalCount: count,
        };
      });
  }

  /**
   * Maps model to an object
   * @param user
   * @returns {*}
   */
  mapModelToDto(user) {
    return user ? {
      id: user._id,
      email: user.email,
      role: user.role,
      age: user.age,
      login: user.fullName,
      address: user.address || {},
    } : {};
  }

  /**
   * Maps an object to model
   * @param dto
   * @returns {*}
   */
  mapDtoToModel(dto) {
    return dto ? {
      email: dto.email,
      age: dto.age,
      role: dto.role,
      login: dto.fullName,

      address: dto.address,
    } : {};
  }
}

module.exports = ModelService;
