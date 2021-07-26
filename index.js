var mongoose = require('mongoose');
var app = require('./app');
var port = 3900;

mongoose.set('useFindAndModify',false);
mongoose.Promise = global.Promise;

mongoose.connect(/*'mongodb://localhost:27017/AYW'*/'mongodb+srv://root:182182183@cluster0.b4gic.mongodb.net/chess',{useNewUrlParser: true})
.then(()=>{
    console.log('Conexion exitosa');

    //Servidor 
    app.listen(port,()=>{
        console.log('Servidor corriendo en http://localhost:'+port);
    });
});