var path = require('path');
var formidable = require('formidable');
var fs = require('fs-extra');
var Dao = require("../app/db/dao");

exports.saveCategory = function(req, res) {
    console.log('exports.saveCategory = function(req, res) {');
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
        Dao.saveCategory(o, function(returnValue) {
            res.json(returnValue);
        });
    });
};


exports.getCategories = function(req, res) {
    Dao.getCategories(function(returnValue) {
        res.json(returnValue);
    });
};

