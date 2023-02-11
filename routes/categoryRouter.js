const router = require('express').Router()
const controller = require('../controllers/categoryController')
const auth = require('../controllers/authController')

router.route('/').post(controller.addCategory).get(controller.getAllCategories)

// router.route('/:id').delete(delete1).get(getOne).patch(update)

module.exports = router
