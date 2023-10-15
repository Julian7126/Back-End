import fs from "fs";
import { generateMock } from "../../utils.js";

export default class ViewsFile {
  constructor() {
    this.productsFile = "products.json";
    this.cartsFile = "carts.json";
    this.messagesFile = "messages.json";

    this.initializeFiles();
  }

  initializeFiles() {
    this.initializeFile(this.productsFile);
    this.initializeFile(this.cartsFile);
    this.initializeFile(this.messagesFile);
  }

  initializeFile(filename) {
    if (!fs.existsSync(filename)) {
      fs.writeFileSync(filename, "[]");
    }
  }

  async getProductos() {
    return await this.readFile(this.productsFile);
  }
  get = async (filename) => {
    return this.readFile(filename);
  };

  readFile = async (filename) => {
    const data = await fs.promises.readFile(filename, { encoding: "utf-8" });
    return JSON.parse(data);
  };

  writeFile = async (filename, data) => {
    await fs.promises.writeFile(filename, JSON.stringify(data, null, 2));
  };

  async getList(request) {
    const products = await this.getProductos();

    let page = parseInt(request.query?.page || 1);
    let limit = parseInt(request.query?.limit || 10);
    const queryParams = request.query?.query || "";
    const sortParam = request.query?.sort || "";

    const query = {};
    if (queryParams) {
      const field = queryParams.split(",")[0];
      let value = queryParams.split(",")[1];

      if (!isNaN(parseInt(value))) value = parseInt(value);
      query[field] = value;
    }

    const sort = {};
    if (sortParam === "asc" || sortParam === "desc") {
      sort["price"] = sortParam === "asc" ? 1 : -1;
    }

    const totalDocs = products.filter((product) => {
      for (const key in query) {
        if (product[key] !== query[key]) {
          return false;
        }
      }
      return true;
    }).length;

    const totalPages = Math.ceil(totalDocs / limit);

    if (page > totalPages) {
      page = totalPages;
    }

    const result = products
      .filter((product) => {
        for (const key in query) {
          if (product[key] !== query[key]) {
            return false;
          }
        }
        return true;
      })
      .sort((a, b) => {
        if (sortParam === "asc") {
          return a.price - b.price;
        } else if (sortParam === "desc") {
          return b.price - a.price;
        }
      })
      .slice((page - 1) * limit, page * limit);

    const hasPrevPage = page > 1;
    const hasNextPage = page < totalPages;
    const prevLink = hasPrevPage
      ? `/list?limit=${limit}&page=${page - 1}`
      : null;
    const nextLink = hasNextPage
      ? `/list?limit=${limit}&page=${page + 1}`
      : null;

    return {
      status: "success",
      payload: result,
      totalPages,
      prevPage: page - 1,
      nextPage: page + 1,
      page,
      hasPrevPage,
      hasNextPage,
      prevLink,
      nextLink,
    };
  }

  async getProductoById(id) {
    const products = await this.getProductos();
    return products.find((product) => product._id === id);
  }

  async getChat() {
    return await this.readFile(this.messagesFile);
  }

  async getCarts() {
    return await this.readFile(this.cartsFile);
  }

  async getCartById(id) {
    const carts = await this.getCarts();
    return carts.find((cart) => cart._id === id);
  }

  async getMockProductos() {
    const mockData = generateMock();
    return mockData;
  }
}
