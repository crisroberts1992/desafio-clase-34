import { productsRepository } from "../../../repositories/product.repositorie.js";

export async function getProductIdController(req, res, next) {
  try {
    const producto = await productsRepository.findOneById(req.params.pid);
    res.json(producto);
  } catch (error) {
    next(error);
  }
}
