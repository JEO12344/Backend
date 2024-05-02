const fs = require('fs');

class CartManager {
  constructor(filePath) {
    this.cartsFilePath = filePath;
    this.carts = this.loadCarts();
  }

  loadCarts() {
    try {
      const data = fs.readFileSync(this.cartsFilePath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  saveCarts() {
    const data = JSON.stringify(this.carts, null, 2);
    fs.writeFileSync(this.cartsFilePath, data, 'utf8');
  }

  getCartById(cartId) {
    return this.carts.find(cart => cart.id === cartId);
  }

  saveCart(cart) {
    const existingCartIndex = this.carts.findIndex(c => c.id === cart.id);
    if (existingCartIndex !== -1) {
      this.carts[existingCartIndex] = cart;
    } else {
      this.carts.push(cart);
    }
    this.saveCarts();
  }

  addProductToCart(cartId, productId, quantity) {
    const cart = this.getCartById(cartId);
    if (!cart) {
      throw new Error('Carrito no encontrado');
    }

    const existingProductIndex = cart.products.findIndex(item => item.product === productId);
    if (existingProductIndex !== -1) {
      cart.products[existingProductIndex].quantity += quantity;
    } else {
      cart.products.push({ product: productId, quantity });
    }

    this.saveCart(cart);
    return cart;
  }

  removeProductFromCart(cartId, productId) {
    const cart = this.getCartById(cartId);
    if (!cart) {
      throw new Error('Carrito no encontrado');
    }

    const index = cart.products.findIndex(item => item.product === productId);
    if (index !== -1) {
      cart.products.splice(index, 1);
      this.saveCart(cart);
      return cart;
    } else {
      throw new Error('Producto no encontrado en el carrito');
    }
  }
}

module.exports = CartManager;
