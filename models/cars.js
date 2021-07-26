var mongoose = require('mongoose');
var schema = mongoose.Schema;

var carSchema = schema({
    serial: String,
    licensePlate: String,
    modelo: String,
    brand: String,
    year: Number,
    clientId: String,
    photo: String
});

module.exports = mongoose.model('Car',carSchema);
