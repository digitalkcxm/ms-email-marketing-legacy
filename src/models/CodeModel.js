const database = require('../config/database/database')

class CodeModel {
  async getAll() {
    try {
      return database('code').select('id', 'name', 'activated', 'created_at', 'updated_at')
    } catch (err) {
      return err
    }
  }

  async getByID(id) {
    try {
      return database('code').select('id', 'name', 'code', 'activated', 'created_at', 'updated_at').where({ id })
    } catch (err) {
      return rerr
    }
  }

  async upDate(id, obj) {
    try {
      return database('code').returning(['id', 'name', 'code', 'activated', 'created_at', 'updated_at']).update(obj).where({ id })
    } catch (err) {
      return err
    }
  }

  async create(obj) {
    try {
      return database('code').returning(['id', 'name', 'code', 'activated', 'created_at', 'updated_at']).insert(obj)
    } catch (err) {
      return err
    }
  }
}

module.exports = CodeModel
