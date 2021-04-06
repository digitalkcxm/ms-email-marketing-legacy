const express = require('express')
const routes = require('./routes')
const cors = require('./cors')

const app = express()

cors(app)
app.use(express.json({ limit: '250mb' }))
app.use(express.urlencoded({ limit: '250mb', extended: true }))
app.use((req, res, next) => next())

routes(app)

app.listen(process.env.PORT, () => console.log(`Server running in port ${process.env.PORT}`))

module.exports = app
