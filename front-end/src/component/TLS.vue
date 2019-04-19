<template>
  <div class="tls">
    <div class="oper">
      <el-button @click="sendClientHello(1)">1-RTT</el-button>
      <el-button @click="sendClientHello(0)">0-RTT</el-button>
      <el-button @click="attck('0')">重放攻击测试</el-button>
      <el-button @click="attck('1')">抗重放攻击测试</el-button>
    </div>
    <div class="client">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>服务器返回转账消息</span>
        </div>
        <div class="text-item wrap">{{transfer}}</div>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>State Machine 客户端状态机</span>
        </div>
        <div class="text-item wrap">{{StateMachine}}</div>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>ClientHello 客户端发送的参数</span>
        </div>
        <div class="text-item wrap">客户端随机数 {{random ? random : '-'}}</div>
        <div class="text-item wrap">客户端私钥 {{privateKey.length ? privateKey : '-'}}</div>
        <div class="text-item wrap">客户端公钥 {{publicKeyBuffer.length ? publicKeyBuffer : '-'}}</div>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>Early Data 客户端发送的早期数据</span>
        </div>
        <div class="text-item wrap">{{earlyData}}</div>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>ServerHello 服务器发送参数</span>
        </div>
        <div class="text-item wrap">服务器随机数 {{serverRandom ? serverRandom : '-'}}</div>
        <div class="text-item wrap">服务器公钥 {{publicKey.length ? publicKey : '-'}}</div>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>Encryted Extensions 客户端发送的加密拓展</span>
        </div>
        <pre class="wrap">{{encrytedExtensionsData}}</pre>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>Certificate 服务器发送证书</span>
        </div>
        <pre class="wrap">{{cert}}</pre>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>CertificateVerify 服务器发送的证书认证消息</span>
        </div>
        <div class="text-item wrap">{{certificateVerifyData}}</div>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>Finished 服务器发送的 Finished消息</span>
        </div>
        <div class="text-item wrap">{{finishedData}}</div>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>SessionTicket 服务器发送的 NewSessionTicket</span>
        </div>
        <div class="text-item wrap" v-for="ticket in NewSessionTicketTicketList" :key="ticket">{{ticket}}</div>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>协商得到的密钥材料</span>
        </div>
        <div class="text-item secret-key"><div>共享密钥</div> <div>{{sharedKey}}</div></div>
        <div class="text-item secret-key" v-for="(val, key) in secret" :key="key">
          <div>{{key}}</div> <div>{{val}}</div>
        </div>
      </el-card>
    </div>

  </div>
