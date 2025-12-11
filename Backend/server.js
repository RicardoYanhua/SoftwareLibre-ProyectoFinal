require('dotenv').config();
const express = require('express');
const cors = require('cors');

const RestauranteRouter = require('./Routes/RestauranteRouter');
const PlatoRouter = require('./Routes/PlatoRouter');
const IngredienteRouter = require('./Routes/IngredienteRouter');
const ProductorRouter = require('./Routes/ProductorRouter');
const CompraIngredienteRouter = require('./Routes/CompraIngredienteRouter');
const TuristaRouter = require('./Routes/TuristaRouter');
const ReservaEventoRouter = require('./Routes/ReservaEventoRouter');
const EventoGastronomicoRouter = require('./Routes/EventoGastronomicoRouter');
const ValoracionRouter = require('./Routes/ValoracionRouter');

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/restaurante", RestauranteRouter);
app.use("/api/plato", PlatoRouter);
app.use("/api/ingrediente", IngredienteRouter);
app.use("/api/productor", ProductorRouter);
app.use("/api/compra-ingrediente", CompraIngredienteRouter);
app.use("/api/turista", TuristaRouter);
app.use("/api/reserva-evento", ReservaEventoRouter);
app.use("/api/evento", EventoGastronomicoRouter);
app.use("/api/valoracion", ValoracionRouter);

app.get('/', (req, res) => {
  res.status(200).json({
     mensaje: "API Gastronomía - V1",
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

