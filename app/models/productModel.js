var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ProductSchema = new Schema({
    brand: { type: String, required: true },
    color: String,
    depth: String,
    height: String,
    isRelatedTo: String,
    isSimilarTo: String,
    itemCondition: String,
    logo: String,
    manufacturer: String,
    model: String,
    mpn: String,
    productID: String,
    releaseDate: String,
    review: String,
    sku: String,
    weight: String,
    width: String,
    alternateName: String,
    description: String,
    image: String,
    name: String,
    url: String
});

module.exports = mongoose.model('Product', ProductSchema);