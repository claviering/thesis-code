module.exports = async (req, res, next) => {
  let { tickerTime } = req.body.PSK || ''
  if (!tickerTime) {
    res.send({
      ticker: false,
      msg: 'tickerTime must send'
    })
    return
  }
  let nowTime = Date.now()
  tickerTime = Number(tickerTime)
  if (tickerTime < nowTime) {
    res.send({
      ticker: false,
      msg: 'ticker invaild life time'
    })
    return
  } else {
    next()
  }
}