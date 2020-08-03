(function(e){function t(t){for(var o,s,c=t[0],i=t[1],u=t[2],d=0,f=[];d<c.length;d++)s=c[d],Object.prototype.hasOwnProperty.call(r,s)&&r[s]&&f.push(r[s][0]),r[s]=0;for(o in i)Object.prototype.hasOwnProperty.call(i,o)&&(e[o]=i[o]);l&&l(t);while(f.length)f.shift()();return a.push.apply(a,u||[]),n()}function n(){for(var e,t=0;t<a.length;t++){for(var n=a[t],o=!0,c=1;c<n.length;c++){var i=n[c];0!==r[i]&&(o=!1)}o&&(a.splice(t--,1),e=s(s.s=n[0]))}return e}var o={},r={app:0},a=[];function s(t){if(o[t])return o[t].exports;var n=o[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.m=e,s.c=o,s.d=function(e,t,n){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)s.d(n,o,function(t){return e[t]}.bind(null,o));return n},s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="/";var c=window["webpackJsonp"]=window["webpackJsonp"]||[],i=c.push.bind(c);c.push=t,c=c.slice();for(var u=0;u<c.length;u++)t(c[u]);var l=i;a.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var o=n("2b0e"),r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{style:e.themeColor,attrs:{id:"app"}},[n("div",{attrs:{id:"loginBox"}},[n("form",{attrs:{autocomplete:"off"},on:{submit:e.login}},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.guard.key,expression:"guard.key"}],staticClass:"id_field",attrs:{type:"text",placeholder:"id:",name:"id",id:"id_field",required:""},domProps:{value:e.guard.key},on:{input:function(t){t.target.composing||e.$set(e.guard,"key",t.target.value)}}}),n("input",{staticClass:"btn",attrs:{type:"submit",value:"login"}}),n("label",{staticClass:"id_label",attrs:{for:"id"}},[e._v("id:")])])]),n("input",{staticClass:"btn",attrs:{type:"button",value:"heimdall"},on:{click:e.heimdall}}),n("input",{staticClass:"btn",attrs:{type:"button",value:"logout"},on:{click:e.logout}}),n("br"),n("br"),n("br"),e._v(" userKey: "+e._s(e.userKey)+" "),n("br"),e._v(" access-level: "+e._s(e.guard.accessLevel)+" "),n("br"),e._v(" message: "),n("br"),e._v(" "+e._s(e.msg)+" "),n("router-view")],1)},a=[],s=(n("96cf"),n("1da1")),c=n("bc3a"),i=n.n(c),u={name:"App",components:{},data:function(){return{themeColor:{"--i100":"#ffffff","--i98":"#FAFAFA","--i94":"#F0F0F0","--i90":"#E6E6E6","--i80":"#CCCCCC","--i70":"#B3B3B3","--i60":"#999999","--i45":"#737373","--i30":"#4D4D4D","--i0":"#000000","--accent02":"#FF7955","--accent01":"#FF9470"},guard:{key:"",accessLevel:0,expiresIn_3h:10800,expiresIn_5s:5},userKey:"",msg:"Hello",testArr:[],test00:null}},methods:{login:function(e){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:e.preventDefault(),t.getToken(t.guard.key,t.guard.expiresIn_3h);case 2:case"end":return n.stop()}}),n)})))()},getToken:function(e,t){var n=this;this.$store.dispatch("LOGIN",{key:e,expiresIn:t}).then((function(){return n.heimdall()})).catch((function(e){var t=e.message;n.guard.accessLevel=0,n.userKey="",n.msg=t}))},heimdall:function(){var e=this;i.a.get("auth/verify").then((function(t){e.guard.accessLevel=t.data.accessLevel,e.userKey=e.$store.state.userKey,e.msg=t.data.msg})).catch((function(t){console.log(t),e.guard.accessLevel=0,e.userKey="",e.msg="Request failed with status code 401"}))},logout:function(){this.$store.dispatch("LOGOUT")}},created:function(){window.addEventListener("beforeunload",(function(e){e.preventDefault(),console.log("beforeunload")}))},destroyed:function(){console.log("des"),i.a.get("/destroy").then((function(e){console.log(e)})).catch((function(e){console.log(e)}))}},l=u,d=(n("5c0b"),n("2877")),f=Object(d["a"])(l,r,a,!1,null,null,null),p=f.exports,g=n("8c4f");o["a"].use(g["a"]);var v=new g["a"]({mode:"history",base:"/",routes:[]}),m=n("2f62");o["a"].use(m["a"]);var h=function(){var e=localStorage,t=e.accessToken;t||(i.a.defaults.headers.common["Authorization"]=t)};h();var y=new m["a"].Store({state:{accessToken:null,userKey:"none"},getters:{isAuthenticated:function(e){return e.accessToken=e.accessToken||localStorage.accessToken,e.accessToken}},mutations:{LOGIN:function(e,t){var n=t.data,o=t.userKey;console.log("$$$ mutation:LOGIN ...store.js"),e.accessToken=n.accessToken,e.userKey=o,localStorage.accessToken=n.accessToken,localStorage.userKey=o},LOGOUT:function(e){console.log("$$$ mutation:LOGOUT ...store.js"),e.accessToken=null,e.userKey="none",delete localStorage.accessToken,delete localStorage.userKey}},actions:{LOGIN:function(e,t){return Object(s["a"])(regeneratorRuntime.mark((function n(){var o,r,a,s,c,u;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return o=e.commit,r=t.key,a=t.expiresIn,console.log("$$$ action:LOGIN ...store.js"),n.next=5,i.a.post("/auth/login",{key:r,expiresIn:a});case 5:s=n.sent,c=s.data,u=r,o("LOGIN",{data:c,userKey:u}),i.a.defaults.headers.common["Authorization"]=c.accessToken;case 10:case"end":return n.stop()}}),n)})))()},LOGOUT:function(e){var t=e.commit;console.log("$$$ action:LOGOUT ...store.js"),t("LOGOUT"),i.a.defaults.headers.common["Authorization"]=void 0}}});o["a"].config.productionTip=!1,new o["a"]({router:v,store:y,render:function(e){return e(p)}}).$mount("#app")},"5c0b":function(e,t,n){"use strict";var o=n("9c0c"),r=n.n(o);r.a},"9c0c":function(e,t,n){}});
//# sourceMappingURL=app.da4a75fe.js.map