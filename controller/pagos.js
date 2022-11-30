'use strict'


var client = require("../database/db");
var db = client.db("pruebasbd");

var controller ={ 
    // LISTAR
    list: function(req, res){
        console.log("-----------------");
        console.log("ENTRANDO A LA FUNCION LISTAR")
        db.collection("pagos").find().toArray(
            (error, dataPagos) =>{
                if (error || !dataPagos){
                    return res.status(404).send({
                        message: "NO SE ENCONTRO LOS PAGOS"
                    });
                }else{
                    return res.status(200).send({
                        status: "succes",
                        pagos: dataPagos
                    });
                }
            }
        );
    },

    find: function (req, res) {
        console.log("----------------");
        console.log("ENTRANDO A LA FUNCION FIND");
        console.log("id:" + req.params.id);
        db.collection("pagos").find({ pagoId: parseInt(req.params.id) }).toArray(
            (error, dataPagos) => {
                if (error || !dataPagos) {
                    return res.status(404).send({
                        message: "No se encontro"
                    });
                } else {
                    return res.status(200).send({
                        status: "success",
                        pagos: dataPagos[0]
                    });
                }
            }
        );
    },

    //GUARDAR
    save: function (req, res) {
        console.log("----------------");
        console.log("ENTRANDO A LA FUNCION SAVE");
        console.log(req.body);
        if (req.body.pagoId == "0") {// SI ES NUEVO
            console.log("ENTRANDO A NUEVO");
            db.collection("pagos").count().then(
                countPagos => {
                    var pagos = {}
                    pagos.pagoId = countPagos + 1;
                    pagos.NomUsuario = req.body.NomUsuario;
                    pagos.NumTarje = req.body.NumTarje;
                    pagos.Fecha = req.body.Fecha;
                    pagos.Clave = req.body.Clave;
                    
                    db.collection('pagos').insertOne(pagos,
                        (error, result) => {
                            if (error) {
                                return res.status(404).send({
                                    message: "No se pudo registrar el pago"
                                });
                            } else {
                                return res.status(200).send({
                                    message: "success",
                                    pagos: result
                                });
                            }
                        }
                    );
                }
            );
        } else {
            console.log("ENTRANDO A EDITAR");
            var pagos = {}
            pagos.pagoId = parseInt(req.body.pagoId);
            pagos.NomUsuario = req.body.NomUsuario;
            pagos.NumTarje = req.body.NumTarje;
            pagos.Fecha = req.body.Fecha;
            pagos.Clave = req.body.Clave;
            console.log(pagos);
            db.collection("pagos").updateOne({ pagoId: { $eq: parseInt(req.body.pagoId) } },
                                                 { $set: pagos },
                (error, result) => {
                    if (error) {
                        return res.status(404).send({
                            message: "No se pudo editar el pagos"
                        });
                    } else {
                        return res.status(200).send({
                            message: "success",
                            pagos: result
                        });
                    }
                }
            )


        }
    }
}



//EXPORTAR MODULO 
module.exports = controller;