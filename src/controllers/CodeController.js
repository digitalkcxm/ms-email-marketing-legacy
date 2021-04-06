const moment = require('moment')
const CodeModel = require('../models/CodeModel')
const { validationResult } = require('express-validator')

const codeModel = new CodeModel()

class CodeController {
  async getAll(req, res) {
    try {
      const codes = await codeModel.getAll()

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
      const code = await codeModel.getByID(id)

      if (code.length > 0) {
        let department = code[0].department.department
        delete code[0].department
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
      if(req.body.department) obj.department = { department: req.body.department }
      if (String(req.body.activated) === 'true' || String(req.body.activated) === 'false') obj.activated = req.body.activated
      obj.updated_at = moment().format()

      const code = await codeModel.upDate(id, obj)

      let department = code[0].department.department
      delete code[0].department

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
    obj.created_at = date
    obj.updated_at = date

    try {
      const code = await codeModel.create(obj)

      let department = code[0].department.department
      delete code[0].department

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
