'use strict'

var express = require('express');

var ReporteController = require('../controller/reporte');

 
var router = express.Router();

// RUTAS PARA REPORTE DE PRODUCTOS POR CATEGORIA
router.get('/reportes/usuariosReport',ReporteController.usuariosReport);


// EXPORTAR RUTA
module.exports = router;