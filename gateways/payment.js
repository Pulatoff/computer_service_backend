const axios = require('axios')
const { MYUZCARD_URL } = require('../utility/constants/globalEnv')
async function SendToCardInvoice(amount, card_number, expire_date) {}

async function callMYUZCARD(method, body, path) {
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
    })

    return response.body
}
