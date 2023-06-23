import { Router } from "express";

import {
  handleGet,
  
} from "../../controllers/api/tickets/controller.all.ticket.js";

export const loggerTestRouter = Router();

loggerTestRouter.get("/:id?", handleGet);
