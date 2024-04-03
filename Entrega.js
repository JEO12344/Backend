class ProductManager {
  constructor() {
    this.products = [];
  }

  getProducts() {
    return this.products;
  }

  addProduct(title, description, price, thumbnail, code, stock) {

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
}

const manager = new ProductManager();


console.log('Productos al principio:', manager.getProducts());

try {

  const newProduct = manager.addProduct(
    'producto prueba',
    'Este es un producto prueba',
    200,
    'Sin imagen',
    'abc123',
    25
  );
  console.log('Producto agregado:', newProduct);

 
  console.log('Productos después de agregar:', manager.getProducts());

  try {

    manager.addProduct(
      'producto repetido',
      'Este es un producto repetido',
      300,
      'Otra imagen',
      'abc123',
      10
    );
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

} catch (error) {
  console.error('Error:', error.message);
}