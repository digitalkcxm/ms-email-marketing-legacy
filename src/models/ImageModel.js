const database = require('../config/database/database')

class ImageModel {
  async getAll() {
    try {
      return database('images').select('id', 'name', 'url', 'activated', 'created_at', 'updated_at')
    } catch (err) {
      return err
    }
  }

  async getByID(id) {
    try {
      return database('images').select('id', 'name', 'url', 'activated', 'created_at', 'updated_at').where({ id })
    } catch (err) {
      return rerr
    }
  }

  async upDate(id, obj) {
    try {
      return database('images').returning(['id', 'name', 'url', 'activated', 'created_at', 'updated_at']).update(obj).where({ id })
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
