'use strict'

var client = require("../database/db");
var db = client.db("pruebasbd");
 
var controller = {
    //LISTAR
    list: function (req, res) {
        console.log("----------------");
        console.log("ENTRANDO A LA FUNCION LISTAR");
        db.collection("usuarios").find().toArray(
            (error, dataUsuarios) => {
                if (error || !dataUsuarios) {
                    return res.status(404).send({
                        message: "No se encontro al usuario"
                    });
                } else {
                    return res.status(200).send({
                        status: "success",
                        usuarios: dataUsuarios
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
        db.collection("usuarios").find({ usuarioId: parseInt(req.params.id) }).toArray(
            (error, dataUsuarios) => {
                if (error || !dataUsuarios) {
                    return res.status(404).send({
                        message: "No se encontro el usuario"
                    });
                } else {
                    return res.status(200).send({
                        status: "success",
                        usuario: dataUsuarios[0]
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
        if (req.body.usuarioId == "0") {// SI ES NUEVO
            console.log("ENTRANDO A NUEVO");
            db.collection("usuarios").count().then(
                countUsuarios => {
                    var usuario = {}
                    usuario.usuarioId = countUsuarios + 1;
                    usuario.nombreA = req.body.nombreA;
                    usuario.correo = req.body.correo;
                    usuario.password = req.body.password;
                    usuario.direccion = req.body.direccion;
                    usuario.telefono = req.body.telefono;
                    usuario.categoria = req.body.categoria;
                    usuario.estado = req.body.estado;
                    db.collection('usuarios').insertOne(usuario,
                        (error, result) => {
                            if (error) {
                                return res.status(404).send({
                                    message: "No se pudo registrar el usuario"
                                });
                            } else {
                                return res.status(200).send({
                                    message: "success",
                                    usuario: result
                                });
                            }
                        }
                    );
                }
            );
        } else {
            console.log("ENTRANDO A EDITAR");
            var usuario = {}
            usuario.usuarioId = parseInt(req.body.usuarioId);
            usuario.nombreA = req.body.nombreA;
            usuario.correo = req.body.correo;
            usuario.password = req.body.password;
            usuario.direccion = req.body.direccion;
            usuario.telefono = req.body.telefono;
            usuario.categoria = req.body.categoria;
            usuario.estado = req.body.estado;
            console.log(usuario);
            db.collection("usuarios").updateOne({ usuarioId: { $eq: parseInt(req.body.usuarioId) } },
                                                 { $set: usuario },
                (error, result) => {
                    if (error) {
                        return res.status(404).send({
                            message: "No se pudo editar el usuario"
                        });
                    } else {
                        return res.status(200).send({
                            message: "success",
                            usuario: result
                        });
                    }
                }
            )


        }
    }
}

// EXPORTAR MODULO
module.exports = controller;