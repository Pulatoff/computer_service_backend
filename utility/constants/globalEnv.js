require('dotenv').config({})

const MYUZCARD_URL = process.env.MYUZCARD_URL + '/api'
const MYUZCARD_PASSWORD = process.env.MYUZCARD_PASSWORD
const MYUZCARD_LOGIN = process.env.MYUZCARD_LOGIN

module.exports = {
    MYUZCARD_URL,
    MYUZCARD_PASSWORD,
    MYUZCARD_LOGIN,
}
