//Cargar modulos para el servidor

var express = require('express');
//Ficheros de rutas
var noteRoutes = require('./routes/note');
//Ejecucion de express 
var app = express();

//Middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//Rutas
app.use('/',noteRoutes);
//Exportar modulo
module.exports = app;

