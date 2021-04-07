const database = require('../config/database/database')

class CodeModel {
  async getAll(id_company) {
    try {
      return database('code').select('id', 'name', 'department', 'activated', 'created_at', 'updated_at').where({ id_company })
    } catch (err) {
      return err
    }
  }

  async getByID(id, id_company) {
    try {
      return database('code').select('id', 'name', 'code', 'department', 'activated', 'created_at', 'updated_at').where({ id, id_company })
    } catch (err) {
      return rerr
    }
  }

  async upDate(id, obj, id_company) {
    try {
      return database('code').returning(['id', 'name', 'code', 'department', 'activated', 'created_at', 'updated_at']).update(obj).where({ id, id_company })
    } catch (err) {
      return err
    }
  }

  async create(obj) {
    try {
      return database('code').returning(['id', 'name', 'code', 'department', 'activated', 'created_at', 'updated_at']).insert(obj)
    } catch (err) {
      return err
    }
  }
}

module.exports = CodeModel
