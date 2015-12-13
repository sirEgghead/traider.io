
var mongo = require("mongodb");
var MongoClient = mongo.MongoClient,
    Server = require('mongodb').Server,
    BSON = mongo.BSONPure;


exports.getDbClient = function() {
    return new MongoClient(new Server(process.env.DB_1_PORT_27017_TCP_ADDR, 27017), {
        native_parser: true
    });
};

exports.dbName = function() {
    return "traider";
};

exports.makeObjectID = function(id) {
    return new BSON.ObjectID(id);
};
