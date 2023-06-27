import { loggerTestRepository } from "../../../repositories/loggerTest.repository.js";

export async function loggerTestGet(req, res) {
    const loggerTest = await loggerTestRepository.findMany();
    res.json(loggerTest);
  }
  