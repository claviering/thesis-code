const path = require('path');
const config = require(path.resolve('./app/config'));
const mongoose = require('mongoose');

const UserSchema = {
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    default: '',
    required: true
  },
  gender: {
    type: String,
    default: '0',
  },
  grade: {
    type: String,
    default: 'grade',
  },
  money: {
    type: Number,
    default: 0,
  },
  createTime: {
    type: String,
    default: 'createTime'
  }
}

const userModel = mongoose.model(config.db.usersModel, UserSchema);

module.exports = userModel;
