const ProductManager = require('../models/ProductManager');

const productManager = new ProductManager('./data/productos.json');

exports.getAllProducts = (req, res) => {
  try {
    const products = productManager.getProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener productos.' });
  }
};

exports.getProductById = (req, res) => {
  const productId = req.params.pid;
  try {
    const product = productManager.getProductById(productId);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: 'Producto no encontrado.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener producto.' });
  }
};

exports.createProduct = (req, res) => {
  const product = req.body;
  try {
    productManager.addProduct(product);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear producto.' });
  }
};

exports.updateProduct = (req, res) => {
  const productId = req.params.pid;
  const updatedProduct = req.body;
  try {
    const product = productManager.updateProduct(productId, updatedProduct);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: 'Producto no encontrado.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar producto.' });
  }
};

exports.deleteProduct = (req, res) => {
  const productId = req.params.pid;
  try {
    const deletedProduct = productManager.deleteProduct(productId);
    if (deletedProduct) {
      res.json(deletedProduct);
    } else {
      res.status(404).json({ error: 'Producto no encontrado.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar producto.' });
  }
};
