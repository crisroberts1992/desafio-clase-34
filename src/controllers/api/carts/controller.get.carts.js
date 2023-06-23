import { cartRepository } from "../../../repositories/cart.repositorie.js";

export async function getCart(req, res, next) {
  try {
    const productosEnCarro = await cartRepository.getProductsInCartById(
      req.params.cid
    );
    console.log(productosEnCarro);
    res.json(productosEnCarro);
  } catch (error) {
    next(error);
  }
}
