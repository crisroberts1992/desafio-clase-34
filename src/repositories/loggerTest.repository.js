import { loggerTestDao } from "../dao/index.js";
import { DefaultRepository } from "./DefaultRepository.js";

export const loggerTestRepository = new DefaultRepository(loggerTestDao);