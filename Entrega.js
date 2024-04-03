class ProductManager {
  constructor() {
    this.products = [];
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
    return this.products[index];
  }

  deleteProduct(productId) {
    const index = this.products.findIndex(product => product.id === productId);
    if (index === -1) {
      throw new Error('Producto no encontrado.');
    }
    const deletedProduct = this.products.splice(index, 1);
    return deletedProduct[0];
  }
}

const manager = new ProductManager();

console.log('Productos al principio:', manager.getProducts());

try {
  const newProduct = manager.addProduct({
    title: 'producto prueba',
    description: 'Este es un producto prueba',
    price: 200,
    thumbnail: 'Sin imagen',
    code: 'abc123',
    stock: 25
  });
  console.log('Producto agregado:', newProduct);

  console.log('Productos después de agregar:', manager.getProducts());

  try {
    manager.addProduct({
      title: 'producto repetido',
      description: 'Este es un producto repetido',
      price: 300,
      thumbnail: 'Otra imagen',
      code: 'abc123',
      stock: 10
    });
  } catch (error) {
    console.error('Error al agregar producto repetido:', error.message);
  }

  const foundProduct = manager.getProductById(newProduct.id);
  console.log('Producto encontrado por ID:', foundProduct);

  try {
    manager.getProductById('nonexistentID');
  } catch (error) {
    console.error('Error al buscar producto inexistente:', error.message);
  }

  const updatedProduct = manager.updateProduct(newProduct.id, {
    price: 250,
    stock: 30
  });
  console.log('Producto actualizado:', updatedProduct);

  const deletedProduct = manager.deleteProduct(newProduct.id);
  console.log('Producto eliminado:', deletedProduct);
} catch (error) {
  console.error('Error:', error.message);
}