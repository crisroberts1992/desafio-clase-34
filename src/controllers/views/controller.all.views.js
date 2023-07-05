import { mmg } from "../../dao/mongoose/messages.dao.mg.js";
import { ticketsRepository } from "../../repositories/ticket.repository.js";
import { productsRepository } from "../../repositories/product.repositorie.js";
import { cartRepository } from "../../repositories/cart.repositorie.js";
import Handlebars from "handlebars";

import {
  PATH_NEW_PRODUCT,
  PATH_PRODUCT,
  PATH_CARTS,
  PATH_LOGIN,
  PATH_REGIS,
  PATH_CHAT,
  PATH_TICKET,
  PATH_FORGOT,
  PATH_RECOVER,
  JWT_PRIVATE_KEY
} from "../../config/config.js";

//helper generado
Handlebars.registerHelper("multiply", function (num1, num2) {
  return num1 * num2;
});

export async function newProductView(req, res, next) {
  try {
    res.render(PATH_NEW_PRODUCT, {
      style: "style-newprod",
      faviconTitle: "Add Products",
      Head: "New Product",
    });
  } catch (error) {
    return next(error.message);
  }
}

export async function productView(req, res) {
  const urlsrt = `http://localhost:8080${req.originalUrl}`;
  const products = await productsRepository.getPaginatedElements(
    req.query,
    urlsrt
  );
  let cartid;
  let usrrole;
  if (req.session.passport) {
    cartid = req.session.passport.user.cart;
    usrrole = req.session.passport.user.role;
  } else {
    cartid = req.user.cart;
    usrrole = req.user.role;
  }

  const validrole = usrrole === "admin" || usrrole === "super-admin" ? 1 : 0;
  const validchat = usrrole === "user" ? 1 : 0;
  res.render(PATH_PRODUCT, {
    role: validrole,
    chat: validchat,
    cart: cartid,
    style: "style-base",
    faviconTitle: "Home",
    list: products,
    listExist: products.payload.length > 0,
  });
}

export async function cartView(req, res) {
  const products = await cartRepository.getProductsInCartById(req.params.cid);
  res.render(PATH_CARTS, {
    style: "style-cart",
    faviconTitle: "Cart",
    Head: "Cart Shopping",
    list: products,
    listExist: products.length > 0,
    cid: req.params.cid,
  });
}

export async function ticketView(req, res) {
  const ticket = await ticketsRepository.findOne({ code: req.params.tid });
  const products = await cartRepository.getProductsInCartById(req.query.cart);
  res.render(PATH_TICKET, {
    style: "style-ticket",
    faviconTitle: "Ticket",
    Head: "Order Success",
    list: products,
    ticket: ticket,
  });
}

export async function loginView(req, res) {
  res.render(PATH_LOGIN, {
    style: "style-login",
    faviconTitle: "Login",
  });
}

export async function regisView(req, res) {
  res.render(PATH_REGIS, {
    style: "style-register",
    faviconTitle: "Regis",
  });
}

export async function chatView(req, res) {
  const mensajes = await mmg.findMsg();
  res.render(PATH_CHAT, {
    faviconTitle: "Chat",
    Head: "Chat",
  });
}

  export async function forgotView(req, res) {
    res.render(PATH_FORGOT, {
      style: "style-forgot",
      faviconTitle: "Forgotten password",
    });
  }
  
  export async function recoverView(req, res) {
    // Verifica el token
    jwt.verify(req.query.token, JWT_PRIVATE_KEY, (err, decoded) => {
      if (err) {
        req.logger.info(err);
        res.redirect("/login");
      } else {
        res.render(PATH_RECOVER, {
          token: req.query.token,
          style: "style-recover",
          faviconTitle: "Forgotten password",
        });
      }
    });
  }
