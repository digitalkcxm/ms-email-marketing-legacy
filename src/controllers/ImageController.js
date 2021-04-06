const moment = require('moment')
const ImageModel = require('../models/ImageModel')
const StorageService = require('../service/StorageService')

const imageModel = new ImageModel()
const storageService = new StorageService()

class ImageController {
  async getAll(req, res) {
    try {
      const images = await imageModel.getAll()

      images.map(image => {
        image.created_at = moment(image.created_at).format('DD/MM/YYYY HH:mm:ss')
        image.updated_at = moment(image.updated_at).format('DD/MM/YYYY HH:mm:ss')
      })

      return res.status(200).json(images)
    } catch (err) {
      return res.status(500).json({ error: 'Ocorreu algum erro ao tentar listar as imagens.' })
    }
  }

  async getByID(req, res) {
    let id = req.params.id.replace(/[^\d]+/g, '')

    if (id.length <= 0)
      return res.status(400).json({ error: 'ID inválido.' })

    try {
      const image = await imageModel.getByID(id)

      if (image.length > 0) {
        image[0].created_at = moment(image[0].created_at).format('DD/MM/YYYY HH:mm:ss')
        image[0].updated_at = moment(image[0].updated_at).format('DD/MM/YYYY HH:mm:ss')
      } else {
        return res.status(400).json([])
      }

      return res.status(200).json(image[0])
    } catch (err) {
      return res.status(500).json({ error: 'Ocorreu algum erro ao tentar recuperar a imagem.' })
    }
  }

  async upDate(req, res) {
    const obj = {}
    let id = req.params.id.replace(/[^\d]+/g, '')

    if (id.length <= 0)
      return res.status(400).json({ error: 'ID inválido.' })

    try {
      if (String(req.body.activated) === 'true' || String(req.body.activated) === 'false') obj.activated = req.body.activated
      obj.updated_at = moment().format()

      const image = await imageModel.upDate(id, obj)

      image[0].created_at = moment(image[0].created_at).format('DD/MM/YYYY HH:mm:ss')
      image[0].updated_at = moment(image[0].updated_at).format('DD/MM/YYYY HH:mm:ss')

      return res.status(200).json(image[0])
    } catch (err) {
      return res.status(500).json({ error: 'Ocorreu algum erro ao tentar realizar update na imagem.' })
    }
  }

  async create(req, res) {
    const date = moment().format()
    try {
      const urls = await Promise.all(req.body.map(file => storageService.upload(req.company.token.replace('-', ''), Buffer.from(file.image, 'base64'), file.name, true)))

      if (urls.length > 0) {
        const images = await Promise.all(urls.map(async image => {
          const result = await imageModel.create({
            id_company: req.company.id,
            name: image.fileName,
            url: image.url,
            created_at: date,
            updated_at: date
          })

          return result[0]
        }))

        images.map(image => {
          image.created_at = moment(image.created_at).format('DD/MM/YYYY HH:mm:ss')
          image.updated_at = moment(image.updated_at).format('DD/MM/YYYY HH:mm:ss')
        })

        return res.status(201).json(images)
      } else {
        return res.status(500).json({ error: 'Ocorreu algum erro ao tentar criar imagem.' })
      }
    } catch (err) {
      return res.status(500).json({ error: 'Ocorreu algum erro ao tentar criar imagem.' })
    }
  }
}

module.exports = ImageController
