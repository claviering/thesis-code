const path = require('path')
const goodsModel = require(path.resolve('./app/models/goods'))

module.exports = {
  /**
   * @api {post} /api/goods/goodsList get goods list
   * @apiVersion 0.0.1
   * @apiName goods
   * @apiGroup goods
   *
   * @apiParam {String} pageNum page number 1 to end page number
   * @apiParam {String} pageSize page size of one page default 10 size
   *
   * @apiSuccess {Booleam} success success true or false
   * @apiSuccess {Array} items return detail
   */
  goodsList: async (req, res) => {
    let name = req.body.name || ''
    let items = await goodsModel.find({
      name
    })
    res.send({
      success: true,
      items
    })
  },
  /**
   * @api {post} /api/goods/addGoods get goodsping list
   * @apiVersion 0.0.1
   * @apiName goods
   * @apiGroup goods
   *
   * @apiParam {String} name name
   * @apiParam {Number} total total
   * @apiParam {String} type type
   * @apiParam {String} size size
   * @apiParam {String} color color
   *
   * @apiSuccess {Booleam} success success true or false
   */
  addGoods: async (req, res) => {
    let goods = {
      name: req.body.name,
      total: req.body.total,
      type: req.body.type,
      size: req.body.size,
      color: req.body.color
    }
    let query = {
      name: goods.name
    }
    let options = {
      upsert: true
    }
    let user = await goodsModel.findOneAndUpdate(query, goods, options)
    if (user) {
      res.send({
        success: true,
        msg: '更新成功'
      })
    } else {
      res.send({
        success: true,
        msg: '添加成功'
      })
    }
  }
};