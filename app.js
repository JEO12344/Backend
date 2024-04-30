const express = require('express');
const exphbs = require('express-handlebars');
const http = require('http');
const socketIO = require('socket.io');

const { ProductManager } = require('./models/ProductManager');
const homeRouter = require('./routes/homeRouter');
const realtimeRouter = require('./routes/realtimeRouter');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Configurar Handlebars
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Configurar rutas
app.use('/', homeRouter);
app.use('/realtimeproducts', realtimeRouter);

// Configurar Socket.IO
io.on('connection', (socket) => {
  console.log('Un usuario se ha conectado');

  // Emitir eventos de actualización de productos
  socket.on('updateProduct', (product) => {
    // Actualizar el producto en el ProductManager
    productManager.updateProduct(product.id, product);

    // Emitir el evento a todos los clientes conectados
    io.emit('productUpdate', product);
  });
});

const productManager = new ProductManager('./data/productos.json');

server.listen(3000, () => {
  console.log('Servidor iniciado en http://localhost:3000');
});