/**
 * Created by xiekai on 2017/7/18.
 */
var express = require('express');
var config = require('./config');
var port = process.env.PORT || config.build.port;

var app = express();
var router = express.Router();
router.get('/',function(req,res,next){
    req.url = '/index.html';
    next();
});

app.use(router);
var appData = require('./data.json');
var seller = appData.seller;
var goods = appData.goods;
var ratings = appData.ratings;

var apiRoutes = express.Router();

apiRoutes.get('/seller',function(req,res){
    res.json({
        status:0,
        data:seller
    })
});


apiRoutes.get('/goods',function(req,res){
    res.json({
        status:0,
        data:goods
    })
});


apiRoutes.get('/ratings',function(req,res){
    res.json({
        status:0,
        data:ratings
    })
});

app.use(apiRoutes);

app.use(express.static('./dist'));

var server = app.listen(port);

module.exports = {
    // ready: readyPromise,
    close: () => {
        server.close()
    }
}
