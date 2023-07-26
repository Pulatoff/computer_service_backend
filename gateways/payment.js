const axios = require('axios')
const { MYUZCARD_URL } = require('../utility/constants/globalEnv')
async function SendToCardInvoice(amount, card_number, expire_date) {}
const http = require('http')
const https = require('https')

async function callMYUZCARD(method, body, path) {
    const options = {
        localAddress: '84.54.84.236',
    }
    const httpAgent = new http.Agent(options)
    const httpsAgent = new https.Agent(options)
    const response = await axios({
        method,
        url: path,
        body,
        baseURL: MYUZCARD_URL,
        headers: {
            Authorization: 'base64 Authorization',
            'Content-Type': 'application/json; charset=utf-8',
            Accept: 'application/json',
            Language: 'uz',
        },
        httpsAgent,
        httpAgent,
    })

    return response.body
}

module.exports = { callMYUZCARD }
