const Redis = require('../config/redis')
const CompanyModel = require('../models/CompanyModel')

const redis = Redis.newConnection()
const companyModel = new CompanyModel()

async function tokenVerify(req, res, next) {
  let company
  const token = req.headers.authorization

  if (!token)
    return res.status(400).send({ error: 'Você não tem autorização para realizar essa ação.' })

  try {
    company = await redis.hget(`${process.env.PROJECT_NAME}:cache`, `company-${req.headers.authorization}`)
    if (company) {
      company = JSON.parse(company)
      req.company = company
      return next()
    }

    company = await companyModel.getByToken(token)

    if (company.length <= 0)
      return res.status(400).send({ error: 'Você não tem autorização para realizar essa ação.' })

    req.company = company[0]
    return next()
  } catch (err) {
    return res.status(500).send({ error: 'Ocorreu algum erro em authorization' })
  }
}


module.exports = { tokenVerify }