</template>
<script>
import io from "socket.io-client";
import X25519 from "@/utils/js-x25519/x25519";
import nonce from "@/utils/nonce";
import {EarlySecret, HandshakeSecret, MasterSecret} from "@/utils/calc-secret";
import crypto from "crypto";
import regeneratorRuntime from "regenerator-runtime";
export default {
  data() {
    return {
      transfer: '', // 转账消息
      secret: {
        binder_key: '',
        client_early_traffic_secret: '',
        client_exporter_master_secret: '',
        client_handshake_traffic_secret: '',
        server_handshake_traffic_secret: '',
        client_application_traffic_secret: '',
        server_application_traffic_secret: '',
        exporter_master_secret: '',
        resumption_master_secret: ''
      }, // HKDF 导出的密钥
      content: {}, // 握手内容 用于签名和生成密钥
      StateMachine: '', // 状态机
      encrytedExtensionsData: '', // 服务器发送的加密拓展
      earlyData: '', // 0-RTT发送的早期数据
      NewSessionTicketTicketList: [], // 服务器 NewSessionTicketTicket
      finishedData: '', // 服务器 Finished 消息
      certificateVerifyData: '', // 服务器证书验证
      cert: '', // 服务器证书
      publicKeyBuffer: [], // 客户端公钥
      publicKey: [], // 服务器公钥
      sharedKey: '', // 共享密钥 string
      sharedKeyBuffer: [], // 共享密钥 Buffer
      privateKey: [], // 私钥 Buffer
      random: 0, // 32比特随机数 int
      serverRandom: 0, // 32比特随机数 int
      socket: {},
      privateKeyBuffer: []
    };
  },
  watch: {
    StateMachine: function stateMachine() {
      console.log('this.StateMachine', this.StateMachine)
    }
  },
  methods: {
    reply() {
      setInterval(this.attck('0'), 60)
      setInterval(this.attck('0'), 60)
      setInterval(this.attck('0'), 60)
      setInterval(this.attck('0'), 60)
      setInterval(this.attck('0'), 60)
      
      setInterval(this.attck('0'), 60)
      setInterval(this.attck('0'), 60)
      setInterval(this.attck('0'), 60)
      setInterval(this.attck('0'), 60)
      setInterval(this.attck('0'), 60)
    },
    attck(attck) {
      let data = {
        url: '/bank/transfer',
        early_data: '1',
        attck,
        params: {
          fromUserName: 'test',
          toUserName: 'admin',
          money: 10,
          ticker: this.NewSessionTicketTicketList[0],
          tickerTime: Date.now() + 30000
        }
      }
      this.recordLayer(data, 'Application Data Protocol')
    },
    /**
     * 封装发送记录层协议
     * 
     * @params {Object} data 握手层协议数据
     * @params {String} type 握手层协议类型
     */
    recordLayer(data, type) {
      let RecordLayer = {
        type,
        data
      }
      this.socket.emit("server", JSON.stringify(RecordLayer))
    },
    /**
     * 封装接收记录层协议
     * 
     * @params {Object} data 握手层协议数据
     * @params {String} type 握手层协议类型
     */
    getRecordLayer(recordLayer) {
      switch (recordLayer.type) {
        case 'Handshake Protocol': // 握手协议
          this.handShake(recordLayer.data)
          break;
        case 'Application Data Protocol': // 应用层协议
          this.application(recordLayer.data)
          break;
        case 'Alert': // 警报协议
          this.alert(recordLayer.data)
          break;
        default:
          break;
      }
    },
    application(recordLayerData) {
      this.transfer = recordLayerData.msg
    },
    alert(recordLayerData) {

    },
    handShake(recordLayerData) {
      switch (recordLayerData.HandShake_Type) {
        case 'Server Hello':
          this.getServerHello(recordLayerData)
          this.StateMachine = 'WAIT_EE'
          break;
        case 'Encryted Extensions':
          this.encrytedExtensions(recordLayerData)
          this.StateMachine = 'WAIT_CERT_CR'
          break;
        case 'Certificate':
          this.getCertificate(recordLayerData)
          this.StateMachine = 'WAIT_CV'
          break;
        case 'Certificate Verify':
          this.certificateVerify(recordLayerData)
          this.StateMachine = 'WAIT_FINISHED'
          break;
        case 'Finished':
          this.finished(recordLayerData)
          this.StateMachine = 'CONNECTED'
          break;
        case 'New Session Ticket':
          this.newSessionTicket(recordLayerData)
          break;
        default:
          break;
      }
    },
    // buffer 转字节字符串
    buf2hex(buffer) {
      // buffer is an ArrayBuffer
      return Array.prototype.map
        .call(new Uint8Array(buffer), x => ("00" + x.toString(16)).slice(-2))
        .join('');
    },
    sendClientHello(is1RTT) {
      console.log('is1RTT', is1RTT)
      let ClientHello = {
        HandShake_Type: "Client Hello",
        Version: "TLS 1.2",
        Random: 0,
        CipherSuites: [
          "TLS_AES_256_GCM_SHA384",
          "TLS_CHACHA2-POLY1305_SHA256",
          "TLS_AES_128_GCM_SHA256"
        ],
        Extension: {
          supported_groups: [
            "x25519",
            "secp256r1",
            "x448",
            "secp521r1",
            "secp384r1"
          ],
          signature_algorithms: [
            "ecdsa_secp256r1_sha256",
            "ecdsa_secp384r1_sha384",
            "ecdsa_secp521r1_sha521",
            "ed25519",
            "ed448"
          ],
          supported_versions: "TLS 1.3",
          psk_key_exchange_modes: "psk_dhe_ke",
          key_share: {
            Group: "x25519",
            Key_Exchange_Length: 32,
            Key_Exchange: "Key_Exchange"
          }
        }
      }
      // 0-RTT 握手
      if (!is1RTT) {
        ClientHello.Extension.early_data = 'early_data'
        let ticket = localStorage.getItem('localhost')
        ClientHello.Extension.pre_shared_key = {}
        ClientHello.Extension.pre_shared_key.Indentity = ticket
        ClientHello.Extension.pre_shared_key.ObfuscatedTicketAge = 123
        // binder 计算 用恢复密钥计算的 HMAC
        ClientHello.Extension.pre_shared_key.PSKBinders = 'PSKBinders'
        // EarlySecret(ClientHello.Extension.pre_shared_key.PSKBinders)
        let secret = EarlySecret(ClientHello.Extension.pre_shared_key.PSKBinders)
        this.secret.binder_key = secret.binder_key
        this.secret.client_early_traffic_secret = secret.client_early_traffic_secret
        this.secret.client_exporter_master_secret = secret.client_exporter_master_secret
      }
      // 32字节的随机数
      let randomBuffer = crypto.randomBytes(32);
      let keyBuffer = new Buffer.from(nonce(32)); // 私钥
      this.privateKeyBuffer = keyBuffer;
      let tmpBuffer = new Uint8Array(keyBuffer);
      this.privateKey = this.buf2hex(tmpBuffer.reverse());
      let publicKeyBuffer = X25519.getPublic(keyBuffer);
      this.publicKeyBuffer = this.buf2hex(
        new Uint8Array(publicKeyBuffer).reverse()
      );
      // buffer 转10进制
      let random = randomBuffer.readUInt32LE(0).toString(10);
      this.random = random;
      ClientHello.Random = random;
      ClientHello.Extension.key_share.Key_Exchange = publicKeyBuffer.toString();
      this.content.ClientHello = JSON.stringify(ClientHello)
      this.recordLayer(ClientHello, 'Handshake Protocol')
      this.StateMachine = 'WAIT_SH' // 状态机
      // 发送早期数据
      if (!is1RTT) {
        this.sentEarlyData()
      }
    },
    // 收到 ServerHello
    getServerHello(serverHello) {
      this.content.ServerHello = JSON.stringify(serverHello)
      this.serverRandom = serverHello.Random;
      let serverPubilcKeyText = serverHello.Extension.key_share.Key_Exchange; // 文本
      var serverPublicKeyList = serverPubilcKeyText.split(",");
      let serverPublicKeyBuffer = new Uint8Array(serverPublicKeyList);
      this.publicKey = this.buf2hex(
        new Uint8Array(serverPublicKeyBuffer).reverse()
      );
      const sharedKey = X25519.getSharedKey(
        this.privateKeyBuffer,
        serverPublicKeyBuffer
      ); // 共享密钥
      this.sharedKeyBuffer = new Uint8Array(sharedKey)
      this.sharedKey = this.buf2hex(sharedKey.reverse());
    },
    // 接受服务器的加密拓展
    encrytedExtensions(req) {
      this.encrytedExtensionsData = req.Extensions.Type
      this.content.EncrytedExtensions = JSON.stringify(req)
    },
    // 收到服务器 Certificate 消息
    async getCertificate(req) {
      this.cert = req.Certificate
      this.content.Certificate = JSON.stringify(req)
    },
    // 接收到 CertificateVerify 消息
    certificateVerify(req) {
      this.certificateVerifyData = req.Signature
      this.content.CertificateVerify = JSON.stringify(req)
    },
    // 接收到服务器的 FInished 消息
    finished(req) {
      this.content.Finished = JSON.stringify(req)
      this.finishedData = req.VerifyData
      let finish = {
        HandShake_Type: 'Finished',
        VerifyData: 'VerifyData'
      }
      if (this.encrytedExtensionsData === 'early_data') {
        this.endOfEarlyData()
      }
      this.recordLayer(finish, 'Handshake Protocol')
      // HandshakeSecret(this.sharedKeyBuffer, this.content)
      // MasterSecret(this.sharedKeyBuffer, this.content)
      let handshakeSecret = HandshakeSecret(this.sharedKeyBuffer, this.content)
      let masterSecret = MasterSecret(this.sharedKeyBuffer, this.content)
      this.secret.client_handshake_traffic_secret = handshakeSecret.client_handshake_traffic_secret
      this.secret.server_handshake_traffic_secret = handshakeSecret.server_handshake_traffic_secret

      this.secret.client_application_traffic_secret = masterSecret.client_application_traffic_secret
      this.secret.server_application_traffic_secret = masterSecret.server_application_traffic_secret
      this.secret.exporter_master_secret = masterSecret.exporter_master_secret
      this.secret.resumption_master_secret = masterSecret.resumption_master_secret
    },
    // 接收到服务器的 NewSessionTicket 消息
    newSessionTicket(req) {
      this.NewSessionTicketTicketList = []
      this.NewSessionTicketTicketList.push(req.SessionTicket)
      // 保存 ticket
      let ticket = localStorage.getItem('localhost')
      if (ticket) {
        localStorage.setItem('localhost', ticket)
      } else {
        localStorage.setItem('localhost', req.SessionTicket)
      }
    },
    sentEarlyData() {
      let earlyData = {
        url: '/bank/transfer',
        early_data: '1',
        params: {
          fromUserName: 'test',
          toUserName: 'admin',
          money: 10,
          ticker: this.NewSessionTicketTicketList[0] || '',
          tickerTime: Date.now() + 30000
        }
      }
      this.earlyData = JSON.stringify(earlyData)
      console.log(' this.earlyData',  this.earlyData)
      this.recordLayer(earlyData, 'Application Data Protocol')

    },
    endOfEarlyData() {
      let EarlyOfEarlyData = {
        HandShake_Type: 'End Of Early Data'
      }
      this.recordLayer(EarlyOfEarlyData, 'Handshake Protocol')

    }
  },
  created() {
    this.socket = io("http://localhost:9020");
    this.socket.on("client", recordLayerData => {
      recordLayerData = JSON.parse(recordLayerData)
      if (!recordLayerData) return
      this.StateMachine = this.StateMachine || 'START'
      this.getRecordLayer(recordLayerData)
    });
  }
};
</script>
<style lang="less" scoped>
.tls {
  padding-top: 24px;
  .oper{
    margin-bottom: 24px;
  }
  .client{
    .box-card{
      margin-bottom: 24px;
      .text-item{
        padding: 8px 0px;
      }
    }
    .wrap{
      overflow-wrap: break-word;
    }
    .secret-key{
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #afafaf;
    }
  }
}
</style>
