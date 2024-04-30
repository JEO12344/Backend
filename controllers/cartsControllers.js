const CartManager = require('../models/CartManager');
const ProductManager = require('../models/ProductManager');

const cartManager = new CartManager('../models/CartManager.js');
const productManager = new ProductManager('../models/ProductManager.js');

exports.createCart = (req, res) => {
  try {
    const newCartId = generateUniqueId(); // Generar ID único para el carrito
    const newCart = { id: newCartId, products: [] };
    cartManager.saveCart(newCart);
    res.status(201).json(newCart);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el carrito.' });
  }
};

exports.getCartProducts = (req, res) => {
  const cartId = req.params.cid;
  try {
    const cart = cartManager.getCartById(cartId);
    if (cart) {
      res.json(cart.products);
    } else {
      res.status(404).json({ error: 'Carrito no encontrado.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener productos del carrito.' });
  }
};

exports.addProductToCart = (req, res) => {
  const cartId = req.params.cid;
  const productId = req.params.pid;
  const quantity = req.body.quantity || 1; // Por defecto, agregar uno
  try {
    const cart = cartManager.getCartById(cartId);
    const product = productManager.getProductById(productId);
    if (!cart || !product) {
      res.status(404).json({ error: 'Carrito o producto no encontrado.' });
      return;
    }
    const existingProductIndex = cart.products.findIndex(item => item.product === productId);
    if (existingProductIndex !== -1) {
      cart.products[existingProductIndex].quantity += quantity;
    } else {
      cart.products.push({ product: productId, quantity });
    }
    cartManager.saveCart(cart);
    res.status(201).json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar producto al carrito.' });
  }
};

exports.removeProductFromCart = (req, res) => {
  const cartId = req.params.cid;
  const productId = req.params.pid;
  try {
    const cart = cartManager.getCartById(cartId);
    if (!cart) {
      res.status(404).json({ error: 'Carrito no encontrado.' });
      return;
    }
    const index = cart.products.findIndex(item => item.product === productId);
    if (index !== -1) {
      cart.products.splice(index, 1);
      cartManager.saveCart(cart);
      res.json(cart);
    } else {
      res.status(404).json({ error: 'Producto no encontrado en el carrito.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar producto del carrito.' });
  }
};

// Función para generar un ID único
function generateUniqueId() {
  return Math.random().toString(36).substr(2, 9);
}
