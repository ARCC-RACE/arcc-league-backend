const { ObjectID } = require('mongodb');
const BaseRepository = require('../../../db/baseRepository');

class ModelRepository extends BaseRepository {
  constructor() {
    super('models');
  }

  /**
   * Finds model by name
   * @param modelName
   * @returns {PromiseLike<any> | Promise<any>}
   */
  findByName(modelName) {
    return this.dbClient
      .then(db => db
        .collection(this.collection)
        .aggregate([
          { $match: { name: modelName } },
          { $limit: 1 },
        ])
        .toArray())
      .then(data => (data && data.length ? data[0] : data));
  }

  /**
  * Finds a model by the _uid
  * @param id
  * @returns {PromiseLike<any> | Promise<any>}
  */
  findById(id) {
    return this.dbClient
      .then(db => db
        .collection(this.collection)
        .aggregate([
          { $match: { _id: ObjectID(id) } },
          { $limit: 1 },
        ])
        .toArray())
      .then(data => (data && data.length ? data[0] : data));
  }

  findByUserId(userId) {
    return this.dbClient
      .then(db => db
        .collection(this.collection)
        .aggregate([
          { $match: { ownerId: userId} },
          { $limit: 1 },
        ])
        .toArray())
      .then(data => (data && data.length ? data[0] : data));
  }
}

module.exports = ModelRepository;
