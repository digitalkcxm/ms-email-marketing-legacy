require('dotenv').config()

const { cacheCompany } = require('./helpers/cache')

cacheCompany()

require('./config/server').server
