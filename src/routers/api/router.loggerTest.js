import express from "express";
import { Router } from "express";

import {loggerTestGet} from "../../controllers/api/logger/controller.get.logger.js";

export const loggerTestRouter = Router();

loggerTestRouter.get("/", loggerTestGet);