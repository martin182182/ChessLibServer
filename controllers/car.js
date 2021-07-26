var validator = require('validator');
var Car = require('../models/cars')
var fs = require('fs');
var path = require('path');


var controller = {
    //Guardar Carros
    save: (req,res)=>{
        //Cargar los datos recibidos por el body
        var params = req.body;
        try {
            var validateSerial = !validator.isEmpty(params.serial);
            var validatePlate = !validator.isEmpty(params.licensePlate);
            var validateModel = !validator.isEmpty(params.modelo);
            var validateBrand = !validator.isEmpty(params.brand);
            var validateClientID = !validator.isEmpty(params.clientId);
        } catch{
            return res.status(200).send({message:'Datos incompletos'})
        }
        if(validateSerial&&validatePlate&&validateModel&&validateClientID&&validateBrand){
            //Obejto de tipo carro para guardar
            var car = new Car();
            car.serial = params.serial;
            car.licensePlate = params.licensePlate;
            car.modelo = params.modelo;
            car.brand = params.brand;
            car.clientId = params.clientId;
            //Metodo para guardar
            car.save((err,carStored)=>{
                if(err||!carStored){
                    return res.status(404).send({status:'Error.',message:'Error al guardar el carro.'});
                }else{
                    return res.status(200).send({status:'Success.',carStored});
                }
            });
        }else{
            return res.status(200).send({status:'Error.',message:'Faltan datos.'})
        }
    },
    //Listar carros
    list: (req,res)=>{
        var clientId = req.params.clientId;

        Car.find({"clientId":clientId}).exec((err,cars)=>{
            if(err){
                return res.status(404).send({status:'Error',message:'Error'});
            }
            if(!cars){
                return res.status(500).send({status:'Error',message:'No hay carros'});
            }
            return res.status(200).send({status:'Success',cars});
        })
    },
    edit: (req,res)=>{
        var serial = req.params.serial;
        var params = req.body
        Car.findOneAndUpdate({serial:serial},params,{new:true},(err,carUpdated)=>{
            if(err){
                return res.status(500).send({status:'Error',message:'Error al actualizar'});
            }else{
                return res.status(200).send({status:'Success',carUpdated});
            }
        });
    },
    delete: (req,res)=>{
        var serial = req.params.serial;
        Car.findOneAndDelete({serial:serial},(err,carDeleted)=>{
            if(err){
                return res.status(500).send({status:'Error',message:'Error al eliminar'});
            }else{
                return res.status(200).send({status:'Success',carDeleted});
            }
        });
    },
    listAll: (req,res)=>{
        var clientId = req.params.clientId;

        Car.find({}).exec((err,cars)=>{
            if(err){
                return res.status(404).send({status:'Error',message:'Error'});
            }
            if(!cars){
                return res.status(500).send({status:'Error',message:'No hay carros'});
            }
            return res.status(200).send({status:'Success',cars});
        })
    },

};


module.exports = controller;