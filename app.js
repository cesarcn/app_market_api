'use strict'

// REQUIRES 
var express = require('express')
var bodyParser = require('body-parser')

// USANDO LA DEPENDENCIA EXPRESS
var app = express();

// CARGA DE ARCHIVOS DE RUTA
var producto_routes = require('./routes/producto');
var pagos_routes = require('./routes/pagos');
var cliente_routes = require('./routes/cliente');
var usuario_routes = require('./routes/usuario');
var reporte_routes = require('./routes/reporte');
var inventario_routes = require('./routes/inventario');

// MIDDLEWARE
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CONFIGURACION DE CABECERAS Y CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With,Content-Type, Accept, Access-Control-Allow-Request-Method');
    req.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

// REESCRIBIR RUTAS
app.use('/api/', producto_routes);
app.use('/api/', pagos_routes);
app.use('/api/', cliente_routes);
app.use('/api', usuario_routes);
app.use('/api/', reporte_routes);
app.use('/api/', inventario_routes);

// EXPORTAR MODULO
module.exports = app;