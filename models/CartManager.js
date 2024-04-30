const fs = require('fs');

class CartManager {
  constructor(filePath) {
    this.cartFilePath = filePath;
    this.cart = this.loadCart();
  }

  loadCart() {
    try {
      const data = fs.readFileSync(this.cartFilePath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      return {};
    }
  }

  saveCart(cart) {
    const data = JSON.stringify(cart, null, 2);
    fs.writeFileSync(this.cartFilePath, data, 'utf8');
  }

  // Resto del código de CartManager...
}

module.exports = CartManager;