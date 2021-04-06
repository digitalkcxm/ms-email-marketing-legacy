const moment = require('moment')
const { v4: uuid } = require('uuid')
const { validationResult } = require('express-validator')

const { cacheCompany } = require('../helpers/cache')
const CompanyModel = require('../models/CompanyModel')

const companyModel = new CompanyModel()

class CompanyController {
  async getAll(req, res) {
    try {
      const companys = await companyModel.getAll()

      companys.map(company => {
        company.created_at = moment(company.created_at).format('DD/MM/YYYY HH:mm:ss')
        company.updated_at = moment(company.updated_at).format('DD/MM/YYYY HH:mm:ss')
      })

      return res.status(200).json(companys)
    } catch (err) {
      return res.status(500).json({ error: 'Ocorreu algum erro ao tentar listar as companys.' })
    }
  }

  async getByID(req, res) {
    let id = req.params.id.replace(/[^\d]+/g, '')

    if (id.length <= 0)
      return res.status(400).json({ error: 'ID inválido.' })

    try {
      const company = await companyModel.getByID(id)

      if (company.length > 0) {
        company[0].created_at = moment(company[0].created_at).format('DD/MM/YYYY HH:mm:ss')
        company[0].updated_at = moment(company[0].updated_at).format('DD/MM/YYYY HH:mm:ss')
      } else {
        return res.status(400).json([])
      }

      return res.status(200).json(company[0])
    } catch (err) {
      return res.status(500).json({ error: 'Ocorreu algum erro ao tentar recuperar a company.' })
    }
  }

  async upDate(req, res) {
    const obj = {}
    let id = req.params.id.replace(/[^\d]+/g, '')

    if (id.length <= 0)
      return res.status(400).json({ error: 'ID inválido.' })

    try {
      if (req.body.name) obj.name = req.body.name
      if (req.body.callback) obj.callback = req.body.callback
      if (String(req.body.activated) === 'true' || String(req.body.activated) === 'false') obj.activated = req.body.activated
      obj.updated_at = moment().format()

      const company = await companyModel.upDate(id, obj)

      company[0].created_at = moment(company[0].created_at).format('DD/MM/YYYY HH:mm:ss')
      company[0].updated_at = moment(company[0].updated_at).format('DD/MM/YYYY HH:mm:ss')

      cacheCompany()

      return res.status(200).json(company[0])
    } catch (err) {
      if (err.code == '23505' && err.constraint == 'company_name_unique')
        return res.status(400).json({ error: 'Já existe uma company com esse nome.' })

      return res.status(500).json({ error: 'Ocorreu algum erro ao tentar realizar update na company.' })
    }
  }

  async create(req, res) {
    const obj = {}
    const date = moment().format()
    const errors = validationResult(req)

    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() })

    try {
      obj.name = req.body.name
      obj.token = uuid()
      obj.callback = req.body.callback
      obj.created_at = date
      obj.updated_at = date

      const company = await companyModel.create(obj)

      company[0].created_at = moment(company[0].created_at).format('DD/MM/YYYY HH:mm:ss')
      company[0].updated_at = moment(company[0].updated_at).format('DD/MM/YYYY HH:mm:ss')

      cacheCompany()

      return res.status(201).json(company[0])
    } catch (err) {
      if (err.code == '23505' && err.constraint == 'company_name_unique')
        return res.status(400).json({ error: 'Já existe uma company com esse nome.' })

      return res.status(500).json({ error: 'Ocorreu algum erro ao tentar criar company.' })
    }
  }
}

module.exports = CompanyController
