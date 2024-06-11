const sendGrid = require('@sendgrid/mail')

sendGrid.setApiKey(process.env.SENDGRID_API_KEY)
const sendMessageToGmail = async (to, code) => {
    const message = {
        to: 'Muxitdinovss@gmail.com',
        from: 'niyozbekpulatov123@gmail.com',
        subject: 'Parol uzgratirishni tasdiqlash',
        text: code,
    }

    try {
        await sendGrid.send(message)
    } catch (error) {
        console.error(error)

        if (error.response) {
            console.error(error.response.body)
        }
    }
}

module.exports = sendMessageToGmail
