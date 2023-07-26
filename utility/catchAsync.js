const AppError = require('./appError')

const catchAsync = (fn) => {
    const func = (req, res, next) => {
        fn(req, res, next).catch((err) => {
            console.log(err)
            next(new AppError(err.message, 500))
        })
    }
    return func
}

module.exports = catchAsync
