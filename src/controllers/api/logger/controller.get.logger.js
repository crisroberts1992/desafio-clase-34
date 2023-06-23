import { loggerTestRepository } from "../../../repositories/loggerTest.repository.js";

export async function handleGet(req, res) {
    const loggerTest = await loggerTestRepository.findOneById(req.params.id);
    return ticket;
  }
  