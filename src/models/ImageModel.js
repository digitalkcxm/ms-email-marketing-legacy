const database = require('../config/database/database')

class ImageModel {
  async getAll(id_company) {
    try {
      return database('images').select('id', 'name', 'url', 'activated', 'created_at', 'updated_at').where({ id_company })
    } catch (err) {
      return err
    }
  }

  async getByID(id, id_company) {
    try {
      return database('images').select('id', 'name', 'url', 'activated', 'created_at', 'updated_at').where({ id, id_company })
    } catch (err) {
      return rerr
    }
  }

  async upDate(id, obj, id_company) {
    try {
      return database('images').returning(['id', 'name', 'url', 'activated', 'created_at', 'updated_at']).update(obj).where({ id, id_company })
    } catch (err) {
      return err
    }
  }

  async create(obj) {
    try {
      return database('images').returning(['id', 'name', 'url', 'activated', 'created_at', 'updated_at']).insert(obj)
    } catch (err) {
      return err
    }
  }
}

module.exports = ImageModel
