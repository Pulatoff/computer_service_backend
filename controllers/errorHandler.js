module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 404
    err.status = err.status || 'error'
    err.message = err.message
    res.status(err.statusCode).json({
        status: err.status,
        isOk: false,
        data: '',
        message: err.message,
        infoError: process.env.NODE_ENV === 'development' ? err.slack : undefined,
    })
}
