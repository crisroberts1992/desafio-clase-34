import Products from "../../../models/entities/Products.model.js";
import { socketFn } from "../../../mid/soketio.rt.js";
import { productsRepository } from "../../../repositories/product.repositorie.js";

export async function postProductController(req, res, next) {
  try {
    console.log(req.body);
    const prod = {
      title: req.body.title,
      description: req.body.description,
      price: Number(req.body.price),
      thumbnail: req.body.thumbnail,
      code: req.body.code,
      stock: Number(req.body.stock),
      category: req.body.category,
    };
    console.log(prod);
    const producto = new Products(prod);
    console.log(producto.dto());
    const result = await productsRepository.add(producto.dto());
    await socketFn();
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}
