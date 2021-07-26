var Order = require('../models/orders');
var validator = require('validator');

var controller = {
    save: (req,res)=>{
        var params = req.body;
        var validateEntryDate = !validator.isEmpty(params.entryDate);
        var validateExitDate = !validator.isEmpty(params.exitDate);
        var validateUserName = !validator.isEmpty(params.userName);

        if(validateEntryDate&&validateExitDate&&validateUserName){
            var order = new Order();
            order.entryDate = params.entryDate;
            order.exitDate = params.exitDate;
            order.userName = params.userName;
            order.plate = params.plate;
            order.diagnostic = params.diagnostic;
            order.procedure = params.procedure;
            console.log(order);
            order.save((err,orderStored)=>{

                if(err||!orderStored){
                    return res.status(404).send({status:'Error',message:'Error al guardar la orden'});
                }
                else{
                    return res.status(200).send({status:'Success',orderStored});
                }
            });
        }
    },
    list: (req,res)=>{
        var userName = req.params.userName
        Order.find({userName:userName}).sort('-_id').exec((err,orders)=>{
            if(err||!orders){
                return res.status(404).send({status:'Error',message:'Error al mostrar la orden'});
            }else{
                return res.status(200).send({status:'Success',orders});
            }
        });
    },
    listOne: (req,res)=>{
        var userName = req.params.userName;
        if(!userName||userName==null){
            return res.status(404).send({status:'Error',message:'No hay un usuario con ese nombre'});
        }
        else{
            Order.findOne({"userName":userName},(err,orders)=>{
                if(err||!orders){
                    return res.status(404).send({status:'Error',message:'No hay ordenes'});
                }else{
                    return res.status(200).send({status:'Success',orders});
                }
            });
        }
    },
    update: (req,res)=>{
        var id = req.params.id;
        var params = req.body;

        Order.findByIdAndUpdate(id,params,{new:true},(err,orderUpdate)=>{
            if(err){
                return res.status(404).send({status:'Error',message:'No hay ordenes'}); 
            }else{
                return res.status(200).send({status:'Success',orderUpdate});
            }
        });
    },
    delete: (req,res)=>{
        var id = req.params.id;

        Order.findByIdAndDelete(id,(err,orderDeleted)=>{
            if(err){
                return res.status(404).send({status:'Error',message:'No hay ordenes'}); 
            }else{
                return res.status(200).send({status:'Success',orderDeleted});
            }
        })
    },
    listAll: (req,res)=>{
        Order.find({}).sort('-_id').exec((err,orders)=>{
            if(err||!orders){
                return res.status(404).send({status:'Error',message:'Error al mostrar la orden'});
            }else{
                return res.status(200).send({status:'Success',orders});
            }
        });
    },
}

module.exports = controller;