import { getRepository } from "typeorm";
import { sign } from "jsonwebtoken";
import bcrypt from "bcryptjs";

import authConfig from "../config/auth";
import AppError from "../errors/AppError";
import User from "../models/Users";

interface RequestDTO {
   email: string;
   password: string;
}

interface ResponseDTO {
   user: User;
   webToken: string;
}

class CreateSessionsService {
   // Retorna uma "Promise" do tipo "ResponseDTO"
   // ou seja, um objeto "user" do tipo "User"
   public async execute({ email, password }: RequestDTO): Promise<ResponseDTO> {
      const sessionRepository = getRepository(User);

      // Verifica se encontra usuário no database
      const user = await sessionRepository.findOne({
         where: { email },
      });

      if (!user) {
         throw new AppError("Login / senha inválidos", 401);
      }

      const passwordCheck = await bcrypt.compare(password, user.password);

      if (!passwordCheck) {
         throw new AppError("Login / senha inválidos", 401);
      }

      // https://www.md5online.org/
      // gobarberalexandrerocketseat

      const { secret, expiresIn } = authConfig.jwt;
      // id: payload
      const webToken = sign({}, secret, {
         expiresIn: expiresIn,
         subject: user.id,
      });

      // Usuário autenticado
      return { user, webToken };
   }
}

export default CreateSessionsService;
