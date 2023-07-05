import { PERSISTENCIA } from "../config/config.js";
import { winstonLogger as logger } from "../utils/logger.js";

let userDao;
let productDao;
let cartDao;
let ticketDao;


if (PERSISTENCIA === "mongoose"){
  logger.info("Persistencia elegida: mongoose")
  const { umg } = await import("./mongoose/users.dao.mg.js");
  userDao = umg;
  const { pmg } = await import("./mongoose/product.dao.mg.js");
  productDao = pmg;
  const { cmg } = await import("./mongoose/cart.dao.mg.js");
  cartDao = cmg;
  const { tmg } = await import("./mongoose/ticket.dao.mg.js");
  ticketDao = tmg;
 
} else {
  logger.info("Persistencia elegida: fs")
  const { um } = await import("./fs/users.manager.fs.js");
  userDao = um;
  const { pm } = await import("./fs/product.manager.fs.js");
  productDao = pm;
  const { tm } = await import("./fs/ticket.manager.fs.js");
  ticketDao = tm;
}

export { userDao, productDao, cartDao, ticketDao };
