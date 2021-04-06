module.exports = (app) => {
  app.use('/api/v1/health', require('../routes/health'))
  app.use('/api/v1/company', require('../routes/company'))
  app.use('/api/v1/image', require('../routes/images'))
  app.use('/api/v1/code', require('../routes/code'))
}
