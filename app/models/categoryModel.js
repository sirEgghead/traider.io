var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var CategorySchema = new Schema({
    name: String,
    isActive: String,
    description: String,
    pageTitle: String,
    metaKeywords: String,
    metaDescription: String,
    includeInMenu: String,
    thumbnail: String,
    image: String,
    parent:String
});

module.exports = mongoose.model('Category', CategorySchema);