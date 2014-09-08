var categoryDao = require("../dao/categoryDao");
var util = require("../util/util");
var log = require('../logger/logger').logger("categoryService");


exports.getCategories = function(callback) {
    log.debug("getCategories");
    categoryDao.getCategories(function(msg, returnValue) {
        util.handleErrors(msg, returnValue, callback);
    });
};

exports.addCategory = function(obj, callback) {
    log.debug("addCategory");
    categoryDao.addCategory(obj, function(msg, returnValue) {
        util.handleErrors(msg, returnValue, callback);
    });
};