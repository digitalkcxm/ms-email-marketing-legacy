const database = require('../config/database/database')

class CodeModel {
  async getAll(id_company) {
    try {
      return database('code').select('id', 'name', 'department', 'activated', 'id_template_broker', 'thumbnail_url', 'variable', 'created_at', 'updated_at').where({ id_company })
    } catch (err) {
      return err
    }
  }

  async getByID(id, id_company) {
    try {
      return database('code').select('id', 'name', 'code', 'department', 'activated', 'id_template_broker', 'thumbnail_url', 'variable', 'created_at', 'updated_at').where({ id, id_company })
    } catch (err) {
      return rerr
    }
  }

  async upDate(id, obj, id_company) {
    try {
      return database('code').returning(['id', 'name', 'code', 'department', 'activated', 'id_template_broker', 'thumbnail_url', 'variable', 'created_at', 'updated_at']).update(obj).where({ id, id_company })
    } catch (err) {
      return err
    }
  }

  async create(obj) {
    try {
      return database('code').returning(['id', 'name', 'code', 'department', 'activated', 'id_template_broker', 'thumbnail_url', 'variable', 'created_at', 'updated_at']).insert(obj)
    } catch (err) {
      return err
    }
  }

  async getByIDComplete(id, id_company) {
    try {
      return database('code').select('id', 'name', 'code', 'department', 'activated', 'id_template_ms_broker', 'id_template_broker', 'thumbnail_url', 'variable', 'created_at', 'updated_at').where({ id, id_company })
    } catch (err) {
      return rerr
    }
  }
}

module.exports = CodeModel
