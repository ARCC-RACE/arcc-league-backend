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
      .then(model => this.mapModelToDto(model));
  }

  /**
   * Adds a model
   * @param model
   * @returns {*}
   */
  addModel(model) {
    return this.repository.add(this.mapDtoToModel(model));
  }

  /**
   * Edits a model based on ID
   * @param dto Object with model paramters
   * @returns {*}
   */
  editModel(dto, modelId) {
    const model = this.mapDtoToModel(dto);
    return this.repository.edit(modelId, model);
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
      .then(([data]) => {
        return data.map(item => this.mapModelToDto(item));
      });
  }

  findByUserId(userId) {
    return this.repository.findByUserId(userId);
  }

  /**
   * Maps model to an object
   * @param model
   * @returns {*}
   */
  // eslint-disable-next-line class-methods-use-this
  mapModelToDto(model) {
    return model ? {
      id: model._id,
      ownerId: model.ownerId,
      trackName: model.trackName, // Track model was tested on)
      modelName: model.modelName, // (Name of the model) Can be changed by User
      modelDescription: model.modelDescription, // (User description) Can be changed by User
      dateUploaded: model.dateUploaded, // (Date the model was uploaded)
      isEvaluated: model.isEvaluated,
      time: model.time, // (Encoded Time it completed track)
      speedTested: model.speedTested, // (Speed the model was tested at (percentage))
      videoLink: model.videoLink, // (Link to video upload)
      modelLink: model.modelLink, // (Link to the file)
      modelId: model.modelId,
      invoiceNumber: model.invoiceNumber, // (Paypal Order ID)
      isPaid: model.isPaid, // (If users payed for it yet)
    } : {};
  }

  /**
   * Maps an object to model
   * @param dto
   * @returns {*}
   */
  // eslint-disable-next-line class-methods-use-this
  mapDtoToModel(dto) {
    return dto ? {
      id: dto._id,
      ownerId: dto.ownerId,
      trackName: dto.trackName, // Track model was tested on)
      modelName: dto.modelName, // (Name of the model) Can be changed by User
      modelDescription: dto.modelDescription, // (User description) Can be changed by User
      dateUploaded: dto.dateUploaded, // (Date the model was uploaded)
      isEvaluated: dto.isEvaluated,
      time: dto.time, // (Encoded Time it completed track)
      speedTested: dto.speedTested, // (Speed the model was tested at (percentage))
      videoLink: dto.videoLink, // (Link to video upload)
      modelLink: dto.modelLink, // (Link to the file)
      modelId: dto.modelId,
      invoiceNumber: dto.invoiceNumber, // (Paypal Order ID)
      isPaid: dto.isPaid, // (If users payed for it yet)
    } : {};
  }
}

module.exports = ModelService;
