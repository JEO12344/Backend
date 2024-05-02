const { ProductManager } = require('./models/ProductManager');

const productManager = new ProductManager('./data/productos.json');

exports.getRealTimeProductsPage = (req, res) => {
  res.render('realTimeProducts', { products: productManager.getProducts() });
};