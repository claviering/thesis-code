const path = require('path')
const debug = require('debug')('app:ticker')
const tickers = require(path.resolve('./app/utils/ticker'))

module.exports = async (req, res, next) => {
  debug('req.headers', req.headers)
  let { ticker } = req.body.PSK || ''
  // 没有 ticker next
  if (!ticker) {
    next()
    return
  }
  let findTicker = await tickers.getTicker(ticker)
  debug('findTicker', findTicker)
  if (findTicker) {
    tickers.removeTicker(ticker)
    res.send({
      ticker: true,
      msg: 'ticker vaild'
    })
    return
  } else {
    res.send({
      ticker: false,
      msg: 'ticker invaild'
    })
    return
  }
}