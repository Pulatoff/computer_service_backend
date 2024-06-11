const axios = require('axios')
const { MYUZCARD_URL, MYUZCARD_LOGIN, MYUZCARD_PASSWORD } = require('../utility/constants/globalEnv')
async function SendToCardInvoice(amount, card_number, expire_date) {}

async function callMYUZCARD(method, body, path) {
    try {
        console.log('MYUZCARD request body', { body })

        const response = await axios({
            method,
            url: path,
            body,
            baseURL: MYUZCARD_URL,
            headers: {
                Authorization: 'Basic ' + new Buffer(MYUZCARD_LOGIN + ':' + MYUZCARD_PASSWORD).toString('base64'),
                'Content-Type': 'application/json; charset=utf-8',
                Accept: 'application/json',
                Language: 'uz',
            },
        })

        console.log('MYUZCARD response body', response.body)
        return response.body
    } catch (error) {
        console.log(error)
    }
}

module.exports = { callMYUZCARD }
