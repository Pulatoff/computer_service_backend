const auth = require('../controllers/authController')
const router = require('express').Router()
const controller = require('../controllers/userController')

router
    .route('/')
    .get(auth.protect, auth.role(['admin']), controller.getAllUsers)
    .post(auth.protect, auth.role(['admin']), controller.createUser)

router.route('/signup').post(auth.signUp)
router.route('/signin').post(auth.login)
router.route('/self').get(auth.protect, auth.userSelf)
router.route('/logout').get(auth.protect, auth.logout)

router
    .route('/:id')
    .get(auth.protect, auth.role(['admin']), controller.getOneUser)
    .patch(auth.protect, auth.role(['admin']), controller.updateUser)
    .delete(auth.protect, auth.role(['admin']), controller.deleteUser)

module.exports = router
