var Note = require('../models/notes');

var controller = {
    save: (req,res)=>{
        
        var params = req.body;

        var note = new Note();
        note.jugada = params.jugada;
        note.descripcion = params.descripcion;
        note.fen = params.fen;
        note.gameID = params.gameID;

        note.save((err,noteStored)=>{

            if(err||!noteStored){
                return res.status(404).send({status:'Error',message:'Error al guardar la nota'});
            }
            else{
                return res.status(200).send({status:'Success',noteStored});
            }
        });
        
    },
    list: (req,res)=>{
        var gameID = req.params.gameID
        Note.find({"gameID":gameID}).sort('-_id').exec((err,notes)=>{
            if(err||!notes){
                return res.status(404).send({status:'Error',message:'Error al mostrar la nota'});
            }else{
                return res.status(200).send({status:'Success',notes});
            }
        });
    },
}

module.exports = controller;