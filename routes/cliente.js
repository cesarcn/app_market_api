'use strict'

var express = require('express');
const { model } = require('mongoose');


var ClienteController = require('../controller/cliente');

var router = express.Router();

// RUTAS PARA CLIENTES
router.get('/clientes', ClienteController.list);
router.get('/clientes/:id', ClienteController.find);
router.post('/clientes/save', ClienteController.save);

// EXPORTAR RUTA
module.exports = router;