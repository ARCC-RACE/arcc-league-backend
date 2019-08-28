const { ObjectID } = require('mongodb');
const BaseRepository = require('../../../db/baseRepository');

class UserRepository extends BaseRepository {
  constructor() {
    super('users');
  }

  findById(id) {
    return this.dbClient
      .then(db => db
        .collection(this.collection)
        .aggregate([
          { $match: { _id: ObjectID(id) } },
          { $lookup: { from: 'settings', localField: '_id', foreignField: '_id', as: 'settings' } },
          { $limit: 1 },
        ])
        .toArray()
      )
      .then(data => (data && data.length ? data[0] : data));
  }

  findByEmail(email) {
    return this.dbClient
      .then(db => db
        .collection(this.collection)
        .findOne({ email }));
  }

  changePassword(id, salt, passwordHash) {
    return this.dbClient
      .then(db => db
        .collection(this.collection)
        .updateOne({ _id: ObjectID(id) }, { $set: { salt, passwordHash } }));
  }

  listFiltered(filter) {
    filter.query = {};

    // names here are not fully consistent with naming convention for compatibility with ng2-smart-table api on UI
    if (filter.filterByuserName) {
      filter.query.fullName = { $regex: filter.filterByuserName, $options: '-i' };
    }
    if (filter.filterByemail) {
      filter.query.email = { $regex: filter.filterByemail, $options: '-i' };
    }
    if (filter.filterByage) {
      filter.query.age = filter.filterByage;
    }
    if (filter.filterBystreet) {
      filter.query['address.street'] = { $regex: filter.filterBystreet, $options: '-i' };
    }
    if (filter.filterBycity) {
      filter.query['address.city'] = { $regex: filter.filterBycity, $options: '-i' };
    }
    if (filter.filterByzipcode) {
      filter.query['address.zipCode'] = { $regex: filter.filterByzipcode, $options: '-i' };
    }
    return super.listFiltered(filter);
  }

  // TODO: implement photo return
  getPhoto(userId) {
    return 'https://www.google.com/search?q=user+profile+picture&tbm=isch&source=iu&ictx=1&fir=DFY_9QvDjOS1hM%253A%252Crz7UtP8r5CNhgM%252C_&vet=1&usg=AI4_-kR1EO-hNSjoWI8Z_2UJGaqZlnURZg&sa=X&ved=2ahUKEwizgov6-aXkAhVXnp4KHaiaCRAQ9QEwAnoECAcQCA#imgrc=DFY_9QvDjOS1hM:';
    // return this.dbClient
    //   .then(db => db
    //     .collection(this.collection)
    //   )
  }
}

module.exports = UserRepository;
