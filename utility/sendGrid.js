const sendGrid = require('@sendgrid/mail')

sendGrid.setApiKey('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')

const sendMessageToGmail = async (to, code) => {
    const message = {
        to: 'Muxitdinovss@gmail.com',
        from: 'pulatov.niyozbek12@gmail.com',
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
