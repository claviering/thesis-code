/**
 * 导出证书中的公钥
 *
 * @param {String} key 需要验证签名的数据
 * @returns
 */
module.exports = async (key) => {
  const exported = await window.crypto.subtle.exportKey(
    'jwk',
    key
  )
  return exported
}
