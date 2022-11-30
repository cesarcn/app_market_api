'use strict'

const { reset } = require("nodemon");
var client = require("../database/db");
var db = client.db("pruebasbd");

var controller = {
    //LISTAR
    list: function (req, res) {
        console.log("----------------");
        console.log("ENTRANDO A LA FUNCION LISTAR");
        db.collection("inventario").find().toArray(
            (error, dataInventario) => {
                if (error || !dataInventario) {
                    return res.status(404).send({
                        message: "No se encontró el inventario"
                    });
                } else {
                    return res.status(200).send({
                        status: "success",
                        inventario: dataInventario
                    });
                }
            }

        );
    },
    // BUSCAR
    find: function (req, res) {
        console.log("----------------");
        console.log("ENTRANDO A LA FUNCION FIND");
        console.log("id:" + req.params.id);
        db.collection("inventario").find({ inventarioId: parseInt(req.params.id) }).toArray(
            (error, dataInventario) => {
                if (error || !dataInventario) {
                    return res.status(404).send({
                        message: "No se encontro el inventario"
                    });
                } else {
                    return res.status(200).send({
                        status: "success",
                        inventario: dataInventario[0]
                    });
                }
            }
        );
    },
    // GUARDAR
    save: function (req, res) {
        console.log("----------------");
        console.log("ENTRANDO A LA FUNCION SAVE");
        console.log(req.body);
        if (req.body.inventarioId == "0") {// SI ES NUEVO
            console.log("ENTRANDO A NUEVO");
            db.collection("inventario").count().then(
                countInventario => {
                    var inventario = {}
                    inventario.inventarioId = countInventario + 1;
                    inventario.nomproducto = req.body.nomproducto;
                    inventario.stock = req.body.stock;
                    inventario.categoria = req.body.categoria;
                    inventario.estado = req.body.estado;
                    db.collection('inventario').insertOne(inventario,
                        (error, result) => {
                            if (error) {
                                return res.status(404).send({
                                    message: "No se pudo registrar el inventario"
                                });
                            } else {
                                return res.status(200).send({
                                    message: "success",
                                    inventario: result
                                });
                            }
                        }
                    );
                }
            );
        } else {
            console.log("ENTRANDO A EDITAR");
            var inventario = {}
            inventario.inventarioId = parseInt(req.body.inventarioId);
            inventario.codproducto = req.body.codproducto;
            inventario.nomproducto = req.body.nomproducto;
            inventario.stock = req.body.stock;
            inventario.categoria = req.body.categoria;
            inventario.estado = req.body.estado;
            console.log(inventario);
            db.collection("inventario").updateOne({ inventarioId: { $eq: parseInt(req.body.inventarioId) } },
                                                 { $set: inventario },
                (error, result) => {
                    if (error) {
                        return res.status(404).send({
                            message: "No se pudo editar el inventario"
                        });
                    } else {
                        return res.status(200).send({
                            message: "success",
                            inventario: result
                        });
                    }
                }
            )


        }
    }
}

// EXPORTAR MODULO
module.exports = controller;