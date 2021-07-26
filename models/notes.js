var mongoose = require('mongoose');
var schema = mongoose.Schema;

var noteSchema = schema({
    jugada:String,
    descripcion:String,
    fen: String,
    gameID: String
});

module.exports = mongoose.model('Note',noteSchema);