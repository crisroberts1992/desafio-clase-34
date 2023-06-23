import { userRepository } from "../../../repositories/users.repository.js";
//import { logger } from "../../../utils/logger.js";

export async function getUsersController(req, res, next) {
  req.logger.http('entré al get de usuarios')
  const users = await userRepository.findMany();
  res.json(users);
}
