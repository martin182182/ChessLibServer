var mongoose = require('mongoose');
var schema = mongoose.Schema;

var orderSchema = schema({
    entryDate: String,
    exitDate: String,
    userName: String,
    plate: String,
    diagnostic: String,
    procedure: String
});

module.exports = mongoose.model('Order',orderSchema);