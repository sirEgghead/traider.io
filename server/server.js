
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

app.use(express.bodyParser());
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

app.get('/rest', function(req, res) {
    res.render('Rest.html');
});


/*
app.post('/saveCategory', requestProcesser.saveCategory);
app.get('/getCategories', requestProcesser.getCategories);

/product	POST	Create a product.
/products	GET	Get all the products.
/product/:product_id	GET	Get a single product.



/product/:product_id	PUT	Update a product with new info.
/product/:product_id	DELETE	Delete a product.


//Create Update Delete GetAll GetOne



*/

//app.('', requestProcesser.);

app.post('/addProduct', requestProcesser.addProduct);
app.post('/editProduct', requestProcesser.editProduct);
app.post('/removeProduct', requestProcesser.removeProduct);

app.get('/getProducts', requestProcesser.getProducts);
app.get('/getProduct', requestProcesser.getProduct);

app.listen(app.get('port'));
console.log('Server listening on port ' + app.get('port'));