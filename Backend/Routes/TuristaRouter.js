const express = require('express');
const router = express.Router();

// Importación de los métodos del controlador
const {
    ObtenerLista,
    ObtenerPorId,
    Crear,
    Actualizar,
    EliminarRegistro,
    BuscarPorTexto,
    ObtenerCantidadDeRegistros,
    ObtenerSuma,
    ObtenerPromedio,
    ObtenerMinimo,
    ObtenerMaximo,
    ObtenerUsuariosConCompras
} = require('../Controllers/EntidadController');

// Definición de las rutas y asignación de los métodos del controlador correspondiente
router.get('/', MetodoDelControlador);
router.get('/:id', ObtenerPorId);
router.get('/categoria/:id', ObtenerPorId);
router.post('/', Crear);
router.put('/:id', Actualizar);
router.delete('/:id', EliminarRegistro);
router.get('/autor/:autorId/libro/:libroId', ObtenerUsuariosConCompras);


module.exports = router;

