/**
 * Uint8Array buffer转字符串
 *
 * @param {Uint8Array} buffer
 * @returns String
 */
export const buf2Str = (buffer) => {
  return String.fromCharCode.apply(null, new Uint16Array(buffer));
}

/**
 * 字符串转 Uint8Array
 *
 * @param {String} str
 * @returns Uint8Array
 */
export const str2ab = (str) => {
  let buf = new ArrayBuffer(str.length);
  let bufView = new Uint8Array(buf);
  for (let i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}