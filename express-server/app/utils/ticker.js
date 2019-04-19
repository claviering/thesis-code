const path = require('path')
const { client } = require(path.resolve('./app/middleware/redis'))

module.exports = {
  getTicker: (ticker) => {
    return new Promise((resolve, reject) => {
      client.get(ticker, (err, reply) => {
        reply = JSON.parse(reply)
        resolve(reply)
      })
    })
  },
  removeTicker: (ticker) => {
    try {
      client.del(ticker)
    } catch (err) {
      throw err
    }
  },
  /**
   *
   *
   * @param {*} ticker PSK ticker
   * @param {*} value PSK value default = '1'
   * @param {*} expiredTime PSK ticker 过期时间 单位秒 默认 7d = 604800s
   */
  setTicker: async (ticker, value = '1', expiredTime = 604800) => {
    try {
      await client.set(ticker, value, 'EX', expiredTime)
    } catch (err) {
      throw err
    }
  }
};
