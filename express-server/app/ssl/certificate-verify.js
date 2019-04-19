const fs = require('fs')
const path = require('path')
const crypto = require('crypto')
const debug = require('debug')('app:CertificateVerify')

// Transcript-Hash(Handshake Context, Certificate)
// RFC 4.4.3

let certificateVerify = {
  HandShake_Type: 'Certificate Verify',
  SignatureAlgorithm: 'ecdsa_secp256r1_sha256',
  Signature: ''
}
// 用服务器私钥签名
function signer(data) {
  let key = fs.readFileSync(path.resolve('./app/env/server.key'), 'utf-8')
  let sign = crypto.createSign('sha384')
  sign.update(data)
  let sig = sign.sign(key, 'base64')
  return sig
}
module.exports = () => {
  let data = global.ClientHello + global.ServerHello
  certificateVerify.Signature = signer(data)
  global.CertificateVerify = JSON.stringify(certificateVerify)
  return certificateVerify
}