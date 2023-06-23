import { cartRepository } from "../../../repositories/cart.repositorie.js";

export async function putCart(req, res, next) {
  try {
    const productosEnCarro = await cartRepository.updateCart(
      req.params.cid,
      req.body
    );
    res.json(productosEnCarro);
  } catch (error) {
    next(error);
  }
}
