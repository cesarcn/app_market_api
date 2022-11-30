'use strict'

var express = require('express');
/* const { model } = require('mongoose'); */


var InventarioController = require('../controller/inventario');

var router = express.Router();

// RUTAS PARA PRODUCTOS
router.get('/inventario', InventarioController.list);
router.get('/inventario/:id', InventarioController.find);
router.post('/inventario/save', InventarioController.save);

// EXPORTAR RUTA
module.exports = router;