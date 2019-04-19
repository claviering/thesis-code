const fs = require('fs')
const path = require('path')

let certificate = {
  HandShake_Type: 'Certificate',
  Certificate: ''
}

module.exports = () => {
  let data = fs.readFileSync(path.resolve('./app/env/server.crt'), 'utf8')
  certificate.Certificate = data
  global.Certificate = JSON.stringify(certificate)
  return certificate
}