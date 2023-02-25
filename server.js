require('dotenv').config({})
const app = require('./middlewares/app')
const cli = require('cli-color')
const db = require('./configs/db')

const PORT = process.env.PORT || 8000

db.sync()

app.listen(PORT, () => console.log(cli.blue(`Listening on PORT: ${PORT}`)))
