webpackJsonp([0],{Cdx3:function(t,e,o){var n=o("sB3e"),s=o("lktj");o("uqUo")("keys",function(){return function(t){return s(n(t))}})},Xfc0:function(t,e){},fZjL:function(t,e,o){t.exports={default:o("jFbC"),__esModule:!0}},jFbC:function(t,e,o){o("Cdx3"),t.exports=o("FeBl").Object.keys},jT7l:function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=o("fZjL"),s=o.n(n),r=o("E4LH"),i=o("t5DY"),a={name:"login",data:function(){return{loginForm:{nick:"admin",password:"123123"},loginRules:{nick:[{required:!0,trigger:"blur",validator:function(t,e,o){Object(r.j)(e)?o():o(new Error("Please enter the correct user name"))}}],password:[{required:!0,trigger:"blur",validator:function(t,e,o){e.length<6?o(new Error("The password can not be less than 6 digits")):o()}}]},passwordType:"password",capsTooltip:!1,loading:!1,redirect:void 0,otherQuery:{}}},watch:{$route:{handler:function(t){var e=t.query;e&&(this.redirect=e.redirect,this.otherQuery=this.getOtherQuery(e))},immediate:!0}},created:function(){},mounted:function(){""===this.loginForm.nick?this.$refs.nick.focus():""===this.loginForm.password&&this.$refs.password.focus()},destroyed:function(){},methods:{checkCapslock:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=t.shiftKey,o=t.key;o&&1===o.length&&(this.capsTooltip=!!(e&&o>="a"&&o<="z"||!e&&o>="A"&&o<="Z")),"CapsLock"===o&&!0===this.capsTooltip&&(this.capsTooltip=!1)},showPwd:function(){var t=this;"password"===this.passwordType?this.passwordType="":this.passwordType="password",this.$nextTick(function(){t.$refs.password.focus()})},handleLogin:function(){var t=this;this.$refs.loginForm.validate(function(e){if(!e)return console.log("error submit!!"),!1;t.loading=!0,console.log(t.loginForm),Object(i.f)(t.loginForm).then(function(e){t.loading=!1,0===e.status?(t.$message.success(e.msg),t.$store.commit("updateToken",e.data.token),t.$router.push({path:"/"})):t.$message.warning(e.msg),console.log(e)})})},getOtherQuery:function(t){return s()(t).reduce(function(e,o){return"redirect"!==o&&(e[o]=t[o]),e},{})}}},c={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"login-container"},[o("el-form",{ref:"loginForm",staticClass:"login-form",attrs:{model:t.loginForm,rules:t.loginRules,autocomplete:"on","label-position":"left"}},[o("div",{staticClass:"title-container"},[o("h3",{staticClass:"title"},[t._v("Welcome")])]),t._v(" "),o("el-form-item",{attrs:{prop:"nick"}},[o("span",{staticClass:"svg-container"},[o("svg-icon",{attrs:{"icon-class":"user"}})],1),t._v(" "),o("el-input",{ref:"nick",attrs:{placeholder:"nick",name:"nick",type:"text",tabindex:"1",autocomplete:"on"},model:{value:t.loginForm.nick,callback:function(e){t.$set(t.loginForm,"nick",e)},expression:"loginForm.nick"}})],1),t._v(" "),o("el-tooltip",{attrs:{content:"Caps lock is On",placement:"right",manual:""},model:{value:t.capsTooltip,callback:function(e){t.capsTooltip=e},expression:"capsTooltip"}},[o("el-form-item",{attrs:{prop:"password"}},[o("span",{staticClass:"svg-container"},[o("svg-icon",{attrs:{"icon-class":"password"}})],1),t._v(" "),o("el-input",{key:t.passwordType,ref:"password",attrs:{type:t.passwordType,placeholder:"Password",name:"password",tabindex:"2",autocomplete:"on"},on:{blur:function(e){t.capsTooltip=!1}},nativeOn:{keyup:[function(e){return t.checkCapslock(e)},function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.handleLogin(e):null}]},model:{value:t.loginForm.password,callback:function(e){t.$set(t.loginForm,"password",e)},expression:"loginForm.password"}}),t._v(" "),o("span",{staticClass:"show-pwd",on:{click:t.showPwd}},[o("svg-icon",{attrs:{"icon-class":"password"===t.passwordType?"eye":"eye-open"}})],1)],1)],1),t._v(" "),o("el-button",{staticStyle:{width:"100%","margin-bottom":"30px"},attrs:{loading:t.loading,type:"primary"},nativeOn:{click:function(e){return e.preventDefault(),t.handleLogin(e)}}},[t._v("Login")])],1)],1)},staticRenderFns:[]};var l=o("VU/8")(a,c,!1,function(t){o("rytA"),o("Xfc0")},"data-v-b32cd2b6",null);e.default=l.exports},rytA:function(t,e){},uqUo:function(t,e,o){var n=o("kM2E"),s=o("FeBl"),r=o("S82l");t.exports=function(t,e){var o=(s.Object||{})[t]||Object[t],i={};i[t]=e(o),n(n.S+n.F*r(function(){o(1)}),"Object",i)}}});
//# sourceMappingURL=0.92513997cb3def8d21a0.js.map