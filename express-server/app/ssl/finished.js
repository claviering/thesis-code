const crypto = require('crypto')

const key = 'a secret key'
let finish = {
  HandShake_Type: 'Finished',
  VerifyData: 'VerifyData'
}

module.exports = () => {
  const hmac = crypto.createHmac('sha384', key)
  // 签名整个握手
  let data = global.ClientHello +
             global.EncrytedExtensions +
             (global.Certificate || '') +
             (global.CertificateVerify || '') +
             global.ServerHello;
  hmac.update(data)
  finish.VerifyData = hmac.digest('hex')
  global.Finished = JSON.stringify(finish)
  return finish
}