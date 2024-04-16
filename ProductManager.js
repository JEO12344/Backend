const fs = require('fs');

class ProductManager {
  constructor(filePath) {
    this.path = filePath;
    this.products = this.loadProducts();
  }

  loadProducts() {
    try {
      const data = fs.readFileSync(this.path, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  saveProducts() {
    const data = JSON.stringify(this.products, null, 2);
    fs.writeFileSync(this.path, data, 'utf8');
  }

  getProducts() {
    return this.products;
  }

  addProduct(product) {
    const { title, description, price, thumbnail, code, stock } = product;

    const codeExists = this.products.some(product => product.code === code);
    if (codeExists) {
      throw new Error('El código de producto ya está en uso.');
    }

    const id = Math.random().toString(36).substr(2, 9);

    const newProduct = {
      id,
      title,
      description,
      price,
      thumbnail,
      code,
      stock
    };

    this.products.push(newProduct);
    this.saveProducts();

    return newProduct;
  }

  getProductById(productId) {
    const product = this.products.find(product => product.id === productId);
    if (!product) {
      throw new Error('Producto no encontrado.');
    }
    return product;
  }

  updateProduct(productId, updatedProduct) {
    const index = this.products.findIndex(product => product.id === productId);
    if (index === -1) {
      throw new Error('Producto no encontrado.');
    }
    this.products[index] = { ...this.products[index], ...updatedProduct };
    this.saveProducts();
    return this.products[index];
  }

  deleteProduct(productId) {
    const index = this.products.findIndex(product => product.id === productId);
    if (index === -1) {
      throw new Error('Producto no encontrado.');
    }
    const deletedProduct = this.products.splice(index, 1);
    this.saveProducts();
    return deletedProduct[0];
  }
}

module.exports = {
  ProductManager: ProductManager
};
