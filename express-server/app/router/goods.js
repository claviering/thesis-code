const path = require('path')
const router = require('express').Router()
const goodsCtrl = require(path.resolve('./app/controller/goods'))
const authority = require(path.resolve('./app/middleware/authority'))

router.post('/getGoods', goodsCtrl.goodsList)
router.post('/addGoods', goodsCtrl.addGoods)

module.exports = router