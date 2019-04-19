const path = require('path');
const config = require(path.resolve('./app/config'));
const mongoose = require('mongoose');

const MoneySchema = {
  name: {
    type: String,
    default: '',
  },
  money: {
    type: Number,
    default: 0,
  }
}

const moneyModel = mongoose.model(config.db.moneyModel, MoneySchema);

module.exports = moneyModel;
