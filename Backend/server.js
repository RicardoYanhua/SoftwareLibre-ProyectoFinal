require('dotenv').config();
const express = require('express');
const cors = require('cors');

const LibroRoutes = require('./Routes/LibroRoutes');
const CategoriaRoutes = require('./Routes/CategoriaRouter');

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/libros', LibroRoutes);

app.use('/api/categorias', CategoriaRoutes);

app.get('/', (req, res) => {
  res.status(200).json({
    mensaje: 'EXAMEN SOFTWARE LIBRE - Ricardo Humberto Yanapa Huayta',
    version: '1.0.0',
    autor: 'Ricardo Humberto Yanapa Huayta',
  });
});
app.use((req, res) => {
  res.status(404).json({
    error: 'Ruta no encontrada',
    ruta: req.originalUrl
  });
});
app.use((err, req, res, next) => {
  console.error('Error interno:', err.message);
  res.status(500).json({
    error: 'Error interno del servidor',
    detalle: err.message
  });
});
app.listen(PORT, () => {
  console.log('Servidor corriendo exitosamente');
});

