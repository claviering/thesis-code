<template>
  <div class="test">
    <button @click="chacha20">ChaCha20</button>
    <button @click="aesjs">AES JS</button>
    <button @click="getData(16384)">POST 16384</button>
    <button @click="getData(131072)">POST 131072</button>
    <button @click="getData(262144)">POST 262144</button>
    <button @click="getData(524288)">POST 524288</button>
    <button @click="getData(1048576)">POST 1048576</button>
    <div v-for="value in ChaCha20TimeString" :key="value">{{value}}</div>
    <div v-for="value in AESJSTimeString" :key="value">{{value}}</div>
    <div v-for="value in postTimeList" :key="value">{{value}}</div>
  </div>
</template>
<script>
import Aes from "aes-256-gcm";
import aesjs from "aes-js";
import chacha from '../chacha20/browser'
import axios from "axios";
import regeneratorRuntime from "regenerator-runtime";
export default {
  components: {},
  data() {
    return {
      blocksList: [16384, 131072, 262144, 524288, 1048576],
      name: "name",
      showMain: false,
      AESTimeString: [],
      ChaCha20TimeString: [],
      AESJSTimeString: [],
      postTimeList: [],
      fixture: {
        KEY: "bcb2639bf989c6251b29bf38d39a9bdce7c55f4b2ac12a39c8a37b5d0a5cc2b5",
        NONCE: "1e8b4c510f5ca083",
        IN: "8c", // 1 Byte
        AD: "34ab88c265",
        CT: "1a7c2f33f5",
        TAG: "2875c659d0f2808de3a40027feff91a4"}
    };
  },
  methods: {
    async getData(length) {
      const start = Date.now();
      await axios.post('/api/test', {length})
      const responseTime = Date.now() - start;
      console.log('responseTime', responseTime + 'ms')
      this.postTimeList.push(`${length}字节响应时间 ${responseTime}ms`)
    },
    aesjs() {
      let key_256 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
      let text = 'T';
      let time = []
      for (let i = 0; i < this.blocksList.length; i ++) {
        let plain = text.repeat(this.blocksList[i])
        let textBytes = aesjs.utils.utf8.toBytes(plain);
        const start = Date.now();
        let aesCtr = new aesjs.ModeOfOperation.ctr(key_256, new aesjs.Counter(5));
        let encryptedBytes = aesCtr.encrypt(textBytes);
        const responseTime = Date.now() - start;
        time.push(`AES JS 加密${this.blocksList[i]}时间${responseTime}ms `)
      }
      this.AESJSTimeString = time
      console.log(time)
    },
    aes() {
      // Must be 32 Bytes.
      const SHARED_SECRET = "12345678901234567890123456789012";
      let plain = 'h' // 2 Byte
      let time = []
      for (let i = 0; i < this.blocksList.length; i ++) {
        const start = Date.now();
        let { ciphertext, iv, tag } = Aes.encrypt(plain.repeat(this.blocksList[i]), SHARED_SECRET);
        const responseTime = Date.now() - start;
        time.push(`AES 加密${this.blocksList[i]}时间${responseTime}ms `)
      }
      this.AESTimeString = time
    },
    chacha20() {
      let key = new Buffer(this.fixture.KEY, 'hex');
      let nonce = new Buffer(this.fixture.NONCE, 'hex');
      let ad = new Buffer(this.fixture.AD, 'hex');
      let ciphertext = new Buffer(this.fixture.CT, 'hex');
      let tag = new Buffer(this.fixture.TAG, 'hex');
      let time = []
      for (let i = 0; i < this.blocksList.length; i ++) {
        let plain = new Buffer(this.fixture.IN.repeat(this.blocksList[i]), 'hex');
        const start = Date.now();
        let cipher = new chacha.AeadLegacy(key, nonce);
        if (ad.length) {
          cipher.setAAD(ad);
        }
        let output = cipher.update(plain);
        cipher.final();
        var atag = cipher.getAuthTag();
        var outTag = cipher.getAuthTag();
        const responseTime = Date.now() - start;
        time.push(`ChaCha 加密${this.blocksList[i]}时间${responseTime}ms `)
      }
      this.ChaCha20TimeString = time
      console.log(time)
    }
  }
};
</script>
<style lang="less" scoped>
</style>
