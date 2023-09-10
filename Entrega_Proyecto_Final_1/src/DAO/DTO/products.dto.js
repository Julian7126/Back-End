export default class ProductDTO {
    constructor(product) {
      this.title = product?.title ?? "Sin titulo";
      this.description = product?.description ?? '';
      this.price = product?.price ?? "Sin Precio";
      this.thumbnail = product?.thumbnail ?? '';
      this.code = product?.code ?? "Sin Codigo";
      this.stock = product?.stock ?? 0;
    }
  }
  