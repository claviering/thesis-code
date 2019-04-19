const path = require('path')
const router = require('express').Router()
const userCtrl = require(path.resolve('./app/controller/user'))
const authority = require(path.resolve('./app/middleware/authority'))

router.post('/login', authority.authTickerLife, authority.authTicker, userCtrl.login)
router.post('/register', userCtrl.register)

module.exports = router