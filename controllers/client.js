var validator = require('validator');
var Client = require('../models/clients');
var fs = require('fs');
var path = require('path');
var nodemailer = require('nodemailer');

var controller = {
    //Guardar clientes
    save: (req,res)=>{
        var params = req.body;
        try{
            var validateFirstName = !validator.isEmpty(params.firstName);
            var validateLastName = !validator.isEmpty(params.lastName);
            var validateEmail = !validator.isEmpty(params.email);
            var validateUserName = !validator.isEmpty(params.userName);
            var validatePwd = !validator.isEmpty(params.pwd);
            var validateCity = !validator.isEmpty(params.city);
        }catch{
            return res.status(200).send({message: 'Faltan datos.',status: 'Error.'});
        }
        if(validateFirstName&&validateLastName&&validateEmail&&validateUserName&&validatePwd&&validateCity){
            //Objeto a guardar 
            var client = new Client();
            //Asignar valores
            client.firstName = params.firstName;
            client.lastName = params.lastName;
            client.email = params.email;
            client.userName = params.userName;
            client.pwd = params.pwd;
            client.city = params.city;
            client.photo = null;
            //Guardar objeto
            client.save((err,clientStored)=>{
                if(err||!clientStored){
                    return res.status(404).send({status:'Error',message:'Usuario no guardado'});
                }else{
                    return res.status(200).send({message: 'Success', user: clientStored});
                }
            });
            
        }else{
            return res.status(200).send({message: 'Faltan datos.',status: 'Error.'});
        }

    },
    
    listClients: (req,res)=>{

        Client.find({}).sort('-_id').exec((err,clients)=>{
            if(err){
                return res.status(500).send({status: 'Error', message:'Error al devolver clientes.'});
            }

            if(!clients){
                return res.status(404).send({status: 'Error', message:'No hay clientes.'});
            }

            return res.status(200).send({status: 'Success', clients});
        });
    },

    getClient: (req,res)=>{
        //Recoger id de la URL
        var user = req.params.userName;
        //Comprobar que existe
        if(!user||user==null){
            return res.status(404).send({status:'Error',message:'No existe un cliente con ese usuario'});
        }
        //Buscar cliente
        Client.find({"userName":user},(err,client)=>{
            if(err){
                return res.status(404).send({status:'Error',message:'Error al devolver los datos'});
            }
            
            if(!client){
                return res.status(500).send({status:'Error',message:'No existe ese cliente'});
            }
            //Devolver cliente
            return res.status(200).send({status:'Success',client});
        });
    },

    update: (req,res)=>{
        var user = req.params.userName;
        var params = req.body;
        //Validar
        try{
            var validateFirstName = !validator.isEmpty(params.firstName);
            var validateLastName = !validator.isEmpty(params.lastName);
            var validateEmail = !validator.isEmpty(params.email);
            var validateUserName = !validator.isEmpty(params.userName);
            var validatePwd = !validator.isEmpty(params.pwd);
            var validateCity = !validator.isEmpty(params.city);
        }catch(err){
            return res.status(404).send({status:'Error',message:'Faltan datos'});
        }

        if(validateFirstName&&validateLastName&&validateEmail&&validateUserName&&validatePwd&&validateCity){
            //Buscar y actualizar 
            Client.findOneAndUpdate({userName:user},params,{new:true},(err,clientUpdated)=>{
                if(err){
                    return res.status(500).send({status:'Error',message:'Error al actualizar'});
                }else{
                    return res.status(200).send({status:'Success',clientUpdated});
                }
            });
        }else{
            return res.status(404).send({status:'Error',message:'Faltan datos'});
        }
    },

    delete: (req,res)=>{
        //usuario
        var user = req.params.userName;
        //Buscar y eliminar
        Client.findOneAndDelete({userName:user},(err,clientRemoved)=>{
            if(err){
                return res.status(500).send({status:'Error',message:'Error al eliminar'});
            }
            return res.status(200).send({status:'Success', clientRemoved});
        });
    },

    upload: (req,res)=>{
        
        if(!req.files){
            return res.status(404).send({message:'No hay imagen'});
        }
        //Ruta y datos del archivo
        var file_path = req.files.file0.path;
        var file_split = file_path.split('\\');

        //Nombre archivo
        var file_name = file_split[2];
        //Extension
        var ext = file_name.split('.');
        var file_ext = ext[1];
        //Validar si la extension es valida
        if(file_ext!='png'&&file_ext!='jpg'&&file_ext!='jpeg'&&file_ext!='gif'){
            fs.unlink(file_path,(err)=>{
                return res.status(200).send({status: 'Error', message: 'Extension no valida'});
            });
        }else{
            var user = req.params.userName
            Client.findOneAndUpdate({userName: user},{photo: file_name},{new:true},(err,clientUpdated)=>{
                if(err){
                    return res.status(500).send({status:'Error', message:'Error al subir la imagen'});
                }
                if(!clientUpdated){
                    return res.status(404).send({status:'Error', message:'No existe el usuario'});
                }
                return res.status(200).send({status:'success',clientUpdated});
            });
        }
    },

    getPhoto: (req,res)=>{
        var photo = req.params.photo;
        var path_file = './upload/clients/'+photo;

        if(fs.existsSync(path_file)){
            return res.sendFile(path.resolve(path_file));
        }else{
            return res.status(404).send({status:'Error',message:'La ruta no existe'});
        }
    },

    search: (req,res)=>{
        //String a buscar
        var searchString = req.params.search;

        //Find or
        Client.find({"$or":[
            {"userName":{"$regex":searchString,"$options":"i"}}
        ]})
        .sort("-_id")
        .exec((err,clients)=>{
            if(!clients||clients.length<=0){
                return res.status(404).send({status:'Error',message:'Cliente no existe'});
            }
            if(err){
                return res.status(500).send({status:'Error',message:'Busqueda sin resultados'}); 
            }else{
                return res.status(200).send({status:'Success',clients});
            }
        })


    },

    auth: (req,res)=>{
        var {userName,pwd} = req.body;
        Client.findOne({userName,pwd},(err,client)=>{
            if(err){
                return res.status(500).send({status: 'Error', message:'Error al autenticar cliente.'});
            }

            if(!client){
                return res.status(404).send({status: 'Error', message:'No hay clientes.'});
            }

            return res.status(200).send({status:'Success',message:'Bienvenido/a '+userName});
        });
    },
    infoAYW: (req,res)=>{
        var params = req.body;
        var transporter = nodemailer.createTransport({
            service: 'hotmail',
            auth: {
                user: 'martinenrique_2000@hotmail.com',
                pass: 'martin2000'
            }
        }); 
        
        var mailOptions = {
            from: 'martinenrique_2000@hotmail.com',
            to: params.email,
            subject: 'Información AYW',
            text: 'Hola '+params.firstName+' esperamos te encuentres muy bien si quieres datos sobre nosotros puedes llamar a 0984736174.'
        };

        transporter.sendMail(mailOptions,(err)=>{
            if(err){
                return res.status(404).send({status: 'Error', params});
            }else{
                return res.status(200).send({status: 'Success', message:'Correo enviado'});
            }
        });
    }
};

module.exports = controller;