'use strict'

const { reset } = require("nodemon");
var client = require("../database/db");
var db = client.db("pruebasbd");

var controller = {
    //LISTAR
    list: function (req, res) {
        console.log("----------------");
        console.log("ENTRANDO A LA FUNCION LISTAR");
        db.collection("clientes").find().toArray(
            (error, dataClientes) => {
                if (error || !dataClientes) {
                    return res.status(404).send({
                        message: "No se encontraron los clientes"
                    });
                } else {
                    return res.status(200).send({
                        status: "success",
                        clientes: dataClientes
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
        db.collection("clientes").find({ clienteId: parseInt(req.params.id) }).toArray(
            (error, dataClientes) => {
                if (error || !dataClientes) {
                    return res.status(404).send({
                        message: "No se encontro el cliente"
                    });
                } else {
                    return res.status(200).send({
                        status: "success",
                        cliente: dataClientes[0]
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
        if (req.body.clienteId == "0") {// SI ES NUEVO
            console.log("ENTRANDO A NUEVO");
            db.collection("clientes").count().then(
                countClientes => {
                    var cliente = {}
                    cliente.clienteId = countClientes + 1;
                    cliente.nombApellido = req.body.nombApellido;
                    cliente.dni = req.body.dni;
                    db.collection('clientes').insertOne(cliente,
                        (error, result) => {
                            if (error) {
                                return res.status(404).send({
                                    message: "No se pudo registrar el cliente"
                                });
                            } else {
                                return res.status(200).send({
                                    message: "success",
                                    cliente: result
                                });
                            }
                        }
                    );
                }
            );
        } else {
            console.log("ENTRANDO A EDITAR");
            var cliente = {}
            cliente.clienteId = parseInt(req.body.clienteId);
            cliente.nombApellido = req.body.nombApellido;
            cliente.dni = req.body.dni;
            console.log(cliente);
            db.collection("clientes").updateOne({ clienteId: { $eq: parseInt(req.body.clienteId) } },
                { $set: cliente },
                (error, result) => {
                    if (error) {
                        return res.status(404).send({
                            message: "No se pudo editar el cliente"
                        });
                    } else {
                        return res.status(200).send({
                            message: "success",
                            cliente: result
                        });
                    }
                }
            )


        }
    }
}

// EXPORTAR MODULO
module.exports = controller;