var db = require("./connection").db();
var log = require('../logger/logger').logger("dao");
var Category = require('../models/categoryModel');

exports.saveCategory = function(obj, callback) {
    log.debug("saveCategory");
    var cat = new Category(obj);
    cat.save(function(err, result) { 
        if(!err){
        	log.info("Category saved");
        	callback(result);
        }else{
        	log.error("Category not saved" + err);
        	callback(err);
        }
    });
};