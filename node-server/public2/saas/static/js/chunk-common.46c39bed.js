(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[1],{"4TjA":function(e,t,i){"use strict";var n=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{class:e.className},[e._v("\n  版权所有 "+e._s(e.data.version)+" © "+e._s(e.data.icpno)+"\n")])},r=[],o={data:function(){return{year:(new Date).getFullYear()}},props:{className:{type:String,default:"footer"},data:Object}},a=o,s=(i("L38v"),i("BI9D")),l=Object(s["a"])(a,n,r,!1,null,null,null);l.options.__file="footer.vue";t["a"]=l.exports},"7stK":function(e,t,i){"use strict";var n=i("dr4Y"),r=i("Mpsw"),o=i("wfkH");t["a"]={methods:{validator:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],i=arguments.length>2?arguments[2]:void 0,n=null,r=i?"checkErrorValue":"checkValue";return e.$children.map(function(e){"el-row"===e.$el.className?e.$children.map(function(e){e.$children.map(function(e){e.prop&&e[r]&&(t.length?-1!==t.indexOf(e.prop)&&(n?e[r]():n=e[r]()):n?e[r]():n=e[r]())})}):e.prop&&e[r]&&(t.length?-1!==t.indexOf(e.prop)&&(n?e[r]():n=e[r]()):n?e[r]():n=e[r]())}),n},validatorError:function(e){return this.validator(e,[],!0)},reset:function(e){e.$children.map(function(e){e.reset&&e.reset()})},download:function(e,t,i){console.log(t,1111);var a=r["default"].localStorage.get(r["default"].const.COOKIE.KEY_TOKEN)||"",s={token:a,param:t,sign:n["a"].signFun(t)},l="";i?(l=e+"?",Object(o["each"])(t,function(e,t){l+="".concat(t,"=").concat(e,"&")}),l="".concat(l.substr(0,l.length-1),"&token=").concat(a)):l=e+encodeURIComponent(n["a"].objToString(s)),window.open(l)},download1:function(e,t){var i=r["default"].localStorage.get(r["default"].const.COOKIE.KEY_TOKEN)||"",o={access_token:i,param:t,sign:n["a"].signNew(t)},a=e+encodeURIComponent(n["a"].objToString(o));window.open(a)},back:function(e){var t=-1;Object(o["isNumber"])(e)&&(t=-e),this.$router.go(t)},handleSearch:function(){},delQueryModel:function(){},mergeHeader:function(e,t){e.map(function(e){t.map(function(t){e.headerKey===t.headerKey&&Object(o["merge"])(e,t)})})},handleEdit:function(e,t){this.$store.state.layout.isShowEdit?this.$confirm("信息尚未保存，确定离开吗？","信息提示",{type:"warning"}).then(function(){e(t)}).catch(function(){}):e(t)},validatorTable:function(e){e.$children.map(function(e){})}}}},L38v:function(e,t,i){"use strict";var n=i("WoBj"),r=i.n(n);r.a},W9U2:function(e,t,i){"use strict";var n=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("el-form-item",{ref:"formItem",staticClass:"nb-form-item-wrapper",class:[void 0!==e.required?"is-required":"",e.inline?"inline-item":"inline-item-none","editor"===e.type?"editor-z-index":""],attrs:{prop:e.prop}},[e.label?i("div",{staticClass:"label-wrapper",class:[void 0!==e.required?"is-required":""]},[e._v("\n    "+e._s(e.label)+"\n    "),i("el-tooltip",{staticClass:"item",attrs:{effect:"dark",placement:"top"}},[i("div",{attrs:{slot:"content"},domProps:{innerHTML:e._s(e.labelTips)},slot:"content"}),e.labelTips?i("nb-img",{staticClass:" el-icon-tips",attrs:{width:"14",url:"/image/icon-info.png"}}):e._e()],1),i("span",{staticStyle:{color:"red"},attrs:{slot:"content"},domProps:{innerHTML:e._s(e.labelStars)},slot:"content"})],1):e._e(),e.preview&&!e.boxed?i("div",{staticClass:"show-value"},["image"===e.type?[i("img",{attrs:{width:"100",src:e.cloneValue}})]:[e.cloneValue?i("div",{domProps:{innerHTML:e._s(e.cloneValue)}}):i("div",{staticStyle:{color:"#999"}},[e._v("-")])]],2):e._e(),e.preview||e.boxed?e._e():i("div",{staticClass:"flex-wrapper"},[e.symbol?i("span",{staticClass:"input-symbol"},[e.symbol?[e._v(e._s(e.symbol))]:e._e()],2):e._e(),e.type&&"textarea"!==e.type&&"password"!==e.type&&"number"!==e.type?e._e():i("el-input",{attrs:{type:e.type,disabled:e.disabled,readonly:e.readonly,placeholder:e.placeholder,maxlength:e.max||e.maxs},on:{blur:e.blur,focus:e.focus,input:e.updateValue},model:{value:e.cloneValue,callback:function(t){e.cloneValue=t},expression:"cloneValue"}},[e.prepend?i("template",{slot:"prepend"},[e._v(e._s(e.prepend))]):e._e(),e.append?i("template",{slot:"append"},[e._v(e._s(e.append))]):e._e(),e.outter?i("template",{staticClass:"outter",slot:"append"},[e._v(e._s(e.outter))]):e._e()],2),"click"===e.type?i("div",{staticClass:"click-input",class:{clickNone:e.disabled},on:{click:e.inputClick}},[e.cloneValue?[e.cloneValue.length?e._e():i("span",{staticStyle:{color:"#999"}},[e._v(e._s(e.placeholder))]),e._l(e.cloneValue,function(t){return i("el-tag",{key:t.id,attrs:{size:"small"}},[e._v(e._s(t.name))])})]:[i("span",{staticStyle:{color:"#999"}},[e._v(e._s(e.placeholder))])]],2):e._e(),"click-input"===e.type?i("el-input",{staticClass:"click-input-box",class:{clickNone:e.disabled},attrs:{readonly:"",placeholder:e.placeholder},on:{click:e.inputClick},model:{value:e.cloneValue,callback:function(t){e.cloneValue=t},expression:"cloneValue"}}):e._e(),e._t("in"),e._t("out"),i("transition",{attrs:{name:"error"}},[e.showError&&!e.cancelError?i("div",{staticClass:"el-form-item__error"},[e._v(e._s(e.showError))]):e._e()])],2),e._t("box"),e.tips||e.max?i("el-row",{staticClass:"tips"},[e.tips&&!e.showError?i("el-col",{staticClass:"tips-text",attrs:{span:20}},[i("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:e.tips,placement:"top"}},[e._v("\n        "+e._s(e.tips)+"\n      ")])],1):e._e(),e.max?i("el-col",{staticClass:"value-num",attrs:{span:e.tips?12:24}},[e._v(e._s(e.num)+"/"+e._s(e.max))]):e._e()],1):e._e(),"image"!==e.type&&"file"!==e.type&&"oss"!==e.type?i("input",{ref:"ipt",attrs:{hidden:"",name:e.name}}):e._e()],2)},r=[],o=(i("q6NJ"),i("z1Rx"),i("Wgm0"),i("hPvz"),i("vHIR"),i("kLkQ")),a=i("7Ddh"),s={data:function(){return{cloneValue:this.value,validatorStatus:!1,check:!1,cancelError:!1,mostError:"",patterns:"",validatorType:this.required&&this.required.split(":")[0],cityOptions:[],oldValue:"",durations:"0",showOss:!0,alertMessage:{select:"请选择",datetime:"请选择",date:"请选择",radio:"请选择"},pickerMap:{back:{disabledDate:function(e){return e.getTime()<Date.now()-864e5}},forward:{disabledDate:function(e){return e.getTime()>Date.now()}}}}},components:{ElCascader:a["Cascader"]},props:{label:String,labelTips:String,labelTipsTwo:String,placeholder:String,value:[String,Number,Array,Date,Object],name:String,tips:String,prepend:String,append:String,outter:String,prop:{type:String,default:""},max:[Number,String],maxs:[Number,String],type:{type:String,default:""},required:String,disabled:Boolean,readonly:{type:Boolean,default:!1},multiple:Boolean,resetNo:Boolean,inline:{type:Boolean,default:!0},preview:Boolean,boxed:Boolean,input:String,options:{type:Array,default:function(){return[]}},checkItem:{type:Array,default:function(){return[]}},defaultKey:{type:Object,default:function(){return{label:"label",value:"value"}}},pattern:String,valueFormat:String,double:Boolean,documentType:[String,Number],upload:Boolean,fileType:{type:String,default:"avi,mp4,wmv,mov,FLV"},valueNum:{type:String,default:"1"},accept:String,search:Boolean,customeType:{type:Boolean,default:!1},symbol:String,isSelectObj:{type:Boolean,default:!1},remoteMethod:{type:Function,default:function(){}},showField:{type:Boolean,default:!1},textField:String,uploadTitle:String,labelStars:String,ossId:String,clearable:Boolean,remote:Boolean,checkNone:Boolean,pickerOptions:Object,pickerType:String},watch:{value:function(e){this.cloneValue=e,this.formatValue(e)},cloneValue:function(e){this.$emit("input",e)}},methods:{updateValue:function(e){e&&this.formatValue(e),this.check=!1,this.mostError="",this.cancelError&&(this.cancelError=!1),!this.validatorStatus&&(this.validatorStatus=!0),this.double?this.$emit("change",e):this.$emit("input",e)},formatValue:function(e){e=e||"";var t=this.$refs.ipt;return t&&(t.value=e),e},reset:function(){if(!this.resetNo){var e=Object.prototype.toString.call(this.cloneValue);switch(this.validatorStatus=!1,this.check=!1,e){case"[object String]":this.cloneValue="";break;case"[object Date]":this.cloneValue="";break;case"[object Number]":this.cloneValue="";break;case"[object Array]":this.cloneValue=[];break;case"[object Object]":this.cloneValue=null;break}"editor"===this.type?this.$refs.formEditor.initHtml(""):"image"===this.type?this.$refs.formImg.resetImg():"video"===this.type&&this.$refs.formVideo.resetVideo()}},getVideo:function(){return this.$refs.formVideo.getName()},getVideoDuration:function(){return this.$refs.formVideo.getDuration()},validator:function(e,t){t="<p><br></p>"===t?"":t,t="[object Undefined]"===Object.prototype.toString.call(t)?"":t,t="[object Array]"===Object.prototype.toString.call(t)?t.length>0?t:"":t;var i=e?e.split(":"):this.input?this.input.split(":"):[],n=this.placeholder||this.prop||"";if(this.input&&!t)return!1;switch(i[0]||""){case"":return t?"":i[1]?i[1]:this.defaultAlert;case"isPhone":return(t.length>=11||this.check)&&(Object(o["u"])(t)?"":t?i[1]||"手机号格式不正确":"请输入手机号");case"isInteger":return Object(o["q"])(t)?"":i[1]||"请输入整数";case"isDecimal":return Object(o["i"])(t)?"":i[1]||"请输入两位或四位小数";case"isDecimalFour":return Object(o["j"])(t)?"":i[1]||"请输入四位以内的小数";case"isMoney":return Object(o["r"])(t)?"":i[1]||"请输入正确的金额";case"isPassword":return(t.length>=6||this.check)&&(Object(o["t"])(t)?"":t?i[1]||"密码格式不正确":i[1]||"请输入".concat(n));case"isCard":if("2"===this.documentType||"99"===this.documentType||"3"===this.documentType){if(!Object(o["c"])(this.cloneValue))return"只能输入数字、字母、汉字类型"}else if("1"===this.documentType){if(18!==this.cloneValue.length)return void(this.mostError="身份证类型为18位！");if(!Object(o["b"])(this.cloneValue))return"只能输入数字、字母类型"}else if("4"===this.documentType){if(!Object(o["d"])(this.cloneValue))return"证件号码格式不正确";if(this.cloneValue.length>10)return"证件号码格式不正确"}else if("5"===this.documentType){if(!Object(o["e"])(this.cloneValue))return"证件号码格式不正确";if(this.cloneValue.length>10)return"证件号码格式不正确"}if(this.validatorType="isCard",!t)return"请输入证件号";break;case"isNine":return Object(o["s"])(t)?"":i[1]||"请输入0-99的数字";case"isDouDecimal":return Object(o["k"])(t)?"":i[1]||"请输入两位小数";case"isFtoN":return Object(o["p"])(t)?"":i[1]||"请输入1-99的整数";case"isFourDecimal":return Object(o["m"])(t)?"":i[1]||"最多输入四位小数";case"isFtoHn":return Object(o["o"])(t)?"":i[1]||"请输入1-999的整数";case"isToFn":return Object(o["w"])(t)?"":i[1]||"请输入1-9999的整数";case"isToTh":return Object(o["x"])(t)?"":i[1]||"请输入1-30的整数";case"urlHeader":return Object(o["B"])(t)?"":i[1]||"跳转地址必须以http://或https:/开头！";case"email":return Object(o["f"])(t)?"":i[1]||"邮箱格式错误，请重新输入";case"interTwo":return Object(o["h"])(t)?"":i[1]||"请输入不小于0的数字，最多允许两位小数";case"isEcpInteger":return Object(o["l"])(t)?"":i[1]||"请输入正整数";case"isTwDec":return Object(o["y"])(t)?"":i[1]||"允许输入大于0且最多输入两位小数";case"isTwHun":return Object(o["z"])(t)?"":i[1]||"请输入两位小数";case"isPositiveInteger":return Object(o["v"])(t)?"":i[1]||"输入数字，T后的第N个工作日起息";case"isTwMoney":return Object(o["A"])(t)?"":i[1]||"最多允许输入两位小数";case"isFourMoney":return Object(o["n"])(t)?"":i[1]||"最多允许输入四位小数"}},focus:function(){this.oldValue=this.cloneValue},blur:function(){var e=this;if(!this.cloneValue&&void 0===this.required&&(this.cancelError=!0),this.$emit("onBlur"),"isCard"===this.validatorType){if(this.oldValue===this.cloneValue)return;if(!this.cloneValue)return void(this.mostError="请输入证件号！");if("2"===this.documentType||"99"===this.documentType||"3"===this.documentType){if(this.cloneValue.length<8||this.cloneValue.length>20)return void(this.mostError="护照或其他证件类型长度最少8位最多20位");if(!Object(o["c"])(this.cloneValue))return void(this.mostError="只能输入数字、字母、汉字类型")}else if("1"===this.documentType){if(18!==this.cloneValue.length)return void(this.mostError="身份证类型为18位！");if(!Object(o["b"])(this.cloneValue))return void(this.mostError="只能输入数字、字母类型")}else if("4"===this.documentType){if(!Object(o["d"])(this.cloneValue)||10!==this.cloneValue.length)return void(this.mostError="证件号码格式不正确")}else if("5"===this.documentType&&(!Object(o["e"])(this.cloneValue)||10!==this.cloneValue.length))return void(this.mostError="证件号码格式不正确");if(!this.documentType)return;if(this.checkNone)return;this.$store.dispatch("CHECK_CARD",{param:{documentType:this.documentType,documentNo:this.cloneValue}}).then(function(t){if(t.success)return"";e.mostError=t.msg})}},checkValue:function(){return this.validatorStatus=!0,this.check=!0,this.showError},checkErrorValue:function(){return this.cloneValue&&this.showError},inputClick:function(){this.disabled||this.$emit("click")},openEditor:function(){this.$refs.nbEditor.show(this.cloneValue)},openOneEditor:function(){this.disabled||this.$emit("oneEditor")},saveEditor:function(e){this.updateValue(e)},fetchCity:function(){var e=this;this.$store.dispatch("COMMON_AREA",{param:{}}).then(function(t){t.success&&(t.data.map(function(t){1===t.level&&e.cityOptions.push({label:t.name,value:t.id,children:[]})}),e.cityOptions.map(function(e){t.data.map(function(t){e.value===t.parentId&&e.children.push({label:t.name,value:t.id})})}))})},imageValue:function(e){this.$emit("fileData",e)},resetFile:function(){this.$refs.files.resetData()},getOss:function(){return this.$refs.files.returnData()},duration:function(e){e&&(this.durations=e)},resetOss:function(){var e=this;this.showOss=!1,this.$nextTick(function(){e.showOss=!0})},updateDone:function(e){this.$emit("done",e)}},computed:{num:function(){return this.cloneValue&&this.cloneValue.length||0},showError:function(){return this.mostError||(this.validatorStatus||this.check)&&(void 0!==this.required||this.input)&&this.validator(this.required,this.cloneValue)},defaultAlert:function(){return this.alertMessage[this.type]?this.alertMessage[this.type]+this.labelText:"请输入".concat(this.labelText)},labelText:function(){return this.label?this.label.replace(/(：|:)/g,""):"内容"}},created:function(){},mounted:function(){"city"===this.type&&this.fetchCity(),this.patterns=this.pattern?this.pattern.split("|"):[],this.formatValue(this.value)}},l=s,c=(i("Zjwo"),i("BI9D")),u=Object(c["a"])(l,n,r,!1,null,null,null);u.options.__file="nb-form.vue";t["a"]=u.exports},WoBj:function(e,t,i){},Zjwo:function(e,t,i){"use strict";var n=i("eyIp"),r=i.n(n);r.a},eyIp:function(e,t,i){}}]);
//# sourceMappingURL=chunk-common.46c39bed.js.map