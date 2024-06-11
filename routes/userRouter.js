const auth = require('../controllers/authController')
const router = require('express').Router()
const controller = require('../controllers/userController')

router.route('/').get(controller.getAllUsers).post(controller.createUser)

router.route('/signup').post(auth.signUp)
router.route('/signin').post(auth.login)
router.route('/self').get(auth.protect, auth.userSelf)

router.route('/logout').get(auth.logout)

router.route('/location').post(controller.addLocation)
router.route('/update').post(auth.changePassword)
router.route('/code').post(auth.checkCode)

router.route('/:id').get(controller.getOneUser).patch(controller.updateUser).delete(controller.deleteUser)

module.exports = router
