import { NODE_ENV, LOG_LEVEL } from '../config/config.js'
import fs from 'fs/promises'

class Logger {
  constructor(entorno, nivelDeImportancia) {
    this.entorno = entorno
    this.nivelDeImportancia = nivelDeImportancia
  }

  log(nivel, mensaje) {
    if (nivel <= this.nivelDeImportancia) {
      const lineaRegistro = `${new Date().toLocaleString()}: ${mensaje}` + '\n'
      if (this.entorno === 'development') {
        console.log(lineaRegistro)
      } else {
        fs.appendFile('eventos.log', lineaRegistro)
      }
    }
  }
}

export const logger = new Logger(NODE_ENV, LOG_LEVEL)

// -----------------------------------

import winston from 'winston'



 const levels = {
     fatal: 0,
     error: 1,
     warning: 2,
     info: 3,
     http: 4,
     debug: 5,
 }

const winstonLoggerDev = winston.createLogger({
  levels:levels,
  transports: [
    new winston.transports.Console({
      level: "debug",
    })
  ]
})

const winstonLoggerProd = winston.createLogger({
   levels:levels,
  transports: [
    new winston.transports.Console({
        level: "info",
      }),
    new winston.transports.File({
      level: "error",
      filename: 'errors.log'
    })
  ]
})

export let winstonLogger
if (NODE_ENV === 'production') {
  winstonLogger = winstonLoggerProd
} else {
  winstonLogger = winstonLoggerDev
}