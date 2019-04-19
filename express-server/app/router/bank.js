const path = require('path')
const router = require('express').Router()
const bankCtrl = require(path.resolve('./app/controller/bank'))
const authority = require(path.resolve('./app/middleware/authority'))

router.post('/transfer', bankCtrl.transfer)
router.post('/saveMoney', bankCtrl.saveMoney)

module.exports = router