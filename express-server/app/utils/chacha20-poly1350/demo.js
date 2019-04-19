let chacha = require('./chacha20-poly1305');

// key 32 Byte 256 bit
let fixture = {
  KEY: "12345678901234567890123456789012",
  NONCE: "1e8b4c510f5ca083",
  IN: "data data data data data",
  AAD: "Hello World",
}
let res = chacha(fixture.KEY, fixture.IN, fixture.NONCE, fixture.AAD)
// console.log(res);