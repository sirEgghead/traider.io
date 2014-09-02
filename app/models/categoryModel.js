var mongoose = require('mongoose');

var CategorySchema = new mongoose.Schema({
    name: String,
    isActive: String,
    description: String,
    pageTitle: String,
    metaKeywords: String,
    metaDescription: String,
    includeInMenu: String,
    thumbnail: String,
    image: String
});

module.exports = mongoose.model('Category', CategorySchema);