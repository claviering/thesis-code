const path = require('path')
const bankModel = require(path.resolve('./app/models/bank'))
const tickers = require(path.resolve('./app/utils/ticker'))

function ticketTime (data) {
  let tickerTime = data.tickerTime
  if (!tickerTime) {
    return false
  }
  let nowTime = Date.now()
  tickerTime = Number(tickerTime)
  if (tickerTime < nowTime) {
    return false
  }
  return true
}

async function ticketOne (data) {
  let { ticker } = data
  // 没有 ticker next
  if (!ticker) {
    return false
  }
  let findTicker = await tickers.getTicker(ticker)
  console.log('findTicker', findTicker)
  if (findTicker) {
    tickers.removeTicker(ticker)
    console.log('1111111')
    return true
  } else {
    console.log('2222')
    return false
  }
}

/**
 *
 *
 * @param {*} name 钱包用户名
 * @param {*} money 添加或减少的钱，可以正数表示加，负数表示减
 * @returns
 */
async function updateMoney(name, money) {
  let findUser = await bankModel.findOne({
    name
  })
  if (!findUser) {
    return false
  }
  money += findUser.money
  let result = await bankModel.findOneAndUpdate({name}, {name, money})
  return result ? true : false
}

module.exports = {
  transfer: async (req, res) => {
    let fromUserName = req.body.fromUserName
    let toUserName = req.body.toUserName
    let money = req.body.money
    let fromResult = await updateMoney(fromUserName, -money)
    if (!fromResult) {
      res.send({success: false, msg: '转出人信息错误'})
      return
    }
    let toReasult = await updateMoney(toUserName, money)
    if (!toReasult) {
      await updateMoney(fromUserName, money)
      res.send({success: false, msg: '转入人信息错误'})
      return
    }
    res.send({success: true, msg: '转账成功'})
  },
  saveMoney: async (req, res) => {
    let name = req.body.name
    let money = req.body.money
    let result = await updateMoney(name, money)
    result ? res.send({success: true, msg: '保钱成功'}) : res.send({success: false, msg: '找不到此用户'})
  },
  noIdempotenceTransfer: (req, res) => {
    res.send('noIdempotenceTransfer done')
  },
  transferNoAttack: async (data, callback) => {
    let t = await ticketTime(data)
    if (!t) {
      callback({success: false, msg: 'Ticket过期无效'})
      return
    }
    let one = await ticketOne(data)
    if (!one) {
      callback({success: false, msg: 'Ticket已经被使用'})
      return
    }
    let fromUserName = data.fromUserName
    let toUserName = data.toUserName
    let money = data.money
    let fromResult = await updateMoney(fromUserName, -money)
    if (!fromResult) {
      callback({success: false, msg: '转出人信息错误'})
      return
    }
    let toReasult = await updateMoney(toUserName, money)
    if (!toReasult) {
      await updateMoney(fromUserName, money)
      callback({success: false, msg: '转入人信息错误'})
      return
    }
    callback({success: true, msg: '转账成功'})
  },
  transferAttack: async (data, callback) => {
    let fromUserName = data.fromUserName
    let toUserName = data.toUserName
    let money = data.money
    let fromResult = await updateMoney(fromUserName, -money)
    if (!fromResult) {
      callback({success: false, msg: '转出人信息错误'})
      return
    }
    let toReasult = await updateMoney(toUserName, money)
    if (!toReasult) {
      await updateMoney(fromUserName, money)
      callback({success: false, msg: '转入人信息错误'})
      return
    }
    callback({success: true, msg: '转账成功'})
    return
  },
};