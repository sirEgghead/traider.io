var log = require('../app/logger/logger').logger("requestProcessor");
var path = require('path');
var formidable = require('formidable');
var fs = require('fs-extra');


var productService = require("../app/service/productService");
var categoryService = require("../app/service/categoryService");



exports.addProduct = function(req, res, callback) {
    console.log('addProduct');
    var obj = {
        brand: req.param('brand')
    };

    console.log(obj);
    productService.addProduct(obj, function(returnValue) {
        res.json(returnValue);
    });
};

exports.editProduct = function(req, res, callback) {
    log.debug('editproduct');
    var obj = {
        brand: req.param('brand'),
        id: req.param('id')
    };
    productService.editProduct(obj, function(returnValue) {
        res.json(returnValue);
    });
};

exports.removeProduct = function(req, res, callback) {
    log.debug("removeProduct");
    console.log('request-processor');
    var id = req.param('id');
    console.log(id);
    productService.removeProduct(id, function(returnValue) {
        res.json(returnValue);
    });
};

exports.getProducts = function(req, res, callback) {
    console.log('request-processor');

    log.debug("getProducts");
    productService.getProducts(function(returnValue) {
        res.json(returnValue);
    });
};

exports.getProduct = function(req, res, callback) {
    console.log('request-processor');
    log.debug("getProduct");
    var id = req.param('id');
    console.log(id);
    productService.getProduct(id, function(returnValue) {
        res.json(returnValue);
    });
};

exports.addCategory = function(req, res) {
    console.log('exports.addCategory = function(req, res) {');
    var form = new formidable.IncomingForm();
    var x, y;
    form.parse(req, function(err, fields, files) {
        x = fields;
        y = files;

        console.log('----------------');
        console.log(fields);

        console.log('----------------');
        console.log(files);


    });
    form.on('end', function() {
        var files = this.openedFiles;
        var temp_path = this.openedFiles[0].path;
        var new_location = 'uploads/';
        files.forEach(function(file) {
            var file_name = file.name;
            (function(f) {
                fs.copy(temp_path, new_location + f, function(err) {
                    if (err) {
                        console.error(err);
                    } else {
                        console.log("copied file to uploads folder :: " + f);
                    }
                });
            }(file_name));
        });
        var o = x;
        console.log(o);
        var t = path.resolve(__dirname, '../uploads/' + y.thumbnail.name);
        var i = path.resolve(__dirname, '../uploads/' + y.image.name);
        o.thumbnail = t;
        o.image = i;
        Dao.addCategory(o, function(returnValue) {
            res.json(returnValue);
        });
    });
};


exports.getCategories = function(req, res) {
    categoryService.getCategories(function(returnValue) {
        res.json(returnValue);
    });
};