(function(e){function t(t){for(var r,s,i=t[0],c=t[1],u=t[2],d=0,f=[];d<i.length;d++)s=i[d],Object.prototype.hasOwnProperty.call(n,s)&&n[s]&&f.push(n[s][0]),n[s]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(e[r]=c[r]);l&&l(t);while(f.length)f.shift()();return a.push.apply(a,u||[]),o()}function o(){for(var e,t=0;t<a.length;t++){for(var o=a[t],r=!0,i=1;i<o.length;i++){var c=o[i];0!==n[c]&&(r=!1)}r&&(a.splice(t--,1),e=s(s.s=o[0]))}return e}var r={},n={app:0},a=[];function s(t){if(r[t])return r[t].exports;var o=r[t]={i:t,l:!1,exports:{}};return e[t].call(o.exports,o,o.exports,s),o.l=!0,o.exports}s.m=e,s.c=r,s.d=function(e,t,o){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(s.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)s.d(o,r,function(t){return e[t]}.bind(null,r));return o},s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="/";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],c=i.push.bind(i);i.push=t,i=i.slice();for(var u=0;u<i.length;u++)t(i[u]);var l=c;a.push([0,"chunk-vendors"]),o()})({0:function(e,t,o){e.exports=o("56d7")},"2af1":function(e,t,o){},3597:function(e,t,o){},"56d7":function(e,t,o){"use strict";o.r(t);o("e260"),o("e6cf"),o("cca6"),o("a79d");var r=o("2b0e"),n=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{style:e.themeColor,attrs:{id:"index"}},[0===this.$store.state.accessLevel?o("div",{attrs:{id:"loginBox"}},[o("form",{attrs:{autocomplete:"off"},on:{submit:e.login}},[o("input",{directives:[{name:"model",rawName:"v-model",value:e.id,expression:"id"}],ref:"id_field",staticClass:"id_field",attrs:{type:"text",placeholder:"id:",name:"id_field",id:"id_field",required:""},domProps:{value:e.id},on:{input:function(t){t.target.composing||(e.id=t.target.value)}}}),o("input",{staticClass:"btn",attrs:{type:"submit",value:"login"}}),o("label",{staticClass:"id_label",attrs:{for:"id_field"}},[e._v("id:")])])]):e._e(),0!==this.$store.state.accessLevel?o("App",{key:"app",attrs:{accessLevel:this.$store.accessLevel},on:{"app-created":e.recoverConfig,logout:e.logout}}):e._e(),o("router-view")],1)},a=[],s=(o("96cf"),o("1da1")),i=o("bc3a"),c=o.n(i),u=o("11c1"),l=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{attrs:{id:"app"}},[o("div",{attrs:{id:"scopeTab"}},[o("div",{staticClass:"scopeBox",class:{scopeSelected:"refg"===this.$store.state.modal.scopeTab},on:{click:function(t){return e.callback("scopeBox_refg")}}},[o("div",{staticClass:"scopeText"},[e._v("냉장고팩지급")])]),o("div",{staticClass:"scopeBox",class:{scopeSelected:"info"===this.$store.state.modal.scopeTab},on:{click:function(t){return e.callback("scopeBox_info")}}},[o("div",{staticClass:"scopeText"},[e._v("상세정보")])]),o("div",{staticClass:"scopeBox",class:{scopeSelected:"admin"===this.$store.state.modal.scopeTab},on:{click:function(t){return e.callback("scopeBox_admin")}}},[o("div",{staticClass:"scopeText"},[e._v("학생관리")])])]),o("div",{attrs:{id:"accountBox"},on:{click:function(t){return e.callback("accountBox")}}},[o("div",{attrs:{id:"userName"}},[e._v("user: "+e._s(this.$store.state.userName))])]),"admin"!==this.$store.state.modal.scopeTap?o("form",{attrs:{id:"searchBox",autocomplete:"off"},on:{submit:function(e){e.preventDefault()}}},[o("input",{directives:[{name:"model",rawName:"v-model",value:e.keyword,expression:"keyword"}],ref:"searchField",attrs:{id:"searchField",placeholder:"search...",type:"text"},domProps:{value:e.keyword},on:{keyup:function(t){return e.callback(e.keyword)},input:function(t){t.target.composing||(e.keyword=t.target.value)}}}),o("div",{attrs:{id:"searchIndicator"}}),o("div",{attrs:{id:"searchIcon"}})]):e._e(),"refg"===this.$store.state.modal.scopeTab?o("Refg"):e._e()],1)},d=[],f=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{attrs:{id:"refg"}})},p=[],m={name:"Refg",data:function(){return{}},methods:{},created:function(){}},v=m,g=(o("8300"),o("2877")),h=Object(g["a"])(v,f,p,!1,null,"6636295c",null),$=h.exports,b={name:"App",components:{Refg:$},props:[],data:function(){return{keyword:""}},computed:{},methods:{logout:function(){this.$emit("logout")},callback:function(e){return console.log(e),!1}},created:function(){console.log("created"),this.$emit("app-created")},mounted:function(){this.$refs.searchField.focus()},beforeDestroy:function(){}},O=b,x=(o("cb51"),Object(g["a"])(O,l,d,!1,null,"7670ac33",null)),w=x.exports,C={name:"Index",components:{App:w},data:function(){return{themeColor:{},id:null}},methods:{login:function(e){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function o(){var r,n;return regeneratorRuntime.wrap((function(o){while(1)switch(o.prev=o.next){case 0:return e.preventDefault(),r=new Date,n=Object(u["v4"])(),o.next=5,t.issueToken(t.id,10800,r,n);case 5:c.a.defaults.headers.common["Authorization"]=o.sent,t.loadConfig(t.id),t.setColor(),t.verify();case 9:case"end":return o.stop()}}),o)})))()},issueToken:function(e,t,o,r){var n=this;return Object(s["a"])(regeneratorRuntime.mark((function a(){var s,i;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,c.a.post("/auth/issue",{id:e,expiresIn:t,accessTime:o,requestPoint:r});case 2:return s=a.sent,i=s.data,n.$store.dispatch("ISSUED",i),a.abrupt("return",i.accessToken);case 6:case"end":return a.stop()}}),a)})))()},loadConfig:function(e){this.$store.dispatch("LOAD_CONFIG",{id:e})},verify:function(){this.$store.dispatch("VERIFY")},logout:function(){this.$store.dispatch("LOGOUT"),this.id=null},sessionOut:function(){this.$store.state.accessLevel?c.a.post("/auth/deposit",{id:localStorage.id}):console.log("no-authorized-history")},recoverConfig:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){var o,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(null!==e.id){t.next=18;break}return t.next=3,c.a.post("/auth/recover",{id:localStorage.id});case 3:return o=t.sent,r=o.data,c.a.defaults.headers.common["Authorization"]=r.accessToken,t.next=8,localStorage.id;case 8:return e.$store.state.id=t.sent,t.next=11,localStorage.userName;case 11:return e.$store.state.userName=t.sent,t.next=14,localStorage.colorConfig;case 14:e.$store.state.colorConfig=t.sent,e.setColor(),t.next=19;break;case 18:e.setColor();case 19:case"end":return t.stop()}}),t)})))()},setModal:function(e,t){this.$store.dispatch("SET_MODAL",{property:e,state:t})},setColor:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e["$store"]["state"]["colors"][e.$store.state.colorConfig];case 2:e.themeColor=t.sent;case 3:case"end":return t.stop()}}),t)})))()}},created:function(){var e=this;this.setColor(),this.verify(),window.addEventListener("beforeunload",Object(s["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:e.sessionOut();case 1:case"end":return t.stop()}}),t)}))))},mounted:function(){this.$refs.id_field.focus()}},_=C,y=(o("5f9a"),Object(g["a"])(_,n,a,!1,null,null,null)),S=y.exports,k=o("8c4f");r["a"].use(k["a"]);var E=new k["a"]({mode:"history",base:"/",routes:[]}),F=o("2f62"),D=o("66b5");r["a"].use(F["a"]);var T=new F["a"].Store({state:{id:null,accessLevel:0,userName:null,colorConfig:"default",modal:{display:"App",scopeTab:"refg"},colors:D.colors},getters:{},mutations:{ISSUED:function(e,t){var o=t.data;console.log("$$$ mutation:ISSUED ...$store"),console.log(o),e.id=o.id,localStorage.id=o.id},VERIFIED:function(e,t){var o=t.data;console.log("$$$ mutation:VERIFIED ...$store"),console.log(o),e.accessLevel=o.accessLevel},LOAD_CONFIG:function(e,t){var o=t.data;console.log("$$$ mutation:LOAD_CONFIG ...$store"),console.log(o),e.userName=o.userName,localStorage.userName=o.userName,e.colorConfig=o.colorConfig,localStorage.colorConfig=o.colorConfig},LOGOUT:function(e){e.accessLevel=0,e.id=null,e.userName=null,e.colorConfig="default",delete localStorage.id,delete localStorage.userName,delete localStorage.colorConfig},SET_MODAL:function(e,t){var o=t.data;console.log("$$$ mutation:LOAD_CONFIG ...$store"),e["modal"][o.property]=o.state}},actions:{ISSUED:function(e,t){return Object(s["a"])(regeneratorRuntime.mark((function o(){var r;return regeneratorRuntime.wrap((function(o){while(1)switch(o.prev=o.next){case 0:r=e.commit,console.log("$$$ action:ISSUED ...$store"),r("ISSUED",{data:t});case 3:case"end":return o.stop()}}),o)})))()},VERIFY:function(e){return Object(s["a"])(regeneratorRuntime.mark((function t(){var o,r,n,a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return o=e.commit,console.log("$$$ action:VERIFY ...$store"),r=localStorage.id,t.next=5,c.a.post("/auth/verify",{id:r});case 5:n=t.sent,a=n.data,o("VERIFIED",{data:a});case 8:case"end":return t.stop()}}),t)})))()},LOAD_CONFIG:function(e,t){return Object(s["a"])(regeneratorRuntime.mark((function o(){var r,n;return regeneratorRuntime.wrap((function(o){while(1)switch(o.prev=o.next){case 0:return r=e.commit,console.log("$$$ action:GET_CONFIG ...$store"),o.next=4,c.a.post("/auth/load-config",t);case 4:n=o.sent,r("LOAD_CONFIG",n);case 6:case"end":return o.stop()}}),o)})))()},LOGOUT:function(e){var t=e.commit;console.log("$$$ action:LOGOUT $store"),c.a.post("/auth/logout",{id:localStorage.id}),c.a.defaults.headers.common["Authorization"]=void 0,t("LOGOUT")},SET_MODAL:function(e,t){var o=e.commit,r=t.property,n=t.state;console.log("$$$ action:SET_MODAL ...$store");var a={property:r,state:n};o("SET_MODAL",{data:a})}}});r["a"].config.productionTip=!1,new r["a"]({router:E,store:T,render:function(e){return e(S)}}).$mount("#index")},"5f9a":function(e,t,o){"use strict";var r=o("3597"),n=o.n(r);n.a},"66b5":function(e){e.exports=JSON.parse('{"colors":{"default":{"--i100":"#ffffff","--i98":"#FAFAFA","--i94":"#F0F0F0","--i90":"#E6E6E6","--i80":"#CCCCCC","--i70":"#B3B3B3","--i60":"#999999","--i45":"#737373","--i30":"#4D4D4D","--i0":"#000000","--accent03":"#FF5224","--accent02":"#FF7955","--accent01":"#FF9470","--alert03":"#EA0030","--alert02":"#D9414E","--alert01":"#F27882","--pos03":"#0FB337","--pos02":"#2D9647","--pos01":"#6BBE7F"}}}')},8300:function(e,t,o){"use strict";var r=o("dd24"),n=o.n(r);n.a},cb51:function(e,t,o){"use strict";var r=o("2af1"),n=o.n(r);n.a},dd24:function(e,t,o){}});
//# sourceMappingURL=app.8552407b.js.map