const path = require('path')
const router = require('express').Router()
const commentCtrl = require(path.resolve('./app/controller/comment'))

router.post('/getComment', commentCtrl.commentList)
router.post('/addComment', commentCtrl.addComment)
router.post('/deleteComment', commentCtrl.deleteComment)

module.exports = router