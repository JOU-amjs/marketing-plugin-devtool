(function(e){function t(t){for(var a,o,s=t[0],l=t[1],c=t[2],d=0,p=[];d<s.length;d++)o=s[d],Object.prototype.hasOwnProperty.call(r,o)&&r[o]&&p.push(r[o][0]),r[o]=0;for(a in l)Object.prototype.hasOwnProperty.call(l,a)&&(e[a]=l[a]);u&&u(t);while(p.length)p.shift()();return i.push.apply(i,c||[]),n()}function n(){for(var e,t=0;t<i.length;t++){for(var n=i[t],a=!0,s=1;s<n.length;s++){var l=n[s];0!==r[l]&&(a=!1)}a&&(i.splice(t--,1),e=o(o.s=n[0]))}return e}var a={},r={app:0},i=[];function o(t){if(a[t])return a[t].exports;var n=a[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.m=e,o.c=a,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},o.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)o.d(n,a,function(t){return e[t]}.bind(null,a));return n},o.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],l=s.push.bind(s);s.push=t,s=s.slice();for(var c=0;c<s.length;c++)t(s[c]);var u=l;i.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"034f":function(e,t,n){"use strict";var a=n("0b2b"),r=n.n(a);r.a},"0b2b":function(e,t,n){},"1b5f":function(e,t,n){"use strict";var a=n("a5f5"),r=n.n(a);r.a},"33ce":function(e,t,n){},"56d7":function(e,t,n){"use strict";n.r(t);var a={};n.r(a),n.d(a,"TabWrap",(function(){return ae})),n.d(a,"ListView",(function(){return ce})),n.d(a,"ViewItem",(function(){return ke}));n("c880"),n("0c1f"),n("2e73"),n("dde3"),n("c8a0"),n("3cdf"),n("5c85");var r,i=n("9869"),o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},["production"===e.nodeEnv||e.isCross?n("div",[e.loadingComponent?n("div",{staticClass:"loading-wrap"},[n("vue-loading",{attrs:{type:"cylon",color:"#ff0047",size:{width:"30px",height:"30px"}}})],1):e._e(),n("async-component",{directives:[{name:"show",rawName:"v-show",value:!e.loadingComponent&&e.loadSuccess,expression:"!loadingComponent && loadSuccess"}],on:{loaded:e.componentLoaded}}),e.loadSuccess?e._e():n("div",{staticClass:"flex-column align-center"},[n("span",{staticClass:"text-load-failed"},[e._v("配置页加载失败，稍后再试！")])])],1):n("template-index")],1)},s=[],l=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n(e.mode,e._g(e._b({tag:"component",attrs:{value:e.value}},"component",e.$attrs,!1),e.$listeners))},c=[],u=(n("df26"),n("c8ff")),d=n("79c2"),p=n.n(d),f=n("8206"),m=n.n(f),h=(n("632c"),n("3658"),n("4fb0"),n("b0e0")),v=n.n(h),b={inited:!1,data:{},get:function(e){var t=this.data;if(!this.inited){var n={};(window.location.href.match(/\?(.*)$/)||["",""])[1].split("&").forEach((function(e){var t=e.split("=");2===t.length&&(n[t[0]]=t[1])})),t.accessToken=n.accessToken,t.rootUrl=n.rootUrl,t.signKey=n.signKey||"",t.connectSymbol=n.connectSymbol||"",t.platform=n.platform,t.shopId=n.shopId,delete n.accessToken,delete n.rootUrl,delete n.signKey,delete n.connectSymbol,delete n.platform,delete n.shopId,t.query=n,this.inited=!0}return t[e]},set:function(e,t){this.data[e]=t}};function g(e){var t=Object.keys(e).sort().map((function(t){return"".concat(t,"=").concat(e[t])})).join(b.get("connectSymbol"))+b.get("signKey");return v()(t)}var y={},w={init:function(){r=window.parent,window.addEventListener("message",(function(e){var t=e.data,n=y[t.name];n&&n.apply(null,t.args)}))},on:function(e,t){"function"===typeof t&&"string"===typeof e&&(y[e]=t)},emit:function(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),a=1;a<t;a++)n[a-1]=arguments[a];r.postMessage({name:e,args:n},"*")}},x=b.get("rootUrl");x||(x="http://localhost:18002");var _=m.a.create({baseURL:x,timeout:3e4});function k(e){return _({url:"/v1/get_mp_config_component",params:e})}function C(e){return _.get("/v1/get_shop_dishes",{params:{dishIds:(e||[]).join()}})}function O(e){return _.get("/v1/get_shop_dish_categories",{params:{catIds:(e||[]).join()}})}function j(e){return _.get("/v1/get_shop_coupon_groups",{params:{couponGroupIds:(e||[]).join()}})}_.interceptors.request.use((function(e){var t=!1,n=e.params=e.params||{};n.timestamp=Date.parse(new Date)/1e3,n.shopId=b.get("shopId"),n.platform=t?"browser":b.get("platform"),n.sign=g(n);var a=t?"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsImlhdCI6MTU5NzAyNjAwNCwiZXhwIjoxNjI4MTMwMDA0fQ.vdgPdm6Fz_VmwirlX1RXn1DzfVzDTb091HIJthfUITE":b.get("accessToken");return a&&(e.headers[e.method.toLowerCase()||"get"]["x-access-token"]=a),e})),_.interceptors.response.use((function(e){return e.data}));var T={name:"AsyncComponent",inheritAttrs:!0,data:function(){return{mode:void 0,value:void 0}},mounted:function(){var e=Object(u["a"])(regeneratorRuntime.mark((function e(){var t,n,a,r,i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,k(b.get("query"));case 2:t=e.sent,n=t.code,a=t.data,r=!1,200===n&&"string"===typeof a.componentStr&&(i=new Function("return ".concat(a.componentStr))(),this.mode=(i||{default:{}}).default,this.value=a.config,r=!0,this.$nextTick((function(){p.a.fn.autoHeight&&p.a.fn.autoHeight(document.body.scrollHeight+50)}))),this.$emit("loaded",r);case 8:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()},I=T,S=n("2be6"),D=Object(S["a"])(I,l,c,!1,null,null,null),V=D.exports,E=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n(e.current,{tag:"component"})},$=[],R=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"component"},[n("div",{staticClass:"list-item"},[n("tab-wrap",{attrs:{editable:""},on:{edit:e.tabEdit}},e._l(e.groupGreetingList,(function(t,a){return n("list-view",{key:t.key,attrs:{label:"阶段"+(a+1),name:t.key}},[n("view-item",{attrs:{label:"起始等级",type:"input-number",placeholder:"等级起始范围"},model:{value:t.levelStart,callback:function(n){e.$set(t,"levelStart",n)},expression:"item.levelStart"}}),n("view-item",{attrs:{label:"末尾等级",type:"input-number",placeholder:"等级结束范围"},model:{value:t.levelEnd,callback:function(n){e.$set(t,"levelEnd",n)},expression:"item.levelEnd"}}),n("view-item",{attrs:{label:"欢迎主语",type:"input",placeholder:"欢迎标题"},model:{value:t.greetingWords,callback:function(n){e.$set(t,"greetingWords",n)},expression:"item.greetingWords"}}),n("view-item",{attrs:{label:"欢迎副语",type:"input",placeholder:"解释欢迎主语，字体比主语小"},model:{value:t.greetingAdverbs,callback:function(n){e.$set(t,"greetingAdverbs",n)},expression:"item.greetingAdverbs"}})],1)})),1)],1),n("button",{on:{click:e.getTabsData}},[e._v("查看tab页数据")]),n("div",{staticClass:"list-item"},[n("list-view",{attrs:{name:"abc",label:"带箭头链接","show-label":""}},[n("view-item",{attrs:{label:"选项1","sub-label":"解释语1",placeholder:"请选择",type:"dish",value:e.dishIds},on:{tap:e.selectOption}}),n("view-item",{attrs:{label:"选项2","sub-label":"解释语2解释语2解释语2解释语2解释语2",placeholder:"请选择",value:"选项值2"}}),n("view-item",{attrs:{label:"选项3",type:"category",placeholder:"请选择",value:e.catIds},on:{tap:e.selectCats}}),n("view-item",{attrs:{label:"选项4",placeholder:"请选择",value:e.dateVal},on:{tap:e.selectNativeDate}}),n("view-item",{attrs:{label:"选项5",placeholder:"请选择优惠券",type:"coupon",value:e.couponId},on:{tap:e.selectCoupon}})],1)],1),n("tab-wrap",{attrs:{editable:""},on:{edit:e.tabEdit}},e._l(e.multipleRowColumnData,(function(t,a){return n("list-view",{key:a,attrs:{"multiple-list":t,editable:"",label:"阶段"+(a+1),"sub-label":function(e){return"时限设置"+(e+1)},name:a},on:{edit:e.listViewEdit},scopedSlots:e._u([{key:"header",fn:function(){return[n("view-item",{attrs:{label:"时间段",type:"input",placeholder:"请选择"},on:{tap:e.selectTimeMethod},model:{value:e.dateVal,callback:function(t){e.dateVal=t},expression:"dateVal"}})]},proxy:!0},{key:"default",fn:function(t){var a=t.dataItem;return[n("view-item",{attrs:{label:"欢迎",type:"input-number"},model:{value:a.a,callback:function(t){e.$set(a,"a",t)},expression:"dataItem.a"}}),n("view-item",{attrs:{label:"欢迎",placeholder:"请选择",value:a.a},on:{tap:e.selectTimeMethod}})]}},{key:"footer",fn:function(){return[n("view-item",{attrs:{label:"时间段2",placeholder:"请选择"},on:{tap:e.selectTimeMethod}}),n("view-item",{attrs:{label:"时间选择",placeholder:"请选择",type:"select",options:[{value:1,text:"是"},{value:0,text:"否"}]},model:{value:e.timeSelect,callback:function(t){e.timeSelect=t},expression:"timeSelect"}})]},proxy:!0}],null,!0)})})),1),n("button",{on:{click:e.print}},[e._v("打印")])],1)},L=[],M={levelStart:"",levelEnd:"",greetingWords:"",greetingAdverbs:""},N={data:function(){return{groupGreetingList:this.setRandomKey([M]),dishIds:[6,7],catIds:[3],dateVal:"1233",couponId:"1",multipleRowColumnData:[[{a:1},{a:2}]],timeSelect:""}},methods:{print:function(){console.log(this.multipleRowColumnData)},tabEdit:function(e,t){var n=t.index;this.manageTabs(this.groupGreetingList,M,e,n,!0)},listViewEdit:function(e,t){var n=t.list,a=t.index;this.manageTabs(n,{a:""},e,a,!0)},getTabsData:function(){console.log(this.removeKey(this.groupGreetingList))},selectOption:function(){var e=Object(u["a"])(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.selectDishes({multiple:!0,selectedIds:this.dishIds});case 2:t=e.sent,this.dishIds=t.map((function(e){return e.dishId}));case 4:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}(),selectCats:function(){var e=Object(u["a"])(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.selectCategories({multiple:!0,selectedIds:this.catIds});case 2:t=e.sent,this.catIds=t.map((function(e){return e.categoryId}));case 4:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}(),selectNativeDate:function(){var e=Object(u["a"])(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.selectDate({mode:"range",selectedDates:{startDate:"2019-12-10",endDate:"2019-12-20"}});case 2:t=e.sent,this.dateVal=t;case 4:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}(),selectCoupon:function(){var e=Object(u["a"])(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.selectCouponGroup();case 2:t=e.sent,this.couponId=t.groupId;case 4:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}(),selectTimeMethod:function(){var e=Object(u["a"])(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.selectTime();case 2:t=e.sent,console.log(t);case 4:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}(),createLabel:function(e){return console.log(e),"限时设置"+e}},mounted:function(){var e=this;this.onSubmit(Object(u["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.abrupt("return",{groupGreetingList:e.removeKey(e.groupGreetingList,(function(e){e.levelStart=parseInt(e.levelStart),e.levelEnd=parseInt(e.levelEnd)}))});case 1:case"end":return t.stop()}}),t)}))))}},P=N,A=(n("1b5f"),Object(S["a"])(P,R,L,!1,null,"4a4abe6c",null)),U=A.exports,G="template-list-view",q={components:{TemplateListView:U},data:function(){return{current:G}}},W=q,K=Object(S["a"])(W,E,$,!1,null,null,null),J=K.exports,z=n("2d1c"),F={components:{AsyncComponent:V,VueLoading:z["VueLoading"],TemplateIndex:J},data:function(){return{accessToken:b.get("accessToken"),loadingComponent:!0,loadSuccess:!0,nodeEnv:"production",isCross:"1"===Object({NODE_ENV:"production",BASE_URL:""}).VUE_APP_DEV_CROSS}},methods:{componentLoaded:function(e){this.loadingComponent=!1,this.loadSuccess=e}}},H=F,B=(n("034f"),Object(S["a"])(H,o,s,!1,null,null,null)),X=B.exports,Q=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"container"},[n("div",{staticClass:"header-wrap flex-row justify-between align-center border-bottom"},[n("div",{staticClass:"scroll-container scroll-x"},[n("div",{staticClass:"flex-row",style:e.tabsWrapStyle},e._l(e.tabs,(function(t,a){return n("div",{key:t.name,staticClass:"tab-label-item flex-row border-all"},[n("span",{class:{selected:e.selectedIndex===a,"tab-text":!0},on:{click:function(n){return e.toggleTab(t.name,a)}}},[e._v(e._s(t.label))]),e.editable&&e.tabs.length>1?n("span",{staticClass:"btn-close",on:{click:function(n){return e.editTab("remove",t.name,a)}}},[e._v("×")]):e._e()])})),0)]),e.editable?n("div",{staticClass:"add-wrap border-all"},[n("span",{staticClass:"btn-add",on:{click:function(t){return e.editTab("add")}}},[e._v("+")])]):e._e()]),n("div",{staticClass:"scroll-container"},[n("div",{staticClass:"scroll-bd flex-row",style:e.listWrapStyle},[e._t("default")],2)])])},Z=[],Y=(n("ce9c"),function(e,t){for(var n=-1,a=0;a<e.length;a++)if(e[a].name===t){n=a;break}return n}),ee={props:{editable:Boolean,selectedName:[String,Number]},data:function(){return{tabs:[],selectedIndex:0}},watch:{selectedName:function(e){this.selectedIndex=e?Y(this.tabs,e):0}},computed:{tabsWrapStyle:function(){return{width:"".concat(100*this.tabs.length,"px")}},listWrapStyle:function(){var e={width:"".concat(100*this.tabs.length,"%"),left:"-".concat(100*this.selectedIndex,"%")};return this.selectedIndex<=-1&&(e.display="none"),e}},mounted:function(){this.selectedName&&(this.selectedIndex=Y(this.tabs,this.selectedName))},methods:{pushTabs:function(e,t){this.tabs.push({label:e,name:t})},removeTabs:function(e){var t=Y(this.tabs,e);t>=0&&this.tabs.splice(t,1)},updateTabs:function(e,t){var n=Y(this.tabs,t);n>=0&&this.tabs.splice(n,1,{label:e,name:t})},toggleTab:function(e,t){this.selectedIndex=t,this.$emit("tab-changed",{name:e,index:t})},editTab:function(e,t,n){var a=this;this.$emit("edit",e,"remove"===e?{name:t,index:n}:{}),"remove"===e&&this.$nextTick((function(){a.tabs[n]||(a.selectedIndex=n-1)}))}}},te=ee,ne=(n("d2d2"),Object(S["a"])(te,Q,Z,!1,null,"0239c813",null)),ae=ne.exports,re=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"container"},[e.$scopedSlots.header?n("div",{staticClass:"list-view-wrap border-bottom",style:e.editableComputed&&e.subLabel(0)?"":{marginBottom:"20px"}},[e._t("header")],2):e._e(),e._l(e.multipleListComputed,(function(t,a){return n("div",{key:a,staticClass:"container"},[(e.labelText=e.subLabel(a))||e.editableComputed&&a>0?n("div",{staticClass:"label-wrap"},[n("span",{staticClass:"label"},[e._v(e._s(e.labelText))]),e.editableComputed&&a>0?n("span",{staticClass:"btn-remove",on:{click:function(t){return e.edit("remove",a)}}},[e._v("×")]):e._e()]):e._e(),n("div",{staticClass:"list-view-wrap border-top border-bottom",style:{marginTop:0===a||e.editableComputed?0:"20px"}},[e._t("default",null,{dataItem:t})],2)])})),e.editableComputed?n("div",{staticClass:"add-wrap border-all"},[n("span",{staticClass:"btn-add",on:{click:function(t){return e.edit("add")}}},[e._v("+")])]):e._e(),e.$scopedSlots.footer?n("div",{staticClass:"list-view-wrap border-bottom border-top footer"},[e._t("footer")],2):e._e()],2)},ie=[],oe={props:{label:[String,Number],name:[String,Number],multipleList:Array,subLabel:{type:Function,default:function(){}},editable:{type:Boolean,default:!1}},watch:{label:function(e){this.$parent.updateTabs(e,this.name)}},computed:{multipleListComputed:function(){return this.multipleList||[{}]},editableComputed:function(){return this.multipleList&&this.editable}},methods:{edit:function(e,t){this.$emit("edit",e,{list:this.multipleList,name:this.name,index:t})}},created:function(){this.$parent.pushTabs&&this.$parent.pushTabs(this.label,this.name)},beforeDestroy:function(){this.$parent.removeTabs&&this.$parent.removeTabs(this.name)}},se=oe,le=(n("dcea"),Object(S["a"])(se,re,ie,!1,null,"7b9dfadf",null)),ce=le.exports,ue=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"view-item-wrap tap-highlight flex-row border-top",style:{height:e.subLabel?"60px":"48px"},on:{click:e.textClickHandler}},[n("div",{staticClass:"label-wrap flex-column"},[n("span",{staticClass:"label"},[e._v(e._s(e.label))]),e.subLabel?n("span",{staticClass:"sub-label"},[e._v(e._s(e.subLabel))]):e._e()]),e.arrowType||"select"===e.type?n("div",{staticClass:"flex-row align-center"},["select"===e.type?n("select",{directives:[{name:"model",rawName:"v-model",value:e.inputVal,expression:"inputVal"}],staticClass:"hidden-select",on:{change:function(t){var n=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){var t="_value"in e?e._value:e.value;return t}));e.inputVal=t.target.multiple?n:n[0]}}},e._l(e.options||[],(function(t,a){return n("option",{key:a,domProps:{value:t.value}},[e._v(e._s(t.text))])})),0):e._e(),e.imageUrl?n("div",{staticClass:"clip-icon-wrap"},[n("img",{staticClass:"clip-icon",attrs:{src:e.imageUrl}})]):e._e(),n("span",{staticClass:"text",style:{color:void 0!==e.value?"#333":"#999"}},[e._v(e._s(e.valueText))]),n("span",{staticClass:"iconfont"},[e._v("")])]):"checkbox"===e.inputType?n("input",{directives:[{name:"model",rawName:"v-model",value:e.inputVal,expression:"inputVal"}],staticClass:"val-input",attrs:{placeholder:e.placeholder||"请输入内容",type:"checkbox"},domProps:{checked:Array.isArray(e.inputVal)?e._i(e.inputVal,null)>-1:e.inputVal},on:{change:function(t){var n=e.inputVal,a=t.target,r=!!a.checked;if(Array.isArray(n)){var i=null,o=e._i(n,i);a.checked?o<0&&(e.inputVal=n.concat([i])):o>-1&&(e.inputVal=n.slice(0,o).concat(n.slice(o+1)))}else e.inputVal=r}}}):"radio"===e.inputType?n("input",{directives:[{name:"model",rawName:"v-model",value:e.inputVal,expression:"inputVal"}],staticClass:"val-input",attrs:{placeholder:e.placeholder||"请输入内容",type:"radio"},domProps:{checked:e._q(e.inputVal,null)},on:{change:function(t){e.inputVal=null}}}):n("input",{directives:[{name:"model",rawName:"v-model",value:e.inputVal,expression:"inputVal"}],staticClass:"val-input",attrs:{placeholder:e.placeholder||"请输入内容",type:e.inputType},domProps:{value:e.inputVal},on:{input:function(t){t.target.composing||(e.inputVal=t.target.value)}}})])},de=[],pe=(n("288e"),n("87bb")),fe=n("b52d"),me=n("ce72");function he(e,t){var n,a;return a=n=function(){function n(){Object(pe["a"])(this,n),Object(me["a"])(this,"ids",[]),Object(me["a"])(this,"fromCache",[]),Object(me["a"])(this,"dataCallbacks",[])}return Object(fe["a"])(n,[{key:"collectParams",value:function(e,t){var a=this;if(e&&!(e.length<=0)){var r=Array.isArray(e)?e:[e];r.forEach((function(e){n.cache[e]?a.fromCache.push(n.cache[e]):a.ids.push(e)})),this.dataCallbacks.push({ids:r,dataCallback:t})}}},{key:"request",value:function(){var a=Object(u["a"])(regeneratorRuntime.mark((function a(){var r,i,o,s,l;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(r=this.fromCache,!(this.ids.length>0)){a.next=8;break}return a.next=4,t(this.ids);case 4:i=a.sent,o=i.code,s=i.data,200===o&&(r=r.concat(s));case 8:r.length>0&&(l={},r.forEach((function(t){return l[t[e]]=n.cache[t[e]]=t})),this.dataCallbacks.forEach((function(e){var t=e.ids.map((function(e){return l[e]})).filter((function(e){return e}));e.dataCallback(t)}))),this.fromCache=[];case 10:case"end":return a.stop()}}),a,this)})));function r(){return a.apply(this,arguments)}return r}()}]),n}(),Object(me["a"])(n,"cache",{}),a}var ve={dish:he("dishId",(function(e){return C(e)})),category:he("categoryId",(function(e){return O(e)})),coupon:he("id",(function(e){return j(e)}))},be={};function ge(e,t,n){var a=be[e];a||(a=be[e]=new ve[e],setTimeout((function(){a.request(),delete be[e]}),50)),a.collectParams(t,n)}var ye,we={props:{label:{type:String,required:!0},subLabel:String,type:{validator:function(e){return/^text|input|input-number|select|dish|category|coupon$/.test(e)},type:String,default:"text"},placeholder:String,value:[String,Number,Array],options:Array},data:function(){return{inputVal:this.value,aliasName:"",imageUrl:""}},watch:{inputVal:function(e){"input-number"===this.type&&(e=parseFloat(e)),this.$emit("input",e)},value:function(){this.requestDescData()}},model:{prop:"value",event:"input"},computed:{inputType:function(){return{input:"text","input-number":"number"}[this.type]},arrowType:function(){var e=this.type;return"text"===e||"dish"===e||"category"===e||"coupon"===e},valueText:function(){var e=this,t=this.type;if("dish"===t||"category"===t||"coupon"===t)return this.aliasName;if(void 0!==this.value){if("select"===t){var n=(this.options||[]).find((function(t){var n=t.value;return n===e.value}));return n?n.text:this.value}return this.value}return this.placeholder}},created:function(){this.requestDescData()},methods:{textClickHandler:function(e){this.arrowType&&this.$emit("tap",e)},requestDescData:function(){var e=this;/^dish|category|coupon$/.test(this.type)&&this.value&&ge(this.type,this.value,(function(t){t.length>0?"dish"===e.type?(e.aliasName=t[0].name+(t.length>1?"等".concat(t.length,"个"):""),e.imageUrl=t[0].media[0]):"category"===e.type?(e.aliasName=t[0].name+(t.length>1?"等".concat(t.length,"个"):""),e.imageUrl=t[0].icon):"coupon"===e.type&&(e.aliasName=t[0].name+(t.length>1?"等".concat(t.length,"个"):"")):e.aliasName="未知项"}))}}},xe=we,_e=(n("77ea"),Object(S["a"])(xe,ue,de,!1,null,"dac51126",null)),ke=_e.exports,Ce=(n("e125"),n("5552"));function Oe(e,t){if(!e)throw Error("需指定跳转的native页面");return new Promise((function(n){ye=function(e){return n(e)},p.a.fn.navigate(e,t)}))}p.a.define("_emitSelected",(function(e){(ye||function(){})(e),ye=void 0}));var je={selectDishes:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return Oe("dishes",e)},selectCategories:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return Oe("categories",e)},selectCouponGroup:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return Oe("couponGroup",e)},selectTime:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return Oe("time",e)},selectDate:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return Oe("date",e)},fillFormData:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return Oe("formData",e)}},Te=null;p.a.define("_emitSubmit",Object(u["a"])(regeneratorRuntime.mark((function e(){var t,n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!Te){e.next=16;break}return t={code:200,data:void 0,message:""},e.prev=2,e.next=5,Te();case 5:if(n=e.sent,void 0!==n&&!1!==n&&null!==n){e.next=8;break}return e.abrupt("return");case 8:t.data=n,e.next=15;break;case 11:e.prev=11,e.t0=e["catch"](2),t.code=500,t.message=e.t0.message;case 15:p.a.fn.postData(t);case 16:case"end":return e.stop()}}),e,null,[[2,11]])}))));var Ie={onSubmit:function(e){"function"===typeof e&&(Te=e)}};n("009d");function Se(e,t){return new Promise(function(){var n=Object(u["a"])(regeneratorRuntime.mark((function n(a){var r,i,o,s,l,c,u,d,p,f,m,h,v,b,g,y,w,x,_;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if("dishes"!==e){n.next=9;break}return n.next=3,C();case 3:if(i=n.sent,o=i.data,o=Object.values(o),t.multiple){for(s={},l=0;l<2;l++)c=Math.floor(Math.random()*o.length),s[c]=o[c];r=Object.values(s)}else u=Math.floor(Math.random()*o.length),r=o[u];n.next=32;break;case 9:if("categories"!==e){n.next=18;break}return n.next=12,O();case 12:if(d=n.sent,p=d.data,p=Object.values(p),t.multiple){for(f={},m=0;m<2;m++)h=Math.floor(Math.random()*p.length),f[h]=p[h];r=Object.values(f)}else v=Math.floor(Math.random()*p.length),r=p[v];n.next=32;break;case 18:if("date"!==e){n.next=22;break}r="multiple"===t.mode?["2019-12-10","2019-12-12"]:"range"===t.mode?{startDate:"2019-12-10",endDate:"2019-12-14"}:"2019-12-10",n.next=32;break;case 22:if("couponGroup"!==e){n.next=31;break}return n.next=25,j();case 25:if(b=n.sent,g=b.data,g=Object.values(g),t.multiple){for(y={},w=0;w<2;w++)x=Math.floor(Math.random()*g.length),y[x]=g[x];r=Object.values(y)}else _=Math.floor(Math.random()*g.length),r=g[_];n.next=32;break;case 31:"time"===e&&(r="range"===t.mode?{startTime:"12:00",endTime:"21:00"}:"12:00");case 32:a(r);case 33:case"end":return n.stop()}}),n)})));return function(e){return n.apply(this,arguments)}}())}var De={selectDishes:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return Se("dishes",e)},selectCategories:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return Se("categories",e)},selectCouponGroup:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return Se("couponGroup",e)},selectTime:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return Se("time",e)},selectDate:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return Se("date",e)},fillFormData:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return Se("formData",e)}},Ve=null;w.on("_emitSubmit",Object(u["a"])(regeneratorRuntime.mark((function e(){var t,n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!Ve){e.next=16;break}return t={code:200,data:void 0,message:""},e.prev=2,e.next=5,Ve();case 5:if(n=e.sent,void 0!==n&&!1!==n&&null!==n){e.next=8;break}return e.abrupt("return");case 8:t.data=n,e.next=15;break;case 11:e.prev=11,e.t0=e["catch"](2),t.code=500,t.message=e.t0.message;case 15:w.emit("postData",t);case 16:case"end":return e.stop()}}),e,null,[[2,11]])}))));var Ee={onSubmit:function(e){"function"===typeof e&&(Ve=e)}},$e=n("a572");function Re(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function Le(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?Re(Object(n),!0).forEach((function(t){Object(me["a"])(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):Re(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var Me,Ne={setRandomKey:function(e){return e.map((function(e){return e.key="key"+1e5*Math.random(),e}))},removeKey:function(e){return e.map((function(e){return delete e.key,e}))},manageTabs:function(e,t,n,a){if("add"===n){var r="object"!==Object(Ce["a"])(t)?t:Le({},t);r.key=1e5*Math.random(),e.push(r)}else e.splice(a,1)},superInspector:$e};/devMode=1/.test(window.location.href)?(w.init(),Me=Le(Le(Le({},De),Ee),Ne)):Me=Le(Le(Le({},je),Ie),Ne);var Pe=Me;Object.keys(a).forEach((function(e){i["default"].component(e,a[e])})),Object.keys(Pe).forEach((function(e){i["default"].prototype[e]=Pe[e]})),i["default"].config.productionTip=!1,new i["default"]({render:function(e){return e(X)}}).$mount("#app")},"77ea":function(e,t,n){"use strict";var a=n("33ce"),r=n.n(a);r.a},a5f5:function(e,t,n){},d2d2:function(e,t,n){"use strict";var a=n("d4f7"),r=n.n(a);r.a},d4f7:function(e,t,n){},dcea:function(e,t,n){"use strict";var a=n("f86c"),r=n.n(a);r.a},f86c:function(e,t,n){}});
//# sourceMappingURL=app.d0df99a0.js.map