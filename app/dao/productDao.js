var db = require("../db/connection").db();
var log = require('../logger/logger').logger("productDao");
var Product = require('../models/productModel');

exports.addProduct = function(obj, callback) {
    var p = new Product(obj);
    p.save(function(err, result) {
        if (!err && result) {
            log.info("Product saved");
            callback('success', result);
        } else {
            log.error("Product not saved" + err);
            callback('failure', err);
        }
    });
};

exports.editProduct = function(obj, callback) {        
    Product.findById(obj.id, function(err, p) {
        if (!err && p) {
            console.log(p);
            p.brand = obj.brand;
            p.save(function(err, result) {
                if (!err) {
                    log.info("Product Updated");
                    callback('success', result);
                } else {
                    log.error("Product not Updated" + err);
                    callback('failure', err);
                }
            });
        } else {
            callback('failure', err);
        }
    });
};

exports.removeProduct = function(id, callback) {
    console.log('productDao');
    console.log(id);

    Product.remove({
        _id: id
    }, function(err, result) {
        if (!err && result) {
            log.info("Product Removed");
            callback('success', result);
        } else {
            log.error("Product not Removed" + err);
            callback('failure', err);
        }
    });
};
exports.getProducts = function(callback) {
    Product.find({}, function(err, result) {
        if (!err && result) {
            log.info("Products");
            callback('success', result);
        } else {
            log.error("No Products" + err);
            callback('failure', err);
        }
    });

};
exports.getProduct = function(id, callback) {
    Product.findById(id, function(err, result) {
        if (!err && result) {
            log.info("Product");
            callback('success', result);
        } else {
            log.error("No Product" + err);
            callback('failure', err);
        }
    });
};