const response = (res, data, statusCode, message, results = undefined) => {
    res.status(statusCode).json({ status: 'success', isOk: true, message, results, data: data })
}

module.exports = response
