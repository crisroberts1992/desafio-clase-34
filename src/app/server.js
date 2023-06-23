// Libery
import express from "express";
import { engine } from "express-handlebars";
import { Server as socketIOServer } from "socket.io";
import cors from "cors";
import cookieParser from "cookie-parser";

//root
import { apiRouter } from "../routers/api/router.api.js";
import { viewsRouter } from "../routers/web/router.views.js";

//config
import { PORT } from "../config/config.js";
import { COOKIE_KEY } from "../config/config.js";

//mid
import { apiErrorHandler } from "../mid/error.handler.js";
import { socketFn } from "../mid/soketio.rt.js";
import { socketChat } from "../mid/socketio.chat.js";
import { logger } from '../mid/logger.js';
//utils
import { winstonLogger } from '../utils/logger.js';
//DDBB
import { conectar } from "../dao/mongoose/mongoose.js";

//Auth
import session from "../mid/session.js";
import { passportInitialize } from "../mid/authentication.js";

const app = express();

await conectar();

app.use(cors({ origin: "*" }));
app.use("/public", express.static("public"));
app.use(cookieParser(COOKIE_KEY));
app.use(session);
app.use(passportInitialize);

app.engine("handlebars", engine());
app.set("views", "./views");
app.set("view engine", "handlebars");

app.use("/api", apiRouter);
app.use("/", viewsRouter);
app.use(apiErrorHandler);
app.use(logger);


const httpServer = app.listen(PORT, () => {
  winstonLogger.info(`escuchando en puerto ${PORT}`)
  winstonLogger.info("Path to login view:  http://localhost:8080/");
  winstonLogger.info("Path to Regiter view:  http://localhost:8080/register");
  winstonLogger.info("Path to paginate product view: http://localhost:8080/products?limit=10&page=1");
  winstonLogger.info("Path to cart view: http://localhost:8080/carts/:cid");
  winstonLogger.info("Path to create products: http://localhost:8080/newproducts");
  winstonLogger.info("Path to API-Products: http://localhost:8080/api/products");
});

export const io = new socketIOServer(httpServer);

io.on("connection", async (clientSocket) => {
  console.log(`New connection: ${clientSocket.id}`);
  await socketChat(clientSocket);
  await socketFn();
});
