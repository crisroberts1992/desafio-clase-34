import { encriptarJWT } from "../../../utils/cripto.js";
import { userService } from "../../../services/users.service.js";
import { emailService } from "../../../services/email.service.js";

/*export async function postUsuarios(req, res, next) {
  try {
    const userCreated = await userService.registrar(req.body);
    req.session.user = userCreated;
    res.cookie("jwt_authorization", encriptarJWT(userCreated), {
      signed: true,
      httpOnly: true,
    });

    res.status(201).json(userCreated);
  } catch (error) {
    next(error);
  }
}*/
export async function postUsuarios(req, res, next) {
  req.logger.http("inside post user");
  try {
    const userCreated = await userService.registrar(req.body);
    req.session.user = userCreated;
    res.cookie("jwt_authorization", encriptarJWT(userCreated), {
      signed: true,
      httpOnly: true,
    });
    const mailData = {
      subject: "Bienvenido al club de la camiseta",
      mensaje: `Hola,\n\n
        Gracias por elegirnos, nos enorgullese que formes parte de nuestra familia.Tu usuario ya se encuentra creado, que disfrutres tu pase por nuestra tienda virtual\n\n
        Saludos,\n
        El club de la camiseta`,
    };
    await emailService.send(userCreated.email, mailData);

    res.status(201).json(userCreated);
  } catch (error) {
    req.logger.error(`post user fail ${error.message}`);
    next(error);
  }
}