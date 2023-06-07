class ProductManager {
  constructor() {
    this.products = [];
    this.nextId = 1;
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.log("Los campos son obligatorios");
      return;
    }

    const existingProduct = this.products.some((product) => product.code === code);
    if (existingProduct) {
      console.log(`El producto con el código ${code} ya existe`);
      return;
    }

    const product = {
      id: this.nextId,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };

    this.products.push(product);
    this.nextId++;
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find((product) => product.id === id);
    if (product) {
      return product;
    } else {
      console.log("No se encontró el producto");
    }
  }
}

const productManager = new ProductManager();

productManager.addProduct("Iphone 13", "Nueva tecnología en cuanto a móviles", 950, "IMAGEN (url)", "code", 10);
productManager.addProduct("Samsung Galaxy S21", "La competencia del iphone xD", 800, "IMAGEN(url)", "code", 5);

console.log(productManager.getProducts());

const product = productManager.getProductById(1);
console.log(product);
