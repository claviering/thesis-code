const path = require('path')
const crypto = require('crypto')
const debug = require('debug')('app:server-hello')
const debugStateMachine = require('debug')('app:StateMachine')
const nonce = require(path.resolve('./app/utils/nonce'))
const CalcSecret = require(path.resolve('./app/ssl/calc-secret'))
const X25519 = require(path.resolve('./app/utils/js-x25519/x25519'))

let ServerHello = {
  HandShake_Type: 'Server Hello',
  Version: 'TLS 1.2',
  Random: 0,
  CipherSuites: 'TLS_CHACHA2-POLY1305_SHA256',
  Extension: {
    supported_versions: 'TLS 1.3',
    psk_key_exchange_modes: 'psk_dhe_ke',
    key_share: {
      Group: 'x25519',
      Key_Exchange_Length: 32,
      Key_Exchange: '',
    },
  }
}

module.exports = (clientHello) => {
  // 保存 clientHello 消息 用于签名
  global.ClientHello = JSON.stringify(clientHello)

  global.StateMachine = 'RECVD_CH'
  debugStateMachine('global.StateMachine', global.StateMachine)
  // 0-RTT 握手
  if (clientHello.Extension && clientHello.Extension.early_data === 'early_data') {
    global.StateMachine = 'WAIT_EOED'
    global.PSKBinders = clientHello.Extension.pre_shared_key.PSKBinders
    CalcSecret.EarlySecret()
    debugStateMachine('global.StateMachine', global.StateMachine)
  } else {
    global.StateMachine = 'WAIT_FINISHED'
    debugStateMachine('global.StateMachine', global.StateMachine)
  }
  // 密钥计算
  let clientPubilcKeyText = clientHello.Extension.key_share.Key_Exchange // 文本
  var clientPublicKeyList = clientPubilcKeyText.split(',');
  let clientPublicKeyBuffer = new Uint8Array(clientPublicKeyList)
  let randomBuffer = crypto.randomBytes(32)
  let keyBuffer = new Buffer.from(nonce(32)) // 私钥
  let publicKeyBuffer = X25519.getPublic(keyBuffer) // 公钥
  const sharedKey = X25519.getSharedKey(keyBuffer, clientPublicKeyBuffer) // 共享密钥

  global.StateMachine = 'NEGOTIATED'
  debugStateMachine('global.StateMachine', global.StateMachine)

  ServerHello.Random = randomBuffer.readUInt32LE(0).toString(10)
  ServerHello.Extension.key_share.Key_Exchange = publicKeyBuffer.toString()

  global.keyBuffer = keyBuffer
  global.sharedKey = new Uint8Array(sharedKey)
  // 保存 ServerHello 消息 用于签名
  global.ServerHello = JSON.stringify(ServerHello)
  CalcSecret.HandshakeSecret()
  return ServerHello
}