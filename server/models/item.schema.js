var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Mongoose Schema
var ItemSchema = new Schema({
    description: {type: String, required: true},
    placer: {type: String, required: true},
    image_url: {type: String}
    },
    {collection:'items'

});

module.exports = mongoose.model('Item', ItemSchema);