const X25519 = require('./x25519');
let secret1 = new Buffer.from('11111111111111111111111111111111')
console.log(secret1.length)
console.log(secret1)
let p1 = X25519.getPublic(secret1)
console.log('p1', p1.toString(16));

let secret2 = new Buffer.from('11111111111111111111111111111112')
console.log(secret2.length)
console.log(secret2)
let p2 = X25519.getPublic(secret2)
console.log('p2', p2.toString(16));

const shared1 = X25519.getSharedKey(secret1, p2);
const shared2 = X25519.getSharedKey(secret2, p1);
console.log(shared1.toString(16));
console.log(shared2.toString(16));