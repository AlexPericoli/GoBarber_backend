import { getRepository } from "typeorm";
import path from "path";
import fs from "fs";

import uploadConfig from "../config/upload";
import AppError from "../errors/AppError";

import User from "../models/Users";

interface RequestDTO {
   id_user: string;
   filename: string;
}

class UpdateUserAvatarService {
   // Faz a busca pelo "id" do usuário e retorna o "avatar" atual
   public async execute({ id_user, filename }: RequestDTO): Promise<User> {
      const userRepository = getRepository(User);

      const user = await userRepository.findOne(id_user);

      // Verifica se usuário existe
      if (!user) {
         throw new AppError("Tens que logar", 401);
      }

      // Verifica se o usuário já tem "avatar"
      if (user.avatar) {
         // Caminho até o arquivo
         const userAvatarFilePath = path.join(
            uploadConfig.directory,
            user.avatar
         );

         // Verifica se o arquivo existe
         const userAvatarExists = await fs.promises.stat(userAvatarFilePath);

         // Se o arquivo existir, deleta
         if (userAvatarExists) {
            await fs.promises.unlink(userAvatarFilePath);
         }
      }

      // Atualiza o nome de arquivo do avatar
      user.avatar = filename;

      await userRepository.save(user);

      return user;
   }
}

export default UpdateUserAvatarService;
