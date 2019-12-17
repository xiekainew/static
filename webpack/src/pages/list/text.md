## 一、基础优化
### 1、资源的合并与压缩

> web前端是BS架构：开发 - 发布（webserver\cdn） - 运行

url -> 浏览器 -> DNS服务器查询ip -> 发送请求 到服务端 -> 服务端返回 -> 浏览器接收html，解析渲染

- dns缓存
- 使用cdn （域名不要和主站一样，防止携带cookie）
- 去掉静态资源的cookie
- 减少http请求大小
- 减少http请求的数量
- 服务端渲染

深入理解**http请求的核心**

1. 资源压缩
    1. html压缩
        - nodejs html-minifier工具
        - 后端模板引擎渲染压缩
    2. css压缩
        - 无效代码的删除
        - css语义合并   使用clean-css
    3. js压缩
        - 代码语义的缩减和优化
        - 代码保护 使用uglifyjs2 
2. 文件合并
    存在的问题
    - 首屏渲染，变慢
    - 缓存失效

    建议
    - 公共库合并
    - 不同页面的合并



### 图片相关的优化

- png支持透明，浏览器兼容性好
- webp 压缩程度更好，在ios webview有兼容性问题； 安卓内无兼容性问题
- svg矢量图，代码内嵌，相对较小；简单的业务场景

优化方案
1. 雪碧图
2. Image inline，内嵌到html内
    减少HTTP请求数量，但是资源会变大
3. 使用矢量图
    使用SVG进行矢量图片、使用iconfont
4. 安卓使用webp格式，淘宝使用了兼容性的方案，根据设备不同返回不同格式的图片

雪碧图制作网站 www.spritecow.com



### js、css的装载与执行 - html渲染过程

html渲染过程的一些特点
- 顺序执行，并发加载
    特点
    - 词法分析
    - 并发加载
    - 并发上限（某个域名下）
- 是否阻塞（css阻塞）
    - js阻塞
        - 直接引入js阻塞页面的渲染
        - js 不阻塞资源的加载
        - js顺序执行，阻塞后续js逻辑的执行
- 依赖关系
    - 页面渲染依赖于css的加载
    - js的执行顺序的依赖关系
    - js逻辑对于dom节点的依赖关系
- js引入方式（script引入、动态引入）
    - 直接引入
    - defer 
    - async 不能有依赖关系
    - 异步动态引入js

### 加载和执行的一些优化点
- css样式置顶，css加载会阻塞js的执行，但是不会阻塞并发加载
- 用link代替import
- js脚本置底
- 合理使用js的异步加载能力
    - defer 异步加载，等到documentLoad之后执行
    - async 异步加载，立即执行





# 二、进阶优化


### 懒加载和预加载

#### 懒加载
定义：
- 图片进入可视区域之后请求图片资源
- 对于电商等图片很多，页面很长的业务场景适用
- 减少无限资源的加载
- 并发加载过多的资源会阻塞js的加载，影响网站的正常使用

手机屏幕的高度 - 元素距离顶部的距离 - 滚动的距离
debuger

#### 预加载

定义：
- 图片等静态资源在使用之前提前加载
- 资源使用到时能从缓存中加载，提示用户体验
- 页面展示的依赖关系维护

方式：
- 使用标签直接加载 设为dispaly: none;
- new Image() 对象
- 使用XMLHttpRequest, 存在跨域问题，可以精细控制过程

使用preloadJs






# 三、服务端优化