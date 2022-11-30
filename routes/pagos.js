'use strict'

var express = require('express');
//const { model } = require('mongoose');
 

var PagosController = require('../controller/pagos');

var router = express.Router();


//RUTAS PARA PAGOS
router.get('/pagos/', PagosController.list);
router.get('/pagos/:id', PagosController.find);
router.post('/pagos/save', PagosController.save);


// EXPORTAR RUTAS
module.exports = router;