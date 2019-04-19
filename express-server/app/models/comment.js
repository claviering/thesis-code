const path = require('path')
const config = require(path.resolve('./app/config'))
const mongoose = require('mongoose')

const commentSchema = {
  author: {
    type: String,
    default: '',
  },
  comment: {
    type: String,
    default: '',
  }
}

const commentModel = mongoose.model(config.db.commentModel, commentSchema)

module.exports = commentModel
