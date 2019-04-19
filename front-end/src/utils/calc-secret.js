import { HKDF } from "@/utils/HKDF"

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
 * PSKBinders
 */
export const EarlySecret = (PSKBinders) => {
  if (!PSKBinders) {
    return
  }
  const ikm = PSKBinders
  const info = ''
  // 计算握手加密密钥
  const binder_key = HKDF(ikm, info, 'res binder')
  const client_early_traffic_secret = HKDF(ikm, info, 'c e traffic')
  const client_exporter_master_secret = HKDF(ikm, info, 'c exp master')
  return {
    binder_key,
    client_early_traffic_secret,
    client_exporter_master_secret
  }
}

/**
 * HKDF 导出握手数据密钥
 * @param {BufferArray}  sharedKey 共享密钥
 * @param {Object}  content 握手内容
 */
export const HandshakeSecret = (sharedKey, content) => {
  if (!sharedKey) {
    return
  }
  const ikm = sharedKey
  const info = content.ClientHello + content.ServerHello
  // 计算握手加密密钥
  const client_handshake_traffic_secret = HKDF(ikm, info, 'c hs traffic')
  const server_handshake_traffic_secret = HKDF(ikm, info, 's hs traffic')
  return {
    client_handshake_traffic_secret,
    server_handshake_traffic_secret
  }
}

/**
 * HKDF 导出主密钥
 * @param {BufferArray}  sharedKey 共享密钥
 * @param {Object}  content 握手内容
 */
export const MasterSecret = (sharedKey, content) => {
  const ikm = sharedKey
  const info = content.ClientHello +
               content.ServerHello +
               content.EncrytedExtensions +
               (content.Certificate || '') +
               (content.CertificateVerify || '') +
               content.Finished;
  // 计算握手加密密钥
  const client_application_traffic_secret = HKDF(ikm, info, 'c cap traffic')
  const server_application_traffic_secret = HKDF(ikm, info, 's cap traffic')
  const exporter_master_secret = HKDF(ikm, info, 'exp master')
  const resumption_master_secret = HKDF(ikm, info, 'res master')
  return {
    client_application_traffic_secret,
    server_application_traffic_secret,
    exporter_master_secret,
    resumption_master_secret
  }
}
