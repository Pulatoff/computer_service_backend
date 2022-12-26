const auth = require('../controllers/authController')
const router = require('express').Router()

router.route('/signup').post(auth.signUp)
router.route('/signin').post(auth.login)
router.route('/self').get(auth.protect, auth.userSelf)
router.route('/logout').get(auth.protect, auth.logout)

module.exports = router
