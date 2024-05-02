const { ProductManager } = require('./models/ProductManager');

const productManager = new ProductManager('./data/productos.json');

exports.getHomePage = (req, res) => {
  res.render('home', { products: productManager.getProducts() });
};