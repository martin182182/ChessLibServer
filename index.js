var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 3000;

mongoose.set('useFindAndModify',false);
mongoose.Promise = global.Promise;

mongoose.connect('mongodb+srv://root:182182183@cluster0.b4gic.mongodb.net/chess',{useNewUrlParser: true})
.then(()=>{
    console.log('Conexion exitosa');

    //Servidor 
    app.listen(port,()=>{
        console.log('Servidor corriendo en http://localhost:'+port);
    });
});