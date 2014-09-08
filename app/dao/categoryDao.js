var db = require("../db/connection").db();
var log = require('../logger/logger').logger("categoryDao");
var Category = require('../models/categoryModel');

exports.saveCategory = function(obj, callback) {
    log.debug("saveCategory");

    console.log(obj);

    var cat = new Category(obj);
    cat.save(function(err, result) {
        if (!err && result) {
            log.info("Category saved");
            callback('success',result);
        } else {
            log.error("Category not saved" + err);
            callback('failure',err);
        }
    });
};

exports.getCategories = function(callback) {
    Category.find({}, "_id parent name description pageTitle metaKeywords metaDescription isActive includeInMenu", function(err, obj) {
        if (!err){
            callback(obj);
        }
    });
};