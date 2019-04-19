const path = require('path')
const debug = require('debug')('app:calc-secret')
const HKDF = require(path.resolve('./app/utils/HKDF'))

// Early Secret = HKDF-Extract(salt, IKM) = HKDF-Extract(0, PSK) = HKDF-Extract(0, 0)
// Handshake Secret = HKDF-Extract(salt, IKM) = HKDF-Extract(Derive-Secret(Early Secret, "derived", ""), (EC)DHE)

// client_handshake_traffic_secret = Derive-Secret(Handshake Secret, "c hs traffic", ClientHello...ServerHello)
// server_handshake_traffic_secret = Derive-Secret(Handshake Secret, "s hs traffic", ClientHello...ServerHello)

// client_write_key = HKDF-Expand-Label(client_handshake_traffic_secret, "key", "", key_length)
// client_write_iv  = HKDF-Expand-Label(client_handshake_traffic_secret, "iv", "", iv_length)

// server_write_key = HKDF-Expand-Label(server_handshake_traffic_secret, "key", "", key_length)
// server_write_iv  = HKDF-Expand-Label(server_handshake_traffic_secret, "iv", "", iv_length)


/**
 * HKDF 导出早期数据密钥
 *
 */
exports.EarlySecret = () => {
  if (!global.PSKBinders) {
    return
  }
  let ikm = global.PSKBinders
  let info = ''
  // 计算握手加密密钥
  let binder_key = HKDF(ikm, info, 'res binder')
  debug('binder_key', binder_key)
  debug('ikm EarlySecret', ikm)
  let client_early_traffic_secret = HKDF(ikm, info, 'c e traffic')
  debug('client_early_traffic_secret', client_early_traffic_secret)
  let client_exporter_master_secret = HKDF(ikm, info, 'c exp master')
  debug('client_exporter_master_secret', client_exporter_master_secret)
}

/**
 * HKDF 导出握手数据密钥
 *
 */
exports.HandshakeSecret = () => {
  if (!global.sharedKey) {
    return
  }
  let ikm = global.sharedKey
  let info = global.ClientHello + global.ServerHello
  // 计算握手加密密钥
  let client_handshake_traffic_secret = HKDF(ikm, info, 'c hs traffic')
  let server_handshake_traffic_secret = HKDF(ikm, info, 's hs traffic')
  debug('client_handshake_traffic_secret', client_handshake_traffic_secret)
  debug('server_handshake_traffic_secret', server_handshake_traffic_secret)
}

/**
 * HKDF 导出主密钥
 *
 */
exports.MasterSecret = () => {
  let ikm = global.sharedKey
  let info = global.ClientHello +
             global.ServerHello +
             global.EncrytedExtensions +
             (global.Certificate || '') +
             (global.CertificateVerify || '') +
             global.Finished;
  // 计算握手加密密钥
  let client_application_traffic_secret = HKDF(ikm, info, 'c cap traffic')
  let server_application_traffic_secret = HKDF(ikm, info, 's cap traffic')
  let exporter_master_secret = HKDF(ikm, info, 'exp master')
  let resumption_master_secret = HKDF(ikm, info, 'res master')
  debug('client_application_traffic_secret', client_application_traffic_secret)
  debug('server_application_traffic_secret', server_application_traffic_secret)
  debug('exporter_master_secret', exporter_master_secret)
  debug('resumption_master_secret', resumption_master_secret)
}