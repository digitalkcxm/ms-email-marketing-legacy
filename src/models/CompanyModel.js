const database = require('../config/database/database')

class CompanyModel {
  async getAll() {
    try {
      return database('company').select('id', 'name', 'token', 'callback', 'activated', 'token_broker', 'created_at', 'updated_at')
    } catch (err) {
      return err
    }
  }

  async getByID(id) {
    try {
      return database('company').select('id', 'name', 'token', 'callback', 'activated', 'token_broker', 'created_at', 'updated_at').where({ id })
    } catch (err) {
      return rerr
    }
  }

  async upDate(id, obj) {
    try {
      return database('company').returning(['id', 'name', 'token', 'callback', 'activated', 'token_broker', 'created_at', 'updated_at']).update(obj).where({ id })
    } catch (err) {
      return err
    }
  }

  async create(obj) {
    try {
      return database('company').returning(['id', 'name', 'token', 'callback', 'activated', 'token_broker', 'created_at', 'updated_at']).insert(obj)
    } catch (err) {
      return err
    }
  }

  async getByToken(token) {
    try {
      return database('company').select('id', 'name', 'token', 'callback', 'activated', 'token_broker', 'created_at', 'updated_at').where({ token })
    } catch (err) {
      return rerr
    }
  }
}

module.exports = CompanyModel
