const express = require('express')
const { body } = require('express-validator')
const CompanyController = require('../controllers/CompanyController')

const router = express.Router()
const companyController = new CompanyController()

router.get('/', (req, res) => companyController.getAll(req, res))
router.get('/:id', (req, res) => companyController.getByID(req, res))
router.put('/:id', (req, res) => companyController.upDate(req, res))
router.post('/',
  body('name').notEmpty().withMessage('O campo name é obrigatório.'),
  body('callback').notEmpty().withMessage('O campo callback é obrigatório.'),
  (req, res) => companyController.create(req, res)
)

module.exports = router
