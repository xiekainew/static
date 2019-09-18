var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var proxyMiddleware = require('http-proxy-middleware')
var bodyParser = require('body-parser')
var history = require('connect-history-api-fallback')


var common = require('./lib/common')
var config = common.config

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
// app.use(history())  // vue单页面应用需要设置这个来实现history功能
var proxy = common.eventProxy()
common.logger.info('[app]', 'app start... at port: http://localhost:' + config.port)
function listen () {
  common.logger.info('[app]', 'server listening on port', app.get('port'))
}
// console.log(proxy)
proxy.all('init', 'routes', listen)
proxy.fail(function(err) {
  common.logger.error('[app]', err.stack);
});
// const resolve = file => path.resolve(__dirname, file)
// const serve = (path, cache) => express.static(resolve(path), {
//     maxAge: cache ? 1000 * 60 * 60 * 24 * 30 : 0
// })
var proxyTable = {
  '/proxy': {
    target: 'https://www.justfun.fun/proxy/',
    pathRewrite: {
      '^/proxy': ''
    },
    changeOrigin: true,
    secure: false
  },
  // '/api': {
  //   target: 'http://10.220.8.165:2001/',
  //   changeOrigin: true,
  //   pathRewrite: {
  //       '^/api': ''
  //   },
  //   secure: false
  // }
};

(function () {
  // view engine setup
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'jade');
  app.set('port', config.port)
  // app.use(serve('public', true))
  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());

  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({extended: false}))

  // app.use('/', serve('public', true))
  // app.use('/', express.static(path.join(__dirname, 'public')));
  app.use('/', express.static(path.join(__dirname, 'backstage')));
  Object.keys(proxyTable).forEach(function(context) {
    // console.log(context)
    var options = proxyTable[context]
    if (typeof options === 'string') {
        options = { target: options }
    }
    app.use(context, proxyMiddleware(options))
  })
  proxy.emit('init')
})();

(function(){
  // app.use('/', indexRouter);
  // app.use('/users', usersRouter);
  app.use(require('./school-server/routes'))
  app.use(require('./server/routes'))
  proxy.emit('routes')
})();

(function() {
  // let lib = require('./lib')
  // lib.init((proxy.done('lib')))
  proxy.emit(require('./store').init())
})();



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
