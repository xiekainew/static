var glob = require('glob')
var path = require('path')
var chalk = require('chalk')

var meta = require('./src/static/assets/meta.js')
var basePath = path.resolve(__dirname, './src/')
var commonFile = glob.sync(basePath + '/style/common/*.*')
var commonJs = glob.sync(basePath + '/js/common/*.js')

var reg = /<link([\s\S]*)<\/head>/
var metaReg = /<title>/

fis.hook('relative');
fis.match('**', {
  relative: true
})

fis.match('*.js', {
  parser: fis.plugin('babel-5.x', {
    blacklist: ['regenerator'],
    stage: 3
  }),
  rExt: 'js'
});

fis.match('*.html', {
	postprocessor: function(content, file, settings) {
		if (!settings.filename.match('components')) {
			var isLink = content.match(reg)

			commonFile.forEach(item => {
				if (isLink) {
					content = content.replace('<link', `<link rel="stylesheet" href="${item.replace(__dirname, "")}"/>
					<link`)
				} else {
					content = content.replace('</head>', `<link rel="stylesheet" href="${item.replace(__dirname, "")}"/>
					</head>`)
				}
			})
			content = content.replace('</head>', `<link rel="stylesheet" href="/static/font/iconfont.css"/>
			  </head>`)
			content = content.replace('</title>', `</title>\n <link rel="icon" href="/static/images/favicon.ico"/>`)
			commonJs.forEach(item => {
			content = content.replace('<script', `<script src="${item.replace(__dirname, "")}"></script>\n<script`)
			})

			meta.js.forEach(item => {
			content = content.replace('</head>', `<link rel="preload" as="script" href="${item}"/>
			  </head>`)
			content = content.replace('<script', `<script src="${item}"></script>\n<script`)
			})
			content = content.replace(metaReg, `${meta.meta}\n<title>`)
		}
		return content
	},
  useCache: false
})

fis.match('*.scss', {
	rExt: '.css',
	parser: fis.plugin('node-sass'),
  useHash: true,
  useCache: false
})

fis.match('src/(**)', { // 把src里的内容发送到根目录
	release: '/$1',
	useCache: false
})

// 在 debug 注释中的代码，在正式环境下自动移除。
fis.media('production').match('*.js', {
  parser: fis.plugin('jdists', {
    remove: "debug"
  })
})
// 压缩 js 代码。
fis.match('*.{js,jsx,ts,tsx,es6,es}', {
  optimizer: fis.plugin('uglify-js')
});
// 自动给 css 属性添加前缀，让标准的 css3 支持更多的浏览器.
fis.match('*.{css,less,scss}', {
  preprocessor: fis.plugin('autoprefixer', {
    "browsers": ["Android >= 2.1", "iOS >= 4", "ie >= 8", "firefox >= 15"],
    "cascade": true
  })
})

// 压缩 css 代码。
fis.match('*.{scss,sass,less,css}', {
  optimizer: fis.plugin('clean-css',{
      //option
  })
})
// 压缩 png 图片。
fis.match('*.png', {
  optimizer: fis.plugin('png-compressor',{
      //option
  })
})
// smarty html 代码压缩插件。 fis3-smarty 中已默认配置好。
fis.match('*.html', {
// fis.match('*.tpl', {
  optimizer: fis.plugin('html-compress')
})
// 静态资源前端加载器，纯前端项目必备插件。自动加载页面中用到的资源，同时还能按页面级别的All In One 打包。
fis.match('::packager', {
  postpackager: fis.plugin('loader')
});

//===================== 忽略规则  ===================
fis.set('project.ignore', [
    '**/nbproject/**',
    'output/**',
    '**/bat/**',
    'node_modules/**',
    'wiki/**',
    '.git/**',
    '.svn/**',
    "**conf.js",
    "**.ico",
    '**.bat'
]);