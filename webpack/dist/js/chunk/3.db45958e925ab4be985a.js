(window.webpackJsonp=window.webpackJsonp||[]).push([[3],[,,,,,function(n,i,l){},function(n,i,l){},function(n,i,l){},,function(n,i,l){"use strict";var t=l(5);l.n(t).a},function(n,i){n.exports='<h2 id="一、基础优化">一、基础优化</h2>\n<h3 id="1、资源的合并与压缩">1、资源的合并与压缩</h3>\n<blockquote>\n<p>web前端是BS架构：开发 - 发布（webserver\\cdn） - 运行</p>\n</blockquote>\n<p>url -&gt; 浏览器 -&gt; DNS服务器查询ip -&gt; 发送请求 到服务端 -&gt; 服务端返回 -&gt; 浏览器接收html，解析渲染</p>\n<ul>\n<li>dns缓存</li>\n<li>使用cdn （域名不要和主站一样，防止携带cookie）</li>\n<li>去掉静态资源的cookie</li>\n<li>减少http请求大小</li>\n<li>减少http请求的数量</li>\n<li>服务端渲染</li>\n</ul>\n<p>深入理解<strong>http请求的核心</strong></p>\n<ol>\n<li><p>资源压缩</p>\n<ol>\n<li>html压缩<ul>\n<li>nodejs html-minifier工具</li>\n<li>后端模板引擎渲染压缩</li>\n</ul>\n</li>\n<li>css压缩<ul>\n<li>无效代码的删除</li>\n<li>css语义合并   使用clean-css</li>\n</ul>\n</li>\n<li>js压缩<ul>\n<li>代码语义的缩减和优化</li>\n<li>代码保护 使用uglifyjs2 </li>\n</ul>\n</li>\n</ol>\n</li>\n<li><p>文件合并\n存在的问题</p>\n<ul>\n<li>首屏渲染，变慢</li>\n<li>缓存失效</li>\n</ul>\n<p>建议</p>\n<ul>\n<li>公共库合并</li>\n<li>不同页面的合并</li>\n</ul>\n</li>\n</ol>\n<h3 id="图片相关的优化">图片相关的优化</h3>\n<ul>\n<li>png支持透明，浏览器兼容性好</li>\n<li>webp 压缩程度更好，在ios webview有兼容性问题； 安卓内无兼容性问题</li>\n<li>svg矢量图，代码内嵌，相对较小；简单的业务场景</li>\n</ul>\n<p>优化方案\n1. 雪碧图\n2. Image inline，内嵌到html内\n    减少HTTP请求数量，但是资源会变大\n3. 使用矢量图\n    使用SVG进行矢量图片、使用iconfont\n4. 安卓使用webp格式，淘宝使用了兼容性的方案，根据设备不同返回不同格式的图片</p>\n<p>雪碧图制作网站 www.spritecow.com</p>\n<h3 id="js、css的装载与执行---html渲染过程">js、css的装载与执行 - html渲染过程</h3>\n<p>html渲染过程的一些特点\n- 顺序执行，并发加载\n    特点\n    - 词法分析\n    - 并发加载\n    - 并发上限（某个域名下）\n- 是否阻塞（css阻塞）\n    - js阻塞\n        - 直接引入js阻塞页面的渲染\n        - js 不阻塞资源的加载\n        - js顺序执行，阻塞后续js逻辑的执行\n- 依赖关系\n    - 页面渲染依赖于css的加载\n    - js的执行顺序的依赖关系\n    - js逻辑对于dom节点的依赖关系\n- js引入方式（script引入、动态引入）\n    - 直接引入\n    - defer \n    - async 不能有依赖关系\n    - 异步动态引入js</p>\n<h3 id="加载和执行的一些优化点">加载和执行的一些优化点</h3>\n<ul>\n<li>css样式置顶，css加载会阻塞js的执行，但是不会阻塞并发加载</li>\n<li>用link代替import</li>\n<li>js脚本置底</li>\n<li>合理使用js的异步加载能力<ul>\n<li>defer 异步加载，等到documentLoad之后执行</li>\n<li>async 异步加载，立即执行</li>\n</ul>\n</li>\n</ul>\n<h1 id="二、进阶优化">二、进阶优化</h1>\n<h3 id="懒加载和预加载">懒加载和预加载</h3>\n<h4 id="懒加载">懒加载</h4>\n<p>定义：\n- 图片进入可视区域之后请求图片资源\n- 对于电商等图片很多，页面很长的业务场景适用\n- 减少无限资源的加载\n- 并发加载过多的资源会阻塞js的加载，影响网站的正常使用</p>\n<p>手机屏幕的高度 - 元素距离顶部的距离 - 滚动的距离\ndebuger</p>\n<h4 id="预加载">预加载</h4>\n<p>定义：\n- 图片等静态资源在使用之前提前加载\n- 资源使用到时能从缓存中加载，提示用户体验\n- 页面展示的依赖关系维护</p>\n<p>方式：\n- 使用标签直接加载 设为dispaly: none;\n- new Image() 对象\n- 使用XMLHttpRequest, 存在跨域问题，可以精细控制过程</p>\n<p>使用preloadJs</p>\n<h1 id="三、服务端优化">三、服务端优化</h1>\n'},function(n,i){n.exports='<h3 id="hash-webpack-规则">Hash webpack 规则</h3>\n<ul>\n<li>Hash</li>\n<li>chunkhash</li>\n<li>contenthash</li>\n</ul>\n'},function(n,i,l){"use strict";var t=l(6);l.n(t).a},function(n,i,l){"use strict";var t=l(7);l.n(t).a},,function(n,i,l){"use strict";l.r(i);var t={data:()=>({})},s=(l(9),l(0)),e=Object(s.a)(t,(function(){var n=this.$createElement,i=this._self._c||n;return i("div",{staticClass:"home"},[i("h1",[this._v("首页")]),this._v(" "),i("ul",[i("li",[i("router-link",{attrs:{to:"/detail"}},[i("el-button",[this._v("详情页")])],1)],1),this._v(" "),i("li",[i("router-link",{attrs:{to:"/list"}},[i("el-button",[this._v("列表页")])],1)],1),this._v(" "),i("li",[i("router-link",{attrs:{to:"/poster"}},[i("el-button",[this._v("宣传页")])],1)],1)])])}),[],!1,null,null,null);i.default=e.exports},function(n,i,l){"use strict";l.r(i);var t={data:()=>({})},s=l(0),e=Object(s.a)(t,(function(){var n=this.$createElement;this._self._c;return this._m(0)}),[function(){var n=this.$createElement,i=this._self._c||n;return i("div",{},[i("h1",[this._v("详情页")])])}],!1,null,null,null);i.default=e.exports},function(n,i,l){"use strict";l.r(i);var t=l(10),s=l.n(t),e=l(11),u=l.n(e),h={data:()=>({text:s.a,hash:u.a})},r=(l(12),l(0)),c=Object(r.a)(h,(function(){var n=this.$createElement,i=this._self._c||n;return i("div",{staticClass:"markdown"},[i("div",{domProps:{innerHTML:this._s(this.hash)}})])}),[],!1,null,null,null);i.default=c.exports},function(n,i,l){"use strict";l.r(i);var t={data:()=>({})},s=(l(13),l(0)),e=Object(s.a)(t,(function(){var n=this.$createElement;this._self._c;return this._m(0)}),[function(){var n=this.$createElement,i=this._self._c||n;return i("div",{staticClass:"poster"},[i("h1",[this._v("海报页")]),this._v(" "),i("h1",[this._v("海报页")]),this._v(" "),i("div",{staticClass:"poster-main"})])}],!1,null,null,null);i.default=e.exports}]]);