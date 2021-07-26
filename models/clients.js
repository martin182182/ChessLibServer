var mongoose = require('mongoose');
var schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var clientSchema = schema({
    firstName: String,
    lastName: String,
    email: String,
    userName: String,
    pwd: String,
    city: String,
    photo: String
});

module.exports = mongoose.model('Client',clientSchema);
