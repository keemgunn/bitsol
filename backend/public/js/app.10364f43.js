(function(e){function t(t){for(var o,s,c=t[0],i=t[1],u=t[2],f=0,p=[];f<c.length;f++)s=c[f],Object.prototype.hasOwnProperty.call(r,s)&&r[s]&&p.push(r[s][0]),r[s]=0;for(o in i)Object.prototype.hasOwnProperty.call(i,o)&&(e[o]=i[o]);l&&l(t);while(p.length)p.shift()();return a.push.apply(a,u||[]),n()}function n(){for(var e,t=0;t<a.length;t++){for(var n=a[t],o=!0,c=1;c<n.length;c++){var i=n[c];0!==r[i]&&(o=!1)}o&&(a.splice(t--,1),e=s(s.s=n[0]))}return e}var o={},r={app:0},a=[];function s(t){if(o[t])return o[t].exports;var n=o[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.m=e,s.c=o,s.d=function(e,t,n){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)s.d(n,o,function(t){return e[t]}.bind(null,o));return n},s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="/";var c=window["webpackJsonp"]=window["webpackJsonp"]||[],i=c.push.bind(c);c.push=t,c=c.slice();for(var u=0;u<c.length;u++)t(c[u]);var l=i;a.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var o,r,a=n("2b0e"),s=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{style:e.themeColor,attrs:{id:"app"}},[0===this.$store.state.accessLevel?n("div",{attrs:{id:"loginBox"}},[n("form",{attrs:{autocomplete:"off"},on:{submit:e.login}},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.key,expression:"key"}],staticClass:"id_field",attrs:{type:"text",placeholder:"id:",name:"id",id:"id_field",required:""},domProps:{value:e.key},on:{input:function(t){t.target.composing||(e.key=t.target.value)}}}),n("input",{staticClass:"btn",attrs:{type:"submit",value:"login"}}),n("label",{staticClass:"id_label",attrs:{for:"id"}},[e._v("id:")])]),n("input",{staticClass:"btn",attrs:{type:"button",value:"heimdall"},on:{click:e.heimdall}}),n("h1",[e._v(e._s(e.key))])]):e._e(),0!==this.$store.state.accessLevel?n("Manager",{key:"manager",attrs:{accessLevel:this.$store.accessLevel},on:{"manager-created":e.reIssueToken,logout:e.logout}}):e._e(),n("router-view")],1)},c=[],i=(n("96cf"),n("1da1")),u=n("bc3a"),l=n.n(u),f=n("11c1"),p=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"online"},[n("h1",[e._v("Online.vue")]),n("input",{staticClass:"btn",attrs:{type:"button",value:"logout"},on:{click:e.logout}}),n("h1",[e._v(e._s(this.$store.state.userKey))]),n("h2",[e._v("accessLevel: "+e._s(this.$store.state.accessLevel))]),n("h3",[e._v("modal.display: "+e._s(this.$store.state.modal.display))])])},d=[],m={name:"Online",components:{},props:[],data:function(){return{}},methods:{logout:function(){this.$emit("logout")}},created:function(){},mounted:function(){console.log("mounted"),this.$emit("manager-created")},beforeDestroy:function(){}},g=m,h=n("2877"),v=Object(h["a"])(g,p,d,!1,null,"17289d89",null),y=v.exports,O={name:"App",components:{Manager:y},data:function(){return{themeColor:{"--i100":"#ffffff","--i98":"#FAFAFA","--i94":"#F0F0F0","--i90":"#E6E6E6","--i80":"#CCCCCC","--i70":"#B3B3B3","--i60":"#999999","--i45":"#737373","--i30":"#4D4D4D","--i0":"#000000","--accent02":"#FF7955","--accent01":"#FF9470"},key:null,msg:"Hello",testArr:[],test00:null}},methods:{login:function(e){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return e.preventDefault(),o=new Date,r=Object(f["v4"])(),localStorage.requestPoint=r,n.next=6,t.getToken(t.key,10800,o,r);case 6:l.a.defaults.headers.common["Authorization"]=n.sent,t.loadConfig(t.key),t.heimdall();case 9:case"end":return n.stop()}}),n)})))()},getToken:function(e,t,n,o){var r=this;return Object(i["a"])(regeneratorRuntime.mark((function a(){var s,c;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,l.a.post("auth/issue",{key:e,expiresIn:t,accessTime:n,requestPoint:o});case 2:return s=a.sent,c=s.data,r.$store.dispatch("ISSUED",c),a.abrupt("return",c.accessToken);case 6:case"end":return a.stop()}}),a)})))()},loadConfig:function(e){this.$store.dispatch("LOAD_CONFIG",{key:e})},logout:function(){this.$store.dispatch("LOGOUT")},setModal:function(e,t){this.$store.dispatch("SET_MODAL",{property:e,state:t})},heimdall:function(){this.$store.dispatch("VERIFY")},sessionOut:function(){l.a.post("auth/reissue",{key:localStorage.userKey,requestPoint:r})},reIssueToken:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return r=localStorage.requestPoint,o=new Date,t.next=4,e.getToken(localStorage.userKey,10800,o,r);case 4:l.a.defaults.headers.common["Authorization"]=t.sent;case 5:case"end":return t.stop()}}),t)})))()}},created:function(){var e=this;this.heimdall(),window.addEventListener("beforeunload",Object(i["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:e.sessionOut();case 1:case"end":return t.stop()}}),t)}))))}},$=O,b=(n("5c0b"),Object(h["a"])($,s,c,!1,null,null,null)),k=b.exports,w=n("8c4f");a["a"].use(w["a"]);var S=new w["a"]({mode:"history",base:"/",routes:[]}),_=n("2f62");a["a"].use(_["a"]);var I=new _["a"].Store({state:{accessToken:null,expiresIn:0,userKey:null,accessLevel:0,userName:null,colorConfig:"default",modal:{display:"refg"}},getters:{isAuthenticated:function(e){return e.accessToken=e.accessToken||localStorage.accessToken,e.accessToken}},mutations:{ISSUED:function(e,t){var n=t.data;console.log("$$$ mutation:ISSUED ...$store"),console.log(n),e.accessToken=n.accessToken,localStorage.accessToken=n.accessToken,e.expiresIn=n.expiresIn,localStorage.expiresIn=n.expiresIn,e.userKey=n.userKey,localStorage.userKey=n.userKey},VERIFIED:function(e,t){var n=t.data;console.log("$$$ mutation:VERIFIED ...$store"),console.log(n),e.accessLevel=n.accessLevel},LOAD_CONFIG:function(e,t){var n=t.data;console.log("$$$ mutation:LOAD_CONFIG ...$store"),console.log(n),e.userName=n.userName,localStorage.userName=n.userName,e.colorConfig=n.colorConfig,localStorage.colorConfig=n.colorConfig},LOGOUT:function(e){e.accessToken=null,e.expiresIn=0,e.accessLevel=0,e.userKey=null,e.userName=null,e.colorConfig="default",delete localStorage.accessToken,delete localStorage.expiresIn,delete localStorage.userKey,delete localStorage.userName,delete localStorage.colorConfig},SET_MODAL:function(e,t){var n=t.data;console.log("$$$ mutation:LOAD_CONFIG ...$store"),e["modal"][n.property]=n.state}},actions:{ISSUED:function(e,t){return Object(i["a"])(regeneratorRuntime.mark((function n(){var o;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:o=e.commit,console.log("$$$ action:ISSUED ...$store"),o("ISSUED",{data:t});case 3:case"end":return n.stop()}}),n)})))()},VERIFY:function(e){return Object(i["a"])(regeneratorRuntime.mark((function t(){var n,o,r,a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return n=e.commit,console.log("$$$ action:VERIFY ...$store"),o=localStorage.requestPoint,t.next=5,l.a.post("auth/verify",{requestPoint:o});case 5:r=t.sent,a=r.data,n("VERIFIED",{data:a});case 8:case"end":return t.stop()}}),t)})))()},LOAD_CONFIG:function(e,t){return Object(i["a"])(regeneratorRuntime.mark((function n(){var o,r;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return o=e.commit,console.log("$$$ action:GET_CONFIG ...$store"),n.next=4,l.a.post("auth/load-config",t);case 4:r=n.sent,o("LOAD_CONFIG",r);case 6:case"end":return n.stop()}}),n)})))()},LOGOUT:function(e){var t=e.commit;console.log("$$$ action:LOGOUT $store"),l.a.defaults.headers.common["Authorization"]=void 0,t("LOGOUT")},SET_MODAL:function(e,t){var n=e.commit,o=t.property,r=t.state;console.log("$$$ action:SET_MODAL ...$store");var a={property:o,state:r};n("SET_MODAL",{data:a})}}});a["a"].config.productionTip=!1,new a["a"]({router:S,store:I,render:function(e){return e(k)}}).$mount("#app")},"5c0b":function(e,t,n){"use strict";var o=n("9c0c"),r=n.n(o);r.a},"9c0c":function(e,t,n){}});
//# sourceMappingURL=app.10364f43.js.map