!function(L){function t(t){for(var e,n,r=t[0],i=t[1],o=t[2],s=0,a=[];s<r.length;s++)n=r[s],R[n]&&a.push(R[n][0]),R[n]=0;for(e in i)Object.prototype.hasOwnProperty.call(i,e)&&(L[e]=i[e]);for(m&&m(t);a.length;)a.shift()();return w.push.apply(w,o||[]),h()}function h(){for(var t,e=0;e<w.length;e++){for(var n=w[e],r=!0,i=1;i<n.length;i++){var o=n[i];0!==R[o]&&(r=!1)}r&&(w.splice(e--,1),t=J(J.s=n[0]))}return t}var n=window.webpackHotUpdate;window.webpackHotUpdate=function(t,e){!function(t,e){if(!B[t]||!p[t])return;for(var n in p[t]=!1,e)Object.prototype.hasOwnProperty.call(e,n)&&(C[n]=e[n]);0==--c&&0===u&&v()}(t,e),n&&n(t,e)};var o,r=!0,I="cfa6c740699acea02c0c",e=1e4,S={},P=[],i=[];var s=[],j="idle";function T(t){j=t;for(var e=0;e<s.length;e++)s[e].call(null,t)}var a,C,H,c=0,u=0,f={},p={},B={};function M(t){return+t+""===t?+t:t}function l(t){if("idle"!==j)throw new Error("check() is only allowed in idle status");return r=t,T("check"),(o=e,o=o||1e4,new Promise(function(e,n){if("undefined"==typeof XMLHttpRequest)return n(new Error("No browser support"));try{var r=new XMLHttpRequest,i=J.p+""+I+".hot-update.json";r.open("GET",i,!0),r.timeout=o,r.send(null)}catch(t){return n(t)}r.onreadystatechange=function(){if(4===r.readyState)if(0===r.status)n(new Error("Manifest request to "+i+" timed out."));else if(404===r.status)e();else if(200!==r.status&&304!==r.status)n(new Error("Manifest request to "+i+" failed."));else{try{var t=JSON.parse(r.responseText)}catch(t){return void n(t)}e(t)}}})).then(function(t){if(!t)return T("idle"),null;p={},f={},B=t.c,H=t.h,T("prepare");var e=new Promise(function(t,e){a={resolve:t,reject:e}});for(var n in C={},R)d(n);return"prepare"===j&&0===u&&0===c&&v(),e});var o}function d(t){var e,n;B[t]?(p[t]=!0,c++,e=t,(n=document.createElement("script")).charset="utf-8",n.src=J.p+""+e+"."+I+".hot-update.js",document.head.appendChild(n)):f[t]=!0}function v(){T("ready");var e=a;if(a=null,e)if(r)Promise.resolve().then(function(){return y(r)}).then(function(t){e.resolve(t)},function(t){e.reject(t)});else{var t=[];for(var n in C)Object.prototype.hasOwnProperty.call(C,n)&&t.push(M(n));e.resolve(t)}}function y(n){if("ready"!==j)throw new Error("apply() is only allowed in ready status");var t,e,r,u,i;function o(t){for(var e=[t],n={},r=e.slice().map(function(t){return{chain:[t],id:t}});0<r.length;){var i=r.pop(),o=i.id,s=i.chain;if((u=q[o])&&!u.hot._selfAccepted){if(u.hot._selfDeclined)return{type:"self-declined",chain:s,moduleId:o};if(u.hot._main)return{type:"unaccepted",chain:s,moduleId:o};for(var a=0;a<u.parents.length;a++){var h=u.parents[a],c=q[h];if(c){if(c.hot._declinedDependencies[o])return{type:"declined",chain:s.concat([h]),moduleId:o,parentId:h};-1===e.indexOf(h)&&(c.hot._acceptedDependencies[o]?(n[h]||(n[h]=[]),f(n[h],[o])):(delete n[h],e.push(h),r.push({chain:s.concat([h]),id:h})))}}}}return{type:"accepted",moduleId:t,outdatedModules:e,outdatedDependencies:n}}function f(t,e){for(var n=0;n<e.length;n++){var r=e[n];-1===t.indexOf(r)&&t.push(r)}}n=n||{};var s={},a=[],h={},c=function(){};for(var p in C)if(Object.prototype.hasOwnProperty.call(C,p)){var l;i=M(p);var d=!1,v=!1,y=!1,w="";switch((l=C[p]?o(i):{type:"disposed",moduleId:p}).chain&&(w="\nUpdate propagation: "+l.chain.join(" -> ")),l.type){case"self-declined":n.onDeclined&&n.onDeclined(l),n.ignoreDeclined||(d=new Error("Aborted because of self decline: "+l.moduleId+w));break;case"declined":n.onDeclined&&n.onDeclined(l),n.ignoreDeclined||(d=new Error("Aborted because of declined dependency: "+l.moduleId+" in "+l.parentId+w));break;case"unaccepted":n.onUnaccepted&&n.onUnaccepted(l),n.ignoreUnaccepted||(d=new Error("Aborted because "+i+" is not accepted"+w));break;case"accepted":n.onAccepted&&n.onAccepted(l),v=!0;break;case"disposed":n.onDisposed&&n.onDisposed(l),y=!0;break;default:throw new Error("Unexception type "+l.type)}if(d)return T("abort"),Promise.reject(d);if(v)for(i in h[i]=C[i],f(a,l.outdatedModules),l.outdatedDependencies)Object.prototype.hasOwnProperty.call(l.outdatedDependencies,i)&&(s[i]||(s[i]=[]),f(s[i],l.outdatedDependencies[i]));y&&(f(a,[l.moduleId]),h[i]=c)}var g,b=[];for(e=0;e<a.length;e++)i=a[e],q[i]&&q[i].hot._selfAccepted&&b.push({module:i,errorHandler:q[i].hot._selfAccepted});T("dispose"),Object.keys(B).forEach(function(t){!1===B[t]&&delete R[t]});for(var _,m,E=a.slice();0<E.length;)if(i=E.pop(),u=q[i]){var A={},D=u.hot._disposeHandlers;for(r=0;r<D.length;r++)(t=D[r])(A);for(S[i]=A,u.hot.active=!1,delete q[i],delete s[i],r=0;r<u.children.length;r++){var x=q[u.children[r]];x&&(0<=(g=x.parents.indexOf(i))&&x.parents.splice(g,1))}}for(i in s)if(Object.prototype.hasOwnProperty.call(s,i)&&(u=q[i]))for(m=s[i],r=0;r<m.length;r++)_=m[r],0<=(g=u.children.indexOf(_))&&u.children.splice(g,1);for(i in T("apply"),I=H,h)Object.prototype.hasOwnProperty.call(h,i)&&(L[i]=h[i]);var O=null;for(i in s)if(Object.prototype.hasOwnProperty.call(s,i)&&(u=q[i])){m=s[i];var k=[];for(e=0;e<m.length;e++)if(_=m[e],t=u.hot._acceptedDependencies[_]){if(-1!==k.indexOf(t))continue;k.push(t)}for(e=0;e<k.length;e++){t=k[e];try{t(m)}catch(t){n.onErrored&&n.onErrored({type:"accept-errored",moduleId:i,dependencyId:m[e],error:t}),n.ignoreErrored||O||(O=t)}}}for(e=0;e<b.length;e++){var U=b[e];i=U.module,P=[i];try{J(i)}catch(e){if("function"==typeof U.errorHandler)try{U.errorHandler(e)}catch(t){n.onErrored&&n.onErrored({type:"self-accept-error-handler-errored",moduleId:i,error:t,originalError:e}),n.ignoreErrored||O||(O=t),O||(O=e)}else n.onErrored&&n.onErrored({type:"self-accept-errored",moduleId:i,error:e}),n.ignoreErrored||O||(O=e)}}return O?(T("fail"),Promise.reject(O)):(T("idle"),new Promise(function(t){t(a)}))}var q={},R={0:0},w=[];function J(t){if(q[t])return q[t].exports;var e,r,n=q[t]={i:t,l:!1,exports:{},hot:(e=t,r={_acceptedDependencies:{},_declinedDependencies:{},_selfAccepted:!1,_selfDeclined:!1,_disposeHandlers:[],_main:o!==e,active:!0,accept:function(t,e){if(void 0===t)r._selfAccepted=!0;else if("function"==typeof t)r._selfAccepted=t;else if("object"==typeof t)for(var n=0;n<t.length;n++)r._acceptedDependencies[t[n]]=e||function(){};else r._acceptedDependencies[t]=e||function(){}},decline:function(t){if(void 0===t)r._selfDeclined=!0;else if("object"==typeof t)for(var e=0;e<t.length;e++)r._declinedDependencies[t[e]]=!0;else r._declinedDependencies[t]=!0},dispose:function(t){r._disposeHandlers.push(t)},addDisposeHandler:function(t){r._disposeHandlers.push(t)},removeDisposeHandler:function(t){var e=r._disposeHandlers.indexOf(t);0<=e&&r._disposeHandlers.splice(e,1)},check:l,apply:y,status:function(t){if(!t)return j;s.push(t)},addStatusHandler:function(t){s.push(t)},removeStatusHandler:function(t){var e=s.indexOf(t);0<=e&&s.splice(e,1)},data:S[e]},o=void 0,r),parents:(i=P,P=[],i),children:[]};return L[t].call(n.exports,n,n.exports,function(e){var n=q[e];if(!n)return J;var r=function(t){return n.hot.active?(q[t]?-1===q[t].parents.indexOf(e)&&q[t].parents.push(e):(P=[e],o=t),-1===n.children.indexOf(t)&&n.children.push(t)):P=[],J(t)},t=function(e){return{configurable:!0,enumerable:!0,get:function(){return J[e]},set:function(t){J[e]=t}}};for(var i in J)Object.prototype.hasOwnProperty.call(J,i)&&"e"!==i&&"t"!==i&&Object.defineProperty(r,i,t(i));return r.e=function(t){return"ready"===j&&T("prepare"),u++,J.e(t).then(e,function(t){throw e(),t});function e(){u--,"prepare"===j&&(f[t]||d(t),0===u&&0===c&&v())}},r.t=function(t,e){return 1&e&&(t=r(t)),J.t(t,-2&e)},r}(t)),n.l=!0,n.exports}J.m=L,J.c=q,J.d=function(t,e,n){J.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},J.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},J.t=function(e,t){if(1&t&&(e=J(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(J.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)J.d(n,r,function(t){return e[t]}.bind(null,r));return n},J.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return J.d(e,"a",e),e},J.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},J.p="",J.h=function(){return I};var g=window.webpackJsonp=window.webpackJsonp||[],b=g.push.bind(g);g.push=t,g=g.slice();for(var _=0;_<g.length;_++)t(g[_]);var m=b;w.push([198,1]),h()}({10:function(t,e,n){t.exports=n(21)(0)},129:function(t,e){},130:function(t,e){},176:function(e,t,n){(function(r){var t=n(0),i=n(20),o=n(42),s=(i=n(20),n(43));function a(t,e,n){if(!(this instanceof a))return new a(t,e,n);i.call(this),this.alen=0,this.clen=0,this.chacha=new o(t,e),this.poly=new s(this.chacha.getBytes(64)),this.tag=null,this._decrypt=n,this._hasData=!1}function h(t){var e=t%16;return e?16-e:0}t(a,i),(e.exports=a).prototype.setAAD=function(t){if(this._hasData)throw new Error("Attempting to set AAD in unsupported state");this.alen=t.length,this.poly.update(t);var e=new r(h(this.alen));e.length&&(e.fill(0),this.poly.update(e))},a.prototype._update=function(t){this._hasData||(this._hasData=!0);var e=t.length;if(!e)return next();this.clen+=e;for(var n=this.chacha.getBytes(e),r=-1;++r<e;)n[r]^=t[r];return this._decrypt?this.poly.update(t):this.poly.update(n),n},a.prototype._final=function(){if(this._decrypt&&!this.tag)throw new Error("Unsupported state or unable to authenticate data");var t=new r(h(this.clen));t.length&&(t.fill(0),this.poly.update(t));var e=new r(16);e.fill(0),e.writeUInt32LE(this.alen,0),e.writeUInt32LE(this.clen,8);var n=this.poly.update(e).finish();if(this._decrypt){if(function(t,e){var n=0;t.length!==e.length&&n++;var r=Math.min(t.length,e.length),i=-1;for(;++i<r;)n+=t[i]^e[i];return n}(n,this.tag))throw new Error("Unsupported state or unable to authenticate data")}else this.tag=n},a.prototype.getAuthTag=function(){if(this._decrypt||null===this.tag)throw new Error("Attempting to get auth tag in unsupported state");return this.tag},a.prototype.setAuthTag=function(t){if(!this._decrypt)throw new Error("Attempting to set auth tag in unsupported state");this.tag=t}}).call(this,n(2).Buffer)},177:function(t,e,n){var r=n(0),i=n(20),o=n(43);function s(t){if(!(this instanceof s))return new s(t);i.call(this,!0),this.poly=new o(t)}r(t.exports=s,i),s.prototype._update=function(t){this.poly.update(t)},s.prototype._final=function(){return this.poly.finish()}},178:function(t,e,n){var r=n(42),i=n(0),o=n(20);function s(t,e){if(!(this instanceof s))return new s(t,e);o.call(this),this.chacha=new r(t,e)}i(s,o),(t.exports=s).prototype._update=function(t){var e=t.length;if(e){for(var n=this.chacha.getBytes(e),r=-1;++r<e;)n[r]^=t[r];return n}}},179:function(e,t,n){(function(r){var t=n(0),i=n(20),o=n(42),s=n(43);t(h,i),e.exports=h;var a=new r(4);function h(t,e,n){if(!(this instanceof h))return new h(t,e,n);i.call(this),this.alen=0,this.clen=0,this.chacha=new o(t,r.concat([a,e])),this.poly=new s(this.chacha.getBytes(64)),this.tag=null,this._decrypt=n,this._hasData=!1}a.fill(0),h.prototype.setAAD=function(t){if(this._hasData)throw new Error("Attempting to set AAD in unsupported state");this.alen+=t.length,this.poly.update(t)},h.prototype._flushlentag=function(){this._hasData=!0;var t=new r(8);t.fill(0),t.writeUInt32LE(this.alen,0),this.poly.update(t)},h.prototype._update=function(t){this._hasData||this._flushlentag();var e=t.length;if(e){this.clen+=e;for(var n=this.chacha.getBytes(e),r=-1;++r<e;)n[r]^=t[r];return this._decrypt?this.poly.update(t):this.poly.update(n),n}},h.prototype._final=function(){if(this._decrypt&&!this.tag)throw new Error("Unsupported state or unable to authenticate data");this._hasData||this._flushlentag();var t=new r(8);t.fill(0),t.writeUInt32LE(this.clen,0);var e=this.poly.update(t).finish();if(this._decrypt){if(function(t,e){var n=0;t.length!==e.length&&n++;var r=Math.min(t.length,e.length),i=-1;for(;++i<r;)n+=t[i]^e[i];return n}(e,this.tag))throw new Error("Unsupported state or unable to authenticate data")}else this.tag=e},h.prototype.getAuthTag=function(){if(this._decrypt||null===this.tag)throw new Error("Attempting to get auth tag in unsupported state");return this.tag},h.prototype.setAuthTag=function(t){if(!this._decrypt)throw new Error("Attempting to set auth tag in unsupported state");this.tag=t}}).call(this,n(2).Buffer)},198:function(t,e,n){"use strict";n.r(e);var r=n(85),i=n(28).a,o=n(89),s=Object(o.a)(i,function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"app"},[n("button",{on:{click:e.chacha20}},[e._v("ChaCha20")]),e._v(" "),n("button",{on:{click:e.aesjs}},[e._v("AES JS")]),e._v(" "),n("button",{on:{click:function(t){e.getData(16384)}}},[e._v("POST 16384")]),e._v(" "),n("button",{on:{click:function(t){e.getData(131072)}}},[e._v("POST 131072")]),e._v(" "),n("button",{on:{click:function(t){e.getData(262144)}}},[e._v("POST 262144")]),e._v(" "),n("button",{on:{click:function(t){e.getData(524288)}}},[e._v("POST 524288")]),e._v(" "),n("button",{on:{click:function(t){e.getData(1048576)}}},[e._v("POST 1048576")]),e._v(" "),e._l(e.ChaCha20TimeString,function(t){return n("div",{key:t},[e._v(e._s(t))])}),e._v(" "),e._l(e.AESJSTimeString,function(t){return n("div",{key:t},[e._v(e._s(t))])}),e._v(" "),e._l(e.postTimeList,function(t){return n("div",{key:t},[e._v(e._s(t))])})],2)},[],!1,null,"e311cf2e",null);s.options.__file="App.vue";var a=s.exports;new r.default({el:"#app",render:function(t){return t(a)}})},20:function(r,t,o){(function(i){var t=o(22).Transform;function n(t){t?this.digest=e:this.final=e}function e(t){var e=this._final()||new i("");return t&&(e=e.toString(t)),e}o(0)(r.exports=n,t),["_readableState","_writableState","_transformState"].forEach(function(e){Object.defineProperty(n.prototype,e,{get:function(){return t.call(this),this[e]},set:function(t){Object.defineProperty(this,e,{value:t,enumerable:!0,configurable:!0,writable:!0})},configurable:!0,enumerable:!0})}),n.prototype.update=function(t,e,n){"string"==typeof t&&(t=new i(t,e));var r=this._update(t)||new i("");return n&&(r=r.toString(n)),this.digest?this:r},n.prototype._transform=function(t,e,n){this.push(this._update(t)),n()},n.prototype._flush=function(e){try{this.push(this._final())}catch(t){return e(t)}e()},n.prototype._final=function(){}}).call(this,o(2).Buffer)},21:function(t,e){t.exports=vue_22ecd9_dll},28:function(t,p,l){"use strict";(function(c){var a,e,t=l(86),o=l.n(t),n=l(29),h=l.n(n),r=l(87),u=l.n(r),i=l(88),s=l.n(i);function f(t,e,n,r,i,o,s){try{var a=t[o](s),h=a.value}catch(t){return void n(t)}a.done?e(h):Promise.resolve(h).then(r,i)}p.a={components:{},data:function(){return{blocksList:[16384,131072,262144,524288,1048576],name:"name",showMain:!1,AESTimeString:[],ChaCha20TimeString:[],AESJSTimeString:[],postTimeList:[],fixture:{KEY:"bcb2639bf989c6251b29bf38d39a9bdce7c55f4b2ac12a39c8a37b5d0a5cc2b5",NONCE:"1e8b4c510f5ca083",IN:"8c",AD:"34ab88c265",CT:"1a7c2f33f5",TAG:"2875c659d0f2808de3a40027feff91a4"}}},methods:{getData:(a=regeneratorRuntime.mark(function t(e){var n,r;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return n=Date.now(),t.next=3,s.a.post("/api/test",{length:e});case 3:r=Date.now()-n,this.postTimeList.push("".concat(e,"字节响应时间 ").concat(r,"ms"));case 6:case"end":return t.stop()}},t,this)}),e=function(){var t=this,s=arguments;return new Promise(function(e,n){var r=a.apply(t,s);function i(t){f(r,e,n,i,o,"next",t)}function o(t){f(r,e,n,i,o,"throw",t)}i(void 0)})},function(t){return e.apply(this,arguments)}),aesjs:function(){for(var t=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],e=[],n=0;n<this.blocksList.length;n++){var r="T".repeat(this.blocksList[n]),i=h.a.utils.utf8.toBytes(r),o=Date.now(),s=(new h.a.ModeOfOperation.ctr(t,new h.a.Counter(5)).encrypt(i),Date.now()-o);e.push("AES JS 加密".concat(this.blocksList[n],"时间").concat(s,"ms "))}this.AESJSTimeString=e},aes:function(){for(var t=[],e=0;e<this.blocksList.length;e++){var n=Date.now(),r=o.a.encrypt("h".repeat(this.blocksList[e]),"12345678901234567890123456789012"),i=(r.ciphertext,r.iv,r.tag,Date.now()-n);t.push("AES 加密".concat(this.blocksList[e],"时间").concat(i,"ms "))}this.AESTimeString=t},chacha20:function(){for(var t=new c(this.fixture.KEY,"hex"),e=new c(this.fixture.NONCE,"hex"),n=new c(this.fixture.AD,"hex"),r=(new c(this.fixture.CT,"hex"),new c(this.fixture.TAG,"hex"),[]),i=0;i<this.blocksList.length;i++){var o=new c(this.fixture.IN.repeat(this.blocksList[i]),"hex"),s=Date.now(),a=new u.a.AeadLegacy(t,e);n.length&&a.setAAD(n);a.update(o);a.final();a.getAuthTag(),a.getAuthTag();var h=Date.now()-s;r.push("ChaCha 加密".concat(this.blocksList[i],"时间").concat(h,"ms "))}this.ChaCha20TimeString=r}}}}).call(this,l(2).Buffer)},42:function(e,t,n){(function(i){function o(t,e){return t<<e|t>>>32-e}var n=new i("expand 32-byte k");function t(t,e){this.input=new Uint32Array(16),this.input[0]=n.readUInt32LE(0),this.input[1]=n.readUInt32LE(4),this.input[2]=n.readUInt32LE(8),this.input[3]=n.readUInt32LE(12),this.input[4]=t.readUInt32LE(0),this.input[5]=t.readUInt32LE(4),this.input[6]=t.readUInt32LE(8),this.input[7]=t.readUInt32LE(12),this.input[8]=t.readUInt32LE(16),this.input[9]=t.readUInt32LE(20),this.input[10]=t.readUInt32LE(24),this.input[11]=t.readUInt32LE(28),this.input[12]=0,this.input[13]=e.readUInt32LE(0),this.input[14]=e.readUInt32LE(4),this.input[15]=e.readUInt32LE(8),this.cachePos=64,this.buffer=new Uint32Array(16),this.output=new i(64)}(e.exports=t).prototype.quarterRound=function(t,e,n,r){var i=this.buffer;i[t]+=i[e],i[r]=o(i[r]^i[t],16),i[n]+=i[r],i[e]=o(i[e]^i[n],12),i[t]+=i[e],i[r]=o(i[r]^i[t],8),i[n]+=i[r],i[e]=o(i[e]^i[n],7)},t.prototype.makeBlock=function(t,e){for(var n=-1;++n<16;)this.buffer[n]=this.input[n];for(n=-1;++n<10;)this.quarterRound(0,4,8,12),this.quarterRound(1,5,9,13),this.quarterRound(2,6,10,14),this.quarterRound(3,7,11,15),this.quarterRound(0,5,10,15),this.quarterRound(1,6,11,12),this.quarterRound(2,7,8,13),this.quarterRound(3,4,9,14);for(n=-1;++n<16;)this.buffer[n]+=this.input[n],t.writeUInt32LE(this.buffer[n],e),e+=4;if(this.input[12]++,!this.input[12])throw new Error("counter is exausted")},t.prototype.getBytes=function(t){var e=0,n=new i(t),r=64-this.cachePos;if(r){if(t<=r)return this.output.copy(n,0,this.cachePos,64),this.cachePos+=t,n;this.output.copy(n,0,this.cachePos,64),t-=r,e+=r,this.cachePos=64}for(;0<t;){if(t<=64)return this.makeBlock(this.output,0),this.output.copy(n,e,0,t),t<64&&(this.cachePos=t),n;this.makeBlock(n,e),t-=64,e+=64}throw new Error("something bad happended")}}).call(this,n(2).Buffer)},43:function(t,e,n){(function(s){function r(t){if(!(this instanceof r))return new r(t);this.buffer=new s(16),this.leftover=0,this.r=new Uint16Array(10),this.h=new Uint16Array(10),this.pad=new Uint16Array(8),this.finished=0;var e,n=new Uint16Array(8);for(e=8;e--;)n[e]=t.readUInt16LE(2*e);for(this.r[0]=8191&n[0],this.r[1]=8191&(n[0]>>>13|n[1]<<3),this.r[2]=7939&(n[1]>>>10|n[2]<<6),this.r[3]=8191&(n[2]>>>7|n[3]<<9),this.r[4]=255&(n[3]>>>4|n[4]<<12),this.r[5]=n[4]>>>1&8190,this.r[6]=8191&(n[4]>>>14|n[5]<<2),this.r[7]=8065&(n[5]>>>11|n[6]<<5),this.r[8]=8191&(n[6]>>>8|n[7]<<8),this.r[9]=n[7]>>>5&127,e=8;e--;)this.h[e]=0,this.pad[e]=t.readUInt16LE(16+2*e);this.h[8]=0,this.h[9]=0,this.leftover=0,this.finished=0}(t.exports=r).prototype.blocks=function(t,e,n){for(var r=this.finished?0:2048,i=new Uint16Array(8),o=new Uint32Array(10),s=0,a=0,h=0;16<=n;){for(a=8;a--;)i[a]=t.readUInt16LE(2*a+e);for(this.h[0]+=8191&i[0],this.h[1]+=8191&(i[0]>>>13|i[1]<<3),this.h[2]+=8191&(i[1]>>>10|i[2]<<6),this.h[3]+=8191&(i[2]>>>7|i[3]<<9),this.h[4]+=8191&(i[3]>>>4|i[4]<<12),this.h[5]+=i[4]>>>1&8191,this.h[6]+=8191&(i[4]>>>14|i[5]<<2),this.h[7]+=8191&(i[5]>>>11|i[6]<<5),this.h[8]+=8191&(i[6]>>>8|i[7]<<8),this.h[9]+=i[7]>>>5|r,s=a=0;a<10;a++){for(o[a]=s,h=0;h<10;h++)o[a]+=(4294967295&this.h[h])*(h<=a?this.r[a-h]:5*this.r[a+10-h]),4===h&&(s=o[a]>>>13,o[a]&=8191);s+=o[a]>>>13,o[a]&=8191}for(s=(s<<2)+s,s+=o[0],o[0]=8191&s,s>>>=13,o[1]+=s,a=10;a--;)this.h[a]=o[a];e+=16,n-=16}},r.prototype.update=function(t){var e=t.length,n=0,r=0,i=0;if(this.leftover){for(e<(n=16-this.leftover)&&(n=e),r=n;r--;)this.buffer[this.leftover+r]=t[r+i];if(e-=n,i+=n,this.leftover+=n,this.leftover<16)return this;this.blocks(this.buffer,0,16),this.leftover=0}if(16<=e&&(n=-16&e,this.blocks(t,i,n),i+=n,e-=n),e){for(r=e;r--;)this.buffer[this.leftover+r]=t[r+i];this.leftover+=e}return this},r.prototype.finish=function(){var t=new s(16),e=new Uint16Array(10),n=0,r=0,i=0,o=0;if(this.leftover){for(o=this.leftover,this.buffer[o++]=1;o<16;o++)this.buffer[o]=0;this.finished=1,this.blocks(this.buffer,0,16)}for(n=this.h[1]>>>13,this.h[1]&=8191,o=2;o<10;o++)this.h[o]+=n,n=this.h[o]>>>13,this.h[o]&=8191;for(this.h[0]+=5*n,n=this.h[0]>>>13,this.h[0]&=8191,this.h[1]+=n,n=this.h[1]>>>13,this.h[1]&=8191,this.h[2]+=n,e[0]=this.h[0]+5,n=e[0]>>>13,e[0]&=8191,o=1;o<10;o++)e[o]=this.h[o]+n,n=e[o]>>>13,e[o]&=8191;for(e[9]-=8192,r=(e[9]>>>15)-1,o=10;o--;)e[o]&=r;for(r=~r,o=10;o--;)this.h[o]=this.h[o]&r|e[o];for(this.h[0]=this.h[0]|this.h[1]<<13,this.h[1]=this.h[1]>>3|this.h[2]<<10,this.h[2]=this.h[2]>>6|this.h[3]<<7,this.h[3]=this.h[3]>>9|this.h[4]<<4,this.h[4]=this.h[4]>>12|this.h[5]<<1|this.h[6]<<14,this.h[5]=this.h[6]>>2|this.h[7]<<11,this.h[6]=this.h[7]>>5|this.h[8]<<8,this.h[7]=this.h[8]>>8|this.h[9]<<5,i=(4294967295&this.h[0])+this.pad[0],this.h[0]=i,o=1;o<8;o++)i=(4294967295&this.h[o])+this.pad[o]+(i>>>16),this.h[o]=i;for(o=8;o--;)t.writeUInt16LE(this.h[o],2*o),this.pad[o]=0;for(o=10;o--;)this.h[o]=0,this.r[o]=0;return t}}).call(this,n(2).Buffer)},8:function(t,e,n){t.exports=n(21)(5)},85:function(t,e,n){t.exports=n(21)(2)},87:function(t,e,n){var r=n(176);e.aead=r,e.createCipher=function(t,e){return new r(t,e)},e.createDecipher=function(t,e){return new r(t,e,!0)},e.createHmac=n(177),e.chacha20=e.ChaCha20=n(178),e.aeadLegacy=e.AeadLegacy=n(179)},93:function(t,e){},95:function(t,e){},96:function(t,e,n){t.exports=n(21)(3)}});