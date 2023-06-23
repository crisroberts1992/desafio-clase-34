import mongoose from "mongoose";
import { MONGODB_CNX_STR } from "../../config/config.js";
import { winstonLogger as logger } from '../../utils/logger.js'

export async function conectar() {
  if (MONGODB_CNX_STR) {
    await mongoose.connect(MONGODB_CNX_STR);
  }

  logger.info(`conectado a mongodb en ${MONGODB_CNX_STR}`)
}
