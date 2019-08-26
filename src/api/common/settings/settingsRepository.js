const BaseRepository = require('../../../db/baseRepository');

class SettingsRepository extends BaseRepository {
  constructor() {
    super('users');
  }
}

module.exports = SettingsRepository;
