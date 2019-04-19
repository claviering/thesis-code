const path = require('path')
const config = require(path.resolve('./app/config'))
const mongoose = require('mongoose')

const GoodsSchema = {
  name: {
    type: String,
    default: '',
    required: true
  },
  total: {
    type: Number,
    default: 0,
  },
  type: {
    type: String,
    default: '',
  },
  size: {
    type: String,
    default: '',
  },
  color: {
    type: String,
    default: '',
  }
}

const goodsModel = mongoose.model(config.db.goodsModel, GoodsSchema)

module.exports = goodsModel
