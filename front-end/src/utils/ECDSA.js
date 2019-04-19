// const publicKey =
// 'MHYwEAYHKoZIzj0CAQYFK4EEACIDYgAEJGZjxWQjZBmqts6lwJ7jYbLA6nMc/GCl
// D9IyG4vFVG4iqa7zzDl6SKWSG0DZWAot/jjRZle4jDzq/EN4HlMYPMAbmnSqc7uu
// 4Sy5Jinfdaqz3vufpl8kOYLk5iT8xZKZ'
/**
 * 用EC证书公钥验证签名
 *
 * @param {ArrayBuffer} data 需要验证签名的数据
 * @param {ArrayBuffer} publicKey 公钥
 * @param {ArrayBuffer} signature 私钥签名的 MAC
 * @returns
 */
// module.exports = async (data, signature) => {
//   const result = await window.crypto.subtle.verify(
//     {
//       name: 'ECDSA',
//       hash: { name: 'SHA-384' }
//     },
//     publicKey,
//     signature,
//     data,
//   );
//   return result
// }
// module.exports = {
//   verify: async (data, signature) => {
//     const result = await window.crypto.subtle.verify(
//       {
//         name: 'ECDSA',
//         hash: { name: 'SHA-384' }
//       },
//       publicKey,
//       signature,
//       data,
//     );
//     return result
//   }
// }
