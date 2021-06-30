const moment = require('moment')
const CodeModel = require('../models/CodeModel')
const { validationResult } = require('express-validator')
const MSSendGridService = require('../service/MSSendGridService')

const codeModel = new CodeModel()
const msSendgridService = new MSSendGridService()

class CodeController {
  async getAll(req, res) {
    try {
      const codes = await codeModel.getAll(req.company.id)

      codes.map(code => {
        let department = code.department.department
        delete code.department
        code.department = department

        code.created_at = moment(code.created_at).format('DD/MM/YYYY HH:mm:ss')
        code.updated_at = moment(code.updated_at).format('DD/MM/YYYY HH:mm:ss')
      })

      return res.status(200).json(codes)
    } catch (err) {
      return res.status(500).json({ error: 'Ocorreu algum erro ao tentar listar as codigo.' })
    }
  }

  async getByID(req, res) {
    let id = req.params.id.replace(/[^\d]+/g, '')

    if (id.length <= 0)
      return res.status(400).json({ error: 'ID inválido.' })

    try {
      const code = await codeModel.getByID(id, req.company.id)

      if (code.length > 0) {
        let variable = code[0].variable.variable
        let department = code[0].department.department

        delete code[0].variable
        delete code[0].department

        code[0].variable = variable
        code[0].department = department
        code[0].created_at = moment(code[0].created_at).format('DD/MM/YYYY HH:mm:ss')
        code[0].updated_at = moment(code[0].updated_at).format('DD/MM/YYYY HH:mm:ss')
      } else {
        return res.status(400).json([])
      }

      return res.status(200).json(code[0])
    } catch (err) {
      return res.status(500).json({ error: 'Ocorreu algum erro ao tentar recuperar a codigo.' })
    }
  }

  async upDate(req, res) {
    const obj = {}
    let id = req.params.id.replace(/[^\d]+/g, '')

    if (id.length <= 0)
      return res.status(400).json({ error: 'ID inválido.' })

    try {
      if (req.body.name) obj.name = req.body.name
      if (req.body.code) obj.code = req.body.code
      if (req.body.department) obj.department = { department: req.body.department }
      if (req.body.variable) obj.variable = { variable: req.body.variable }
      if (String(req.body.activated) === 'true' || String(req.body.activated) === 'false') obj.activated = req.body.activated
      obj.updated_at = moment().format()

      if (req.company.token_broker && req.body.code) {
        const getByIDComplete = await codeModel.getByIDComplete(id, req.company.id)
        
        if(getByIDComplete.length > 0 && getByIDComplete[0].id_template_ms_broker) {
          const templateBrokerVersion = await msSendgridService.createVersion(getByIDComplete[0].id_template_ms_broker, req.company.token_broker, getByIDComplete[0].name, req.body.code)
          obj.thumbnail_url = `https:${templateBrokerVersion.thumbnail_url}`
        } else {
          const templateBroker = await msSendgridService.createTemplate(req.company.token_broker, req.body.name)
          const templateBrokerVersion = await msSendgridService.createVersion(templateBroker.id, req.company.token_broker, req.body.name, req.body.code)
  
          obj.id_template_ms_broker = templateBroker.id
          obj.id_template_broker = templateBroker.sg_template_id
          obj.thumbnail_url = `https:${templateBrokerVersion.thumbnail_url}`
        }
      }

      const code = await codeModel.upDate(id, obj, req.company.id)

      let variable = code[0].variable.variable
      let department = code[0].department.department

      delete code[0].variable
      delete code[0].department

      code[0].variable = variable
      code[0].department = department
      code[0].created_at = moment(code[0].created_at).format('DD/MM/YYYY HH:mm:ss')
      code[0].updated_at = moment(code[0].updated_at).format('DD/MM/YYYY HH:mm:ss')

      return res.status(200).json(code[0])
    } catch (err) {
      return res.status(500).json({ error: 'Ocorreu algum erro ao tentar realizar update na codigo.' })
    }
  }

  async create(req, res) {
    const obj = {}
    const date = moment().format()
    const errors = validationResult(req)

    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() })

    obj.id_company = req.company.id
    obj.name = req.body.name
    obj.code = req.body.code
    req.body.department ? obj.department = { department: req.body.department } : obj.department = { department: [] }
    req.body.variable ? (obj.variable = { variable: req.body.variable }) : { variable: [] }
    obj.created_at = date
    obj.updated_at = date

    try {
      if (req.company.token_broker) {
        const templateBroker = await msSendgridService.createTemplate(req.company.token_broker, req.body.name)
        const templateBrokerVersion = await msSendgridService.createVersion(templateBroker.id, req.company.token_broker, req.body.name, req.body.code)

        obj.id_template_ms_broker = templateBroker.id
        obj.id_template_broker = templateBroker.sg_template_id
        obj.thumbnail_url = `https:${templateBrokerVersion.thumbnail_url}`
      }

      const code = await codeModel.create(obj)

      let variable = code[0].variable.variable
      let department = code[0].department.department

      delete code[0].variable
      delete code[0].department

      code[0].variable = variable
      code[0].department = department
      code[0].created_at = moment(code[0].created_at).format('DD/MM/YYYY HH:mm:ss')
      code[0].updated_at = moment(code[0].updated_at).format('DD/MM/YYYY HH:mm:ss')

      return res.status(201).json(code[0])
    } catch (err) {
      if (err.code == '23505' && err.constraint == 'code_name_unique')
        return res.status(400).json({ error: 'Já existe uma template com esse nome.' })

      return res.status(500).json({ error: 'Ocorreu algum erro ao tentar criar codigo.' })
    }
  }
}

module.exports = CodeController
