const sendGrid = require('@sendgrid/mail')

sendGrid.setApiKey('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')

const sendMessageToGmail = async (to, code) => {
    const message = {
        to: 'Muxitdinovss@gmail.com',
        from: 'niyozbek12aws@gmail.com',
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
