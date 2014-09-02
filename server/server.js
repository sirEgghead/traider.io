var flash = require('connect-flash');
var passport = require('passport');
var util = require('util');
var LocalStrategy = require('passport-local').Strategy;
var express = require('express');
var http = require('http');
var path = require('path');
var requestProcesser = require("./request-processer");
var config = require("../config.json");
var mongoose = require('mongoose');
var formidable = require('formidable');
var fs = require('fs-extra');
var db = require('../app/db/connection');
var Category = require('../app/models/categoryModel');
passport.serializeUser(function(user, done) {
    done(null, user);
});
passport.deserializeUser(function(user, done) {
    if (user) {
        done(null, user);
    } else {
        done(new Error('User  does not exist'));
    }
});
passport.use(new LocalStrategy({
    usernameField: 'userName',
    passwordField: 'password'
}, function(username, password, done) {
    process.nextTick(function() {
        requestProcesser.auth(username, password, function(user) {
            if (!user) {
                return done(null, false, {
                    message: 'Unknown user ' + username
                });
            } else {
                requestProcesser.getUserName(username, function(username) {
                    return done(null, user);
                });
            }
        });
    });
}));
var app = express();
var pbc = path.join(__dirname, '../public/');
app.use(express.static(pbc));
//ejs
app.set('views', pbc);
app.engine('html', require('ejs').renderFile);
app.use(express.cookieParser());
//app.use(express.bodyParser());
//app.use(express.methodOverride());
app.use(express.session({
    secret: config.session.key,
    cookie: {
        _expires: config.session.maxAge
    }
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.set('port', config.server_config.port);
app.use(express.favicon());
app.use(express.json());
app.use(express.urlencoded());
// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        if (req.url === '/') {
            res.redirect('/dashboard');
        } else {
            return next();
        }
    } else {
        res.render('login.html');
    }
}
//Routes
app.get('/admin', function(request, response) {
    response.render('admin.html', {
        user: request.user,
        message: request.flash('error')
    });
});
app.post('/addCategory', function(req, res) {
    var form = new formidable.IncomingForm();
    var x, y;
    form.parse(req, function(err, fields, files) {
        res.writeHead(200, {
            'content-type': 'text/plain'
        });
        x = fields;
        y = files;
        res.write('received upload');
        obj = util.inspect({
            fields: fields,
            files: files
        });
        res.end(obj);
    });
    form.on('end', function(fields, files) {
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
        var t = path.resolve(__dirname , '../uploads/' + y.thumbnail.name);
        var i = path.resolve(__dirname , '../uploads/' + y.image.name);
        o.thumbnail = t;
        o.image = i;
        var cat = new Category(o);
        cat.save(function(err, obj) {
            if (!err) {
                console.log('Category saved : ' + obj);
            }
        });
    });
});
app.listen(app.get('port'));
console.log('Server listening on port ' + app.get('port'));