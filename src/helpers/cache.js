const moment = require('moment')
const Redis = require('../config/redis')
const CompanyModel = require('../models/CompanyModel')

const redis = Redis.newConnection()
const companyModel = new CompanyModel()

async function cacheCompany() {
  try {
    const companys = await companyModel.getAll()
    Promise.all(companys.map(company => {
      company.created_at = moment(company.created_at).format('DD/MM/YYYY HH:mm:ss')
      company.updated_at = moment(company.updated_at).format('DD/MM/YYYY HH:mm:ss')
      redis.hset(`${process.env.PROJECT_NAME}:cache`, `company-${company.token}`, JSON.stringify(company))
    }))
  } catch (err) {
    return err
  }
}

module.exports = { cacheCompany }
