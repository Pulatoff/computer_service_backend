require('dotenv').config({})
const app = require('./middlewares/app')
const cli = require('cli-color')
const db = require('./configs/db')
const User = require('./models/userModel')

const PORT = process.env.PORT || 8000

async function createAdmin() {
    try {
        await User.create({
            username: 'Admin',
            email: 'admin@root.com',
            password: 'Admin1234.',
            role: 'admin',
            activ: true,
        })
    } catch (error) {
        console.log(error)
    }
}

createAdmin()

db.sync()

app.listen(PORT, () => console.log(cli.blue(`Listening on PORT: ${PORT}`)))
