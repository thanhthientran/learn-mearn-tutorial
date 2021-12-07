const express = require('express')
const router = express.Router()
const userController = require('../app/controller/UserController')
const verifyToken = require('../middleware/auth')

router.post('/register', userController.register)
router.post('/login', userController.login)
router.get('/',verifyToken,userController.checkUser )

module.exports = router