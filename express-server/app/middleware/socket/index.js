const path = require('path')
const debug = require('debug')('app:socket')
const debugStateMachine = require('debug')('app:StateMachine')
const SSL = require(path.resolve('./app/ssl'))
const CalcSecret = require(path.resolve('./app/ssl/calc-secret'))
const bankCtrl = require(path.resolve('./app/controller/bank'))


/**
 * 处理握手协议
 *
 * @param {Object} recordLayer 记录层传输的数据
 * @param {*} io socket实例
 */
function handShake(recordLayer, io) {
  let type = 'Handshake Protocol'
  switch (recordLayer.HandShake_Type) {
    case 'Client Hello': // 收到 客户端的 ClientHello
      recordLayerSender(SSL.serverHello(recordLayer), type, io)
      if (global.StateMachine === 'WAIT_EOED') {
        recordLayerSender(SSL.encrytedExtensions(recordLayer), type, io)
        recordLayerSender(SSL.finished(recordLayer), type, io)
        return
      }
      recordLayerSender(SSL.encrytedExtensions(recordLayer), type, io)
      recordLayerSender(SSL.certificate(recordLayer), type, io)
      recordLayerSender(SSL.certificateVerify(recordLayer), type, io)
      recordLayerSender(SSL.finished(recordLayer), type, io)
      global.StateMachine = 'WAIT_FINISHED'
      debugStateMachine('global.StateMachine', global.StateMachine)
      break;
    case 'Finished': // 收到客户端的 Finished
      global.StateMachine = 'CONNECTED'
      debugStateMachine('global.StateMachine', global.StateMachine)
      recordLayerSender(SSL.newSessionTicket(recordLayer), type, io)
      CalcSecret.MasterSecret()
      break;
    case 'End Of Early Data': // 收到客户端的 Early Of Early Data
      global.StateMachine = 'WAIT_FINISHED'
      debugStateMachine('global.StateMachine', global.StateMachine)
      break;
    default:
      break;
  }
}

/**
 * 处理警报协议
 *
 * @param {*} data 数据
 */
function alert(data, io) {
  debug('处理警报协议', data)
}

/**
 * 处理应用层协议
 *
 * @param {*} data 数据
 */
function application(data, io) {
  debug('处理应用层协议', data)
  switch (data.attck) {
    case '0':
      bankCtrl.transferAttack(data.params, res => {
        recordLayerSender(res, 'Application Data Protocol', io)
        console.log('res', res)
      })
      break;
    case '1':
      bankCtrl.transferNoAttack(data.params, res => {
        recordLayerSender(res, 'Application Data Protocol', io)
        console.log('res', res)
      })
      break;
    default:
      bankCtrl.transferNoAttack(data.params, res => {
        recordLayerSender(res, 'Application Data Protocol', io)
        console.log('res', res)
      })
      break;
  }
}

/**
 * 接收应用层消息处理
 *
 * @param {*} recordLayer 应用层数据
 * @param {*} io
 */
function record(recordLayer, io) {
  switch (recordLayer.type) {
    case 'Handshake Protocol': // 握手协议
      handShake(recordLayer.data, io)
      break;
    case 'Application Data Protocol': // 应用层协议
      application(recordLayer.data, io)
      break;
    case 'Alert': // 警报协议
      alert(recordLayer.data, io)
      break;
    default:
      io.emit('client', {})
      break;
  }
}

/**
 * 发送应用层消息处理
 *
 * @param {*} data 上层要发送的数据
 * @param {*} io
 */
function recordLayerSender(data, type, io) {
  let RecordLayer = {
    type,
    data
  }
  io.emit('client', JSON.stringify(RecordLayer))
}



module.exports = (app) => {
  const http = require('http').Server(app)
  const io = require('socket.io')(http)
  io.on('connection', socket => {
    debug('client connection')
    socket.on('server', recordLayerData => {
      // 重新连接
      if (global.StateMachine === 'CONNECTED') {
        global.StateMachine = 'CONNECTED'
      }
      global.StateMachine = global.StateMachine || 'START'
      debugStateMachine('global.StateMachine', global.StateMachine)
      recordLayerData = JSON.parse(recordLayerData)
      if (!recordLayerData) return
        record(recordLayerData, io)
    })
  })
  return http
}