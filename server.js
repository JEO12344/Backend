const express = require('express');
const bodyParser = require('body-parser');
const productsRouter = require('./routes/products');
const cartsRouter = require('./routes/carts');

const app = express();
const port = 8080;

// Parsear solicitudes con cuerpo JSON
app.use(bodyParser.json());

// Rutas para productos
app.use('/api/products', productsRouter);

// Rutas para carritos
app.use('/api/carts', cartsRouter);

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor Express corriendo en http://localhost:${port}`);
});
