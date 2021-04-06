const express = require('express')
const { body } = require('express-validator')
const authorization = require('../middleware/authorization')
const CodeController = require('../controllers/CodeController')

const router = express.Router()
const codeController = new CodeController()

router.use(authorization.tokenVerify)

router.get('/', (req, res) => codeController.getAll(req, res))
router.get('/:id', (req, res) => codeController.getByID(req, res))
router.put('/:id', (req, res) => codeController.upDate(req, res))
router.post('/',
  body('name').notEmpty().withMessage('O campo name é obrigatório.'),
  body('code').notEmpty().withMessage('O campo code é obrigatório.'),
  (req, res) => codeController.create(req, res)
)

module.exports = router
