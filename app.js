const express = require('express');
const { ProductManager } = require('./ProductManager'); // Asegúrate de que la ruta sea correcta
const app = express();
const port = 3000;

const productManager = new ProductManager('productos.json'); // Ruta al archivo de productos

// Endpoint para obtener todos los productos
app.get('/products', (req, res) => {
  try {
    let products = productManager.getProducts();

    // Verificar si hay parámetro de límite ?limit=
    const limit = req.query.limit;
    if (limit) {
      const parsedLimit = parseInt(limit);
      if (!isNaN(parsedLimit) && parsedLimit > 0) {
        products = products.slice(0, parsedLimit);
      } else {
        return res.status(400).json({ error: 'El parámetro de límite debe ser un número entero positivo.' });
      }
    }

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener productos.' });
  }
});

// Endpoint para obtener un producto por ID
app.get('/products/:pid', (req, res) => {
  const productId = req.params.pid;

  try {
    const product = productManager.getProductById(productId);
    res.json(product);
  } catch (error) {
    res.status(404).json({ error: 'Producto no encontrado.' });
  }
});

app.listen(port, () => {
  console.log(`Servidor Express corriendo en http://localhost:${port}`);
});
