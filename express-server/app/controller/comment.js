const path = require('path')
const commentModel = require(path.resolve('./app/models/comment'))

module.exports = {
  /**
   * @api {post} /api/comment/commentList get comment list
   * @apiVersion 0.0.1
   * @apiName Comment
   * @apiGroup Comment
   *
   * @apiParam {String} pageNum page number 1 to end page number
   * @apiParam {String} pageSize page size of one page default 10 size
   *
   * @apiSuccess {Booleam} success success true or false
   * @apiSuccess {Array} items return detail
   */
  commentList: async (req, res) => {
    let items = await commentModel.find()
    res.send({
      success: true,
      items
    })
  },
  /**
   * @api {post} /api/comment/addComment add commentping list
   * @apiVersion 0.0.1
   * @apiName Comment
   * @apiGroup Comment
   *
   * @apiParam {String} author author
   * @apiParam {String} comment comment
   *
   * @apiSuccess {Booleam} success success true or false
   */
  addComment: async (req, res) => {
    let comment = {
      author: req.body.author,
      comment: req.body.comment
    }
    console.log('comment', comment)
    const newComment = new commentModel(comment)
    let isAdd = await newComment.save()
    if (isAdd) {
      res.send({
        success: true,
        msg: '添加成功'
      })
    } else {
      res.send({
        success: false,
        msg: '添加失败'
      })
    }
  },
  /**
   * @api {post} /api/comment/deleteComment delete commentping list
   * @apiVersion 0.0.1
   * @apiName Comment
   * @apiGroup Comment
   *
   * @apiParam {String} _id _id
   *
   * @apiSuccess {Booleam} success success true or false
   */
  deleteComment: async (req, res) => {
    let comment = {
      _id: req.body._id
    }
    let isDelete = await commentModel.deleteOne(comment)
    if (isDelete) {
      res.send({
        success: true,
        msg: '删除成功'
      })
    } else {
      res.send({
        success: false,
        msg: '删除失败'
      })
    }
  }
};