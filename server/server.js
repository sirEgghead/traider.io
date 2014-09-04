
var express = require('express');
var http = require('http');
var path = require('path');
var requestProcesser = require("./request-processer");
var config = require("../config.json");
var app = express();
var pbc = path.join(__dirname, '../public/');
app.use(express.static(pbc));
app.set('views', pbc);
app.engine('html', require('ejs').renderFile);
app.use(express.cookieParser());
app.use(express.session({
    secret: config.session.key,
    cookie: {
        _expires: config.session.maxAge
    }
}));
app.set('port', config.server_config.port);
app.use(express.favicon());
app.use(express.json());
app.use(express.urlencoded());
//Routes
app.get('/admin', function(req, res) {
    res.render('admin.html');
});
app.post('/saveCategory', requestProcesser.saveCategory);
app.get('/getCategories', requestProcesser.getCategories);





app.listen(app.get('port'));
console.log('Server listening on port ' + app.get('port'));