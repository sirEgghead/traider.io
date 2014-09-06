var productDao = require("../dao/product-dao");
var util = require("../util/util");
var log = require('../logger/logger').logger("product-service");

exports.addProduct = function(obj, callback) {
    log.debug("addProduct");
    productDao.addProduct(obj, function(msg, returnValue) {
        util.handleErrors(msg, returnValue, callback);
    });
};

exports.editProduct = function(obj, callback) {
    log.debug("editProduct");
    productDao.editProduct(obj, function(msg, returnValue) {
        util.handleErrors(msg, returnValue, callback);
    });
};

exports.removeProduct = function(id, callback) {
    log.debug("removeProduct");
    console.log('product-service');
    productDao.removeProduct(id, function(msg, returnValue) {
        util.handleErrors(msg, returnValue, callback);
    });
};

exports.getProducts = function(callback) {
    log.debug("getProducts");
    productDao.getProducts(function(msg, returnValue) {
        util.handleErrors(msg, returnValue, callback);
    });
};

exports.getProduct = function(id, callback) {
    log.debug("getProduct");
    productDao.getProduct(id, function(msg, returnValue) {
        util.handleErrors(msg, returnValue, callback);
    });
};