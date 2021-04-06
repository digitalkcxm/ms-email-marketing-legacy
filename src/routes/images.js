const express = require('express')
const authorization = require('../middleware/authorization')
const ImageController = require('../controllers/ImageController')

const router = express.Router()
const imageController = new ImageController()

router.use(authorization.tokenVerify)

router.get('/', (req, res) => imageController.getAll(req, res))
router.get('/:id', (req, res) => imageController.getByID(req, res))
router.put('/:id', (req, res) => imageController.upDate(req, res))
router.post('/', (req, res) => imageController.create(req, res))

module.exports = router
