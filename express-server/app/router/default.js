const path = require('path')
const router = require('express').Router()
const defaultCtrl = require(path.resolve('./app/controller/default.js'))
const middleware = require(path.resolve('./app/middleware/authority'))

router.get('/', defaultCtrl.default)
router.get('/tmp', defaultCtrl.tmp)
router.get('/download', defaultCtrl.download)
router.post('/upload', defaultCtrl.upload)
router.post('/api/test', defaultCtrl.test)

module.exports = router