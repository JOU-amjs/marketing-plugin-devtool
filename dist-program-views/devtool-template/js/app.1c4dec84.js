(function(t){function e(e){for(var n,r,c=e[0],s=e[1],l=e[2],p=0,d=[];p<c.length;p++)r=c[p],Object.prototype.hasOwnProperty.call(o,r)&&o[r]&&d.push(o[r][0]),o[r]=0;for(n in s)Object.prototype.hasOwnProperty.call(s,n)&&(t[n]=s[n]);u&&u(e);while(d.length)d.shift()();return i.push.apply(i,l||[]),a()}function a(){for(var t,e=0;e<i.length;e++){for(var a=i[e],n=!0,c=1;c<a.length;c++){var s=a[c];0!==o[s]&&(n=!1)}n&&(i.splice(e--,1),t=r(r.s=a[0]))}return t}var n={},o={app:0},i=[];function r(e){if(n[e])return n[e].exports;var a=n[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,r),a.l=!0,a.exports}r.m=t,r.c=n,r.d=function(t,e,a){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},r.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(r.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)r.d(a,n,function(e){return t[e]}.bind(null,n));return a},r.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="/";var c=window["webpackJsonp"]=window["webpackJsonp"]||[],s=c.push.bind(c);c.push=e,c=c.slice();for(var l=0;l<c.length;l++)e(c[l]);var u=s;i.push([0,"chunk-vendors"]),a()})({0:function(t,e,a){t.exports=a("cd49")},"14f2":function(t,e,a){"use strict";var n=a("e6ba"),o=a.n(n);o.a},"5c0b":function(t,e,a){"use strict";var n=a("de4f"),o=a.n(n);o.a},"5f87":function(t,e,a){},"93fc":function(t,e,a){},9929:function(t,e,a){},a16c:function(t,e,a){"use strict";var n=a("93fc"),o=a.n(n);o.a},a44d:function(t,e,a){"use strict";var n=a("9929"),o=a.n(n);o.a},cd49:function(t,e,a){"use strict";a.r(e);a("0c26"),a("666b"),a("527a"),a("4586");var n=a("9869"),o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"app"}},[a("router-view")],1)},i=[],r=(a("5c0b"),a("2be6")),c={},s=Object(r["a"])(c,o,i,!1,null,null,null),l=s.exports,u=a("5f2b"),p=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"container"}},[a("div",{staticClass:"views"},[a("div",{staticClass:"module"},[a("span",{staticClass:"module__hd"},[t._v("插件配置页")]),a("div",{staticClass:"module__body"},[a("config-frame",{staticClass:"module__entity",attrs:{"config-url":t.containerUrl}})],1)]),a("div",{staticClass:"module"},[a("span",{staticClass:"module__hd"},[t._v("插件视图(线上)")]),a("div",{staticClass:"flex-column module__body"},["title"===t.navStatus?a("div",{staticClass:"flex-row justify-between align-center nav"},[a("span",{staticClass:"text color-gray-2 nav__title"},[t._v(t._s(t.pageTitle))]),a("el-button",{attrs:{type:"text"},on:{click:function(e){return t.togglePage("location")}}},[t._v(" 切换 "),a("i",{staticClass:"el-icon-arrow-right el-icon--right"})])],1):"location"===t.navStatus?a("div",{on:{keydown:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.togglePage("title")}}},[a("el-input",{staticClass:"nav__location",attrs:{placeholder:"/"},model:{value:t.routePath,callback:function(e){t.routePath=e},expression:"routePath"}},[a("el-select",{staticClass:"page-select",attrs:{slot:"prepend",placeholder:"选择页面"},slot:"prepend",model:{value:t.currentPage,callback:function(e){t.currentPage=e},expression:"currentPage"}},t._l(t.onlinePages,(function(t){return a("el-option",{key:t.path,attrs:{label:t.path,value:t.path}})})),1)],1)],1):t._e(),t.currentPage?a("plugin-view-online",{staticClass:"module__entity",attrs:{"program-url":t.programUrl}}):t._e()],1)])]),a("right-menu")],1)},d=[],f=(a("99af"),a("a15b"),a("d81d"),a("b0c0"),a("b64b"),a("ac1f"),a("5319"),a("ce37")),g=(a("df26"),a("42c2")),v=a("f5f2"),b=a("30c6"),h=a("f0ad"),m=a("02a5"),O=a("0f9e"),y=a("fc36"),j=a("333d"),_=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"container"},[a("iframe",{ref:"configFrame",staticClass:"main-frame",attrs:{src:t.configUrl}}),a("div",{staticClass:"btn-submit",on:{click:t.reviewData}},[a("span",[t._v("提交配置参数")])])])},C=[],w=a("7c6c"),x=function(){function t(){Object(v["a"])(this,t)}return Object(b["a"])(t,null,[{key:"notNull",value:function(t){if(null===t||void 0===t)throw new Error("[assert]参数不能为空")}}]),t}(),k=function(){function t(e,a){var n=this;Object(v["a"])(this,t),this.fnCollection={},x.notNull(e),this.receiver=e,window.addEventListener("message",(function(t){var e=t.data,a=n.fnCollection[e.name];a&&a.apply(void 0,Object(w["a"])(e.args))})),t.messages[a]=this}return Object(b["a"])(t,[{key:"on",value:function(t,e){"function"===typeof e&&"string"===typeof t&&(this.fnCollection[t]=e)}},{key:"emit",value:function(t){for(var e,a=arguments.length,n=new Array(a>1?a-1:0),o=1;o<a;o++)n[o-1]=arguments[o];null===(e=this.receiver)||void 0===e||e.postMessage({name:t,args:n},"*")}}],[{key:"getWindowMessage",value:function(t){return this.messages[t]?this.messages[t]:null}}]),t}();k.messages={};var I=a("0b38"),P=a("8206"),S=a.n(P),D="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZXJjaGFudElkIjoxLCJpYXQiOjE1NzcyMzI3MDgsImV4cCI6MTYwODMzNjcwOH0.NByz-e7h5zrxRwH2ONFsvMIHtW3peFp2zG72YGN6vsg",T="http://148.70.36.197:8080";function E(t){return t.headers=Object(I["a"])(Object(I["a"])({},t.headers||{}),{},{"Content-Type":"application/json;charset=UTF-8","x-access-token":D}),t}var M=S.a.create({timeout:3e4});M.interceptors.request.use(E);var $=S.a.create({baseURL:T,timeout:3e4});$.interceptors.request.use(E);var N=function(t){Object(h["a"])(a,t);var e=Object(m["a"])(a);function a(){return Object(v["a"])(this,a),e.apply(this,arguments)}return Object(b["a"])(a,[{key:"reviewData",value:function(){var t;null===(t=this.message)||void 0===t||t.emit("_emitSubmit")}},{key:"postData",value:function(){var t=Object(g["a"])(regeneratorRuntime.mark((function t(e){var a,n,o;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(200===e.code||!e.message){t.next=3;break}return this.$message.error(e.message),t.abrupt("return");case 3:return t.next=5,M.post("/mock/save_config_data",{configData:e.data});case 5:a=t.sent,n=a.data,200===n.code&&(this.updateState({configData:e}),o=k.getWindowMessage("programFrame"),null===o||void 0===o||o.emit("configData",e),this.$message.success("提交成功，请左侧查看数据"));case 8:case"end":return t.stop()}}),t,this)})));function e(e){return t.apply(this,arguments)}return e}()},{key:"mounted",value:function(){var t=this.message=new k(this.$refs.configFrame.contentWindow,"configFrame");t.on("postData",this.postData)}}]),a}(y["c"]);Object(O["a"])([Object(y["b"])(String)],N.prototype,"configUrl",void 0),Object(O["a"])([Object(j["a"])("updateState")],N.prototype,"updateState",void 0),N=Object(O["a"])([y["a"]],N);var F=N,R=F,U=(a("14f2"),Object(r["a"])(R,_,C,!1,null,"e600ace0",null)),G=U.exports,V=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"container"},[a("iframe",{ref:"programFrame",staticClass:"main-frame",attrs:{src:t.programUrl}})])},J=[],z=function(t){Object(h["a"])(a,t);var e=Object(m["a"])(a);function a(){return Object(v["a"])(this,a),e.apply(this,arguments)}return Object(b["a"])(a,[{key:"titleChanged",value:function(t){this.updateState({pageTitle:t})}},{key:"mounted",value:function(){var t=new k(this.$refs.programFrame.contentWindow,"programFrame");t.on("titleChanged",this.titleChanged)}}]),a}(y["c"]);Object(O["a"])([Object(y["b"])(String)],z.prototype,"programUrl",void 0),Object(O["a"])([j["a"]],z.prototype,"updateState",void 0),z=Object(O["a"])([y["a"]],z);var B=z,q=B,W=(a("e08c"),Object(r["a"])(q,V,J,!1,null,"775fa6ee",null)),H=W.exports,L=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"menu"},[a("logo"),a("el-collapse",{model:{value:t.activeNames,callback:function(e){t.activeNames=e},expression:"activeNames"}},[a("el-collapse-item",{attrs:{title:"配置数据",name:"1"}},[a("vue-json-pretty",{attrs:{data:t.configData,"show-length":"",deep:2,highlightMouseoverNode:""}})],1),a("el-collapse-item",{attrs:{title:"数据集合管理",name:"2"}},t._l(t.database,(function(e,n){return a("div",{key:n,staticClass:"database__wrap"},[a("div",{staticClass:"database__header"},[a("label",{staticClass:"env-name"},[t._v(t._s(n))]),a("el-button",{attrs:{size:"mini"},on:{click:function(e){return t.openDialog("create",n)}}},[t._v("添加集合")])],1),a("div",t._l(e.collection,(function(e){return a("el-tag",{key:e,staticClass:"coll-name",attrs:{closable:""},on:{close:function(a){return t.openDialog("remove",n,e)}}},[t._v(t._s(e))])})),1)])})),0)],1),a("el-dialog",{attrs:{title:"create"===t.dialogContentType?"新建数据集合":"删除数据集合",visible:t.dialogVisible,width:"40%"},on:{"update:visible":function(e){t.dialogVisible=e}}},["create"===t.dialogContentType?a("div",[a("el-input",{attrs:{placeholder:"请输入集合名称，批量添加以`,`隔开"},model:{value:t.dialogOperateCollection,callback:function(e){t.dialogOperateCollection=e},expression:"dialogOperateCollection"}},[a("template",{slot:"prepend"},[t._v(t._s(t.dialogEnv))])],2)],1):"remove"===t.dialogContentType&&t.dialogOperateCollection?a("div",[a("span",[t._v("你正准备删除数据集合["+t._s(t.dialogOperateCollection)+"]，删除后该集合的数据将会一并删除，确定操作吗？")])]):t._e(),a("template",{slot:"footer"},[a("el-button",{on:{click:function(e){t.dialogVisible=!1}}},[t._v("取消")]),a("el-button",{attrs:{type:"primary"},on:{click:t.submitCollectionOperation}},[t._v("确定")])],1)],2)],1)},X=[],Y=(a("4de4"),a("c740"),a("a434"),a("1276"),a("498a"),a("8767")),A=a("ec78"),Q=a.n(A),Z=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},K=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"container flex-row align-center"},[n("img",{staticClass:"logo",attrs:{src:a("cf05")}}),n("span",{staticClass:"title-3"},[t._v("有吃生活营销插件开发工具")])])}],tt=function(t){Object(h["a"])(a,t);var e=Object(m["a"])(a);function a(){return Object(v["a"])(this,a),e.apply(this,arguments)}return a}(y["c"]);tt=Object(O["a"])([y["a"]],tt);var et,at=tt,nt=at,ot=(a("fb03"),Object(r["a"])(nt,Z,K,!1,null,"716ecd36",null)),it=ot.exports,rt=function(t){Object(h["a"])(a,t);var e=Object(m["a"])(a);function a(){var t;return Object(v["a"])(this,a),t=e.apply(this,arguments),t.activeNames="1",t.dialogVisible=!1,t.dialogContentType="",t.dialogOperateCollection="",t.dialogEnv="development",t}return Object(b["a"])(a,[{key:"openDialog",value:function(t,e,a){this.dialogVisible=!0,this.dialogContentType=t,this.dialogEnv=e,this.dialogOperateCollection=a||""}},{key:"removeCollection",value:function(){var t=Object(g["a"])(regeneratorRuntime.mark((function t(e){var a,n,o,i,r=this;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,M["delete"]("/mongo/collections",{data:{env:e,pluginId:this.pluginID,name:[this.dialogOperateCollection]}});case 2:a=t.sent,n=a.data,200===n.code&&(this.$message.success("删除成功"),this.dialogVisible=!1,o=Object(I["a"])({},this.database),i=o[this.dialogEnv].collection.findIndex((function(t){return t===r.dialogOperateCollection})),i>=0&&(o[this.dialogEnv].collection.splice(i,1),this.updateState({database:o})));case 5:case"end":return t.stop()}}),t,this)})));function e(e){return t.apply(this,arguments)}return e}()},{key:"addCollection",value:function(){var t=Object(g["a"])(regeneratorRuntime.mark((function t(e){var a,n,o,i,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(this.dialogOperateCollection){t.next=3;break}return this.$message.error("请输入创建的集合名称"),t.abrupt("return");case 3:return a=this.dialogOperateCollection.split(/,|，/).map((function(t){return t.trim()})).filter((function(t){return t})),t.next=6,M.post("/mongo/collections",{env:e,pluginId:this.pluginID,name:a});case 6:n=t.sent,o=n.data,200===o.code&&(this.$message.success("创建成功"),this.dialogVisible=!1,r=Object(I["a"])({},this.database),(i=r[this.dialogEnv].collection).push.apply(i,Object(w["a"])(a)),this.updateState({database:r}));case 9:case"end":return t.stop()}}),t,this)})));function e(e){return t.apply(this,arguments)}return e}()},{key:"submitCollectionOperation",value:function(){var t={development:1,production:2}[this.dialogEnv];"create"===this.dialogContentType?this.addCollection(t):"remove"===this.dialogContentType?this.removeCollection(t):this.$message.error("操作错误")}}]),a}(y["c"]);Object(O["a"])([Object(j["b"])("configData")],rt.prototype,"configData",void 0),Object(O["a"])([Object(j["b"])(String)],rt.prototype,"configUrl",void 0),Object(O["a"])([Object(j["b"])("database")],rt.prototype,"database",void 0),Object(O["a"])([Object(j["b"])("pluginID")],rt.prototype,"pluginID",void 0),Object(O["a"])([Object(j["a"])("updateState")],rt.prototype,"updateState",void 0),rt=Object(O["a"])([Object(y["a"])({components:(et={},Object(f["a"])(et,Y["Collapse"].name,Y["Collapse"]),Object(f["a"])(et,Y["CollapseItem"].name,Y["CollapseItem"]),Object(f["a"])(et,Y["Button"].name,Y["Button"]),Object(f["a"])(et,Y["Tag"].name,Y["Tag"]),Object(f["a"])(et,Y["Dialog"].name,Y["Dialog"]),Object(f["a"])(et,Y["Input"].name,Y["Input"]),Object(f["a"])(et,"VueJsonPretty",Q.a),Object(f["a"])(et,"Logo",it),et)})],rt);var ct,st=rt,lt=st,ut=(a("a16c"),Object(r["a"])(lt,L,X,!1,null,"3a7d3dea",null)),pt=ut.exports;a("4160"),a("466d"),a("159b");function dt(t){var e={};return(t.match(/\?(.*)$/)||["",""])[1].split("&").forEach((function(t){var a=t.split("=");2===a.length&&(e[a[0]]=a[1])})),e}var ft=function(t){return Object.keys(t).map((function(e){return"".concat(e,"=").concat(t[e])})).join("&")},gt=function(t){Object(h["a"])(a,t);var e=Object(m["a"])(a);function a(){var t;return Object(v["a"])(this,a),t=e.apply(this,arguments),t.currentPage="",t.routePath="",t.routeInfo={page:"",routePath:"",query:{}},t.onlinePages=[],t.navStatus="title",t.containerUrl="http://localhost:18002/?".concat(ft({devMode:1})),t}return Object(b["a"])(a,[{key:"mounted",value:function(){var t=Object(g["a"])(regeneratorRuntime.mark((function t(){var e,a,n,o,i,r,c,s;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,M.get("/get_devtool_config");case 2:return e=t.sent,a=e.data,200===a.code&&(n=a.data,o=n.onlinePages,i=n.database,r=n.pluginID,this.onlinePages=o,this.onlinePages.length>0&&(this.currentPage=this.routeInfo.page=this.onlinePages[0].path),this.updateState({database:i,pluginID:r})),t.next=7,M.get("mock/get_config_data");case 7:c=t.sent,s=c.data,200===s.code&&this.updateState({configData:s.data});case 10:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}()},{key:"togglePage",value:function(t){this.navStatus=t,"title"===t&&(this.routeInfo.page=this.currentPage,this.routeInfo.routePath=this.routePath.replace(/\?.*$/,""),this.routeInfo.query=dt(this.routePath))}},{key:"programUrl",get:function(){var t=this.routeInfo,e=t.page,a=t.routePath,n=t.query;e=e&&"/"!==e.substr(-1,1)?"".concat(e,"/"):e,a="/"===a.substr(0,1)?a:"/".concat(a),n.devMode=1,n.accessToken=D;var o=0,i=0;return"http://localhost:18003/".concat(this.pluginID,"/").concat(o,"/").concat(i,"/online/").concat(e,"?").concat(ft(n),"#").concat(a)}}]),a}(y["c"]);Object(O["a"])([Object(j["b"])("pageTitle")],gt.prototype,"pageTitle",void 0),Object(O["a"])([Object(j["b"])("pluginID")],gt.prototype,"pluginID",void 0),Object(O["a"])([Object(j["a"])("updateState")],gt.prototype,"updateState",void 0),gt=Object(O["a"])([Object(y["a"])({components:(ct={ConfigFrame:G,PluginViewOnline:H,RightMenu:pt},Object(f["a"])(ct,Y["Select"].name,Y["Select"]),Object(f["a"])(ct,Y["Option"].name,Y["Option"]),Object(f["a"])(ct,Y["Input"].name,Y["Input"]),Object(f["a"])(ct,Y["Button"].name,Y["Button"]),Object(f["a"])(ct,Y["Tag"].name,Y["Tag"]),ct)})],gt);var vt=gt,bt=vt,ht=(a("a44d"),Object(r["a"])(bt,p,d,!1,null,"42e1ea86",null)),mt=ht.exports;n["default"].use(u["a"]);var Ot=[{path:"/",name:"Home",component:mt}],yt=new u["a"]({mode:"history",base:"/",routes:Ot}),jt=yt,_t=a("9ce4");n["default"].use(_t["a"]);var Ct=new _t["a"].Store({state:{pageTitle:"...加载中",configData:{},pluginID:"",database:{development:{collection:[]},production:{collection:[]}}},mutations:{updateState:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};Object.keys(e).forEach((function(a){e[a]&&(t[a]=e[a])}))}},actions:{},modules:{}});a("5d2c");n["default"].prototype.$message=Y["Message"],n["default"].config.productionTip=!1,new n["default"]({router:jt,store:Ct,render:function(t){return t(l)}}).$mount("#app")},cf05:function(t,e,a){t.exports=a.p+"img/logo.63578096.png"},de4f:function(t,e,a){t.exports={colorMain:"#ff0047",colorMainShallow:"#ff5f58",colorGray1:"#ccc",colorGray2:"#999",colorGray3:"#666",colorGray4:"#333",colorSuccessGreen:"#60CC1C",colorGolden:"#edcb88",colorGoldenBg:"#fff8e9",fontTitle1:"34px",fontTitle2:"25px",fontTitle3:"20px",fontTitle4:"18px",fontText:"16px",fontTextSecondary:"14px",fontAuxiliary:"13px",fontExplain:"11px"}},e08c:function(t,e,a){"use strict";var n=a("f855"),o=a.n(n);o.a},e6ba:function(t,e,a){},f855:function(t,e,a){},fb03:function(t,e,a){"use strict";var n=a("5f87"),o=a.n(n);o.a}});
//# sourceMappingURL=app.1c4dec84.js.map