const auth = require('../controllers/authController')
const router = require('express').Router()
const controller = require('../controllers/userController')

router.route('/').get(controller.getAllUsers).post(controller.createUser)

router.route('/signup').post(auth.signUp)
router.route('/signin').post(auth.login)
router.route('/self').get(auth.userSelf)

router.route('/logout').get(auth.logout)

router.route('/location').post(controller.addLocation)

router
    .route('/:id')
    .get(auth.protect, auth.role(['admin']), controller.getOneUser)
    .patch(auth.protect, auth.role(['user', 'admin']), controller.updateUser)
    .delete(auth.protect, auth.role(['admin']), controller.deleteUser)

module.exports = router
