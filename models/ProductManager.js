const fs = require('fs');

class ProductManager {
  constructor(filePath) {
    this.productsFilePath = filePath;
    this.products = this.loadProducts();
  }

  loadProducts() {
    try {
      const data = fs.readFileSync(this.productsFilePath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  saveProducts() {
    const data = JSON.stringify(this.products, null, 2);
    fs.writeFileSync(this.productsFilePath, data, 'utf8');
  }

  getProducts() {
    return this.products;
  }

  addProduct(product) {
    this.products.push(product);
    this.saveProducts();
  }

  getProductById(productId) {
    return this.products.find(product => product.id === productId);
  }

  updateProduct(productId, updatedProduct) {
    const index = this.products.findIndex(product => product.id === productId);
    if (index !== -1) {
      this.products[index] = { ...this.products[index], ...updatedProduct };
      this.saveProducts();
      return this.products[index];
    }
    return null;
  }

  deleteProduct(productId) {
    const index = this.products.findIndex(product => product.id === productId);
    if (index !== -1) {
      const deletedProduct = this.products.splice(index, 1);
      this.saveProducts();
      return deletedProduct[0];
    }
    return null;
  }
}

module.exports = ProductManager;
