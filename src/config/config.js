import * as dotenv from "dotenv";



dotenv.config({
  path: "src/config/.env",
});
const NODE_ENV = process.env.NODE_ENV || 'development'
//server

const PORT = process.env.PORT;

//persitencia
const PERSISTENCIA = process.env.PERSISTENCIA;

const MONGODB_CNX_STR = process.env.MONGODB_CNX_STR;

//auth
const JWT_PRIVATE_KEY = "JWT_PRIVATE";
const COOKIE_KEY = "C00K13_S3CR3T";
const CLIENTID_GIT = "Iv1.1424922ff72e9dd0";
const CLIENTSCR_GIT = "91f081c5fedceece2972c6619cdacfe03bd7a959";
const SESSION_SECRET = "S3SSION_S3CR3T";

//email
const PROD_CONFIG_EMAIL = {
  service: "gmail",
  port: 587,
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
};

const TEST_CONFIG_EMAIL = {
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: process.env.TEST_EMAIL_USER,
    pass: process.env.TEST_EMAIL_PASS,
  },
};

let CONFIG_EMAIL;
if (NODE_ENV === "production") {
  CONFIG_EMAIL = PROD_CONFIG_EMAIL;
} else {
  CONFIG_EMAIL = TEST_CONFIG_EMAIL;
}
//views
const PATH_NEW_PRODUCT = process.env.PATH_NEW_PRODUCT;
const PATH_PRODUCT = process.env.PATH_PRODUCT;
const PATH_CARTS = process.env.PATH_CARTS;
const PATH_LOGIN = process.env.PATH_LOGIN;
const PATH_REGIS = process.env.PATH_REGIS;
const PATH_CHAT = process.env.PATH_CHAT;
const PATH_TICKET = process.env.PATH_TICKET;
const PATH_FORGOT = process.env.PATH_FORGOT;
const PATH_RECOVER = process.env.PATH_RECOVER;

export {
  PORT,
  NODE_ENV,
  PERSISTENCIA,
  MONGODB_CNX_STR,
  COOKIE_KEY,
  JWT_PRIVATE_KEY,
  CLIENTID_GIT,
  CLIENTSCR_GIT,
  SESSION_SECRET,
  PATH_CARTS,
  PATH_LOGIN,
  PATH_NEW_PRODUCT,
  PATH_PRODUCT,
  PATH_REGIS,
  PATH_CHAT,
  PATH_TICKET,
  CONFIG_EMAIL,
  PATH_FORGOT,
  PATH_RECOVER,
};

export const LOG_LEVEL = parseInt(process.env.LOG_LEVEL || '10')
