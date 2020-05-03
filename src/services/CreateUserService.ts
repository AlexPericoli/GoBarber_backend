import { getRepository } from "typeorm";
import { hash } from "bcryptjs";

import AppError from "../errors/AppError";
import User from "../models/Users";

interface RequestDTO {
   name: string;
   email: string;
   password: string;
}

class CreateUserSevice {
   public async execute({ name, email, password }: RequestDTO): Promise<User> {
      const userRepository = getRepository(User);

      // Verifica se email já existe no database
      const checkUserExists = await userRepository.findOne({
         where: { email },
      });

      if (checkUserExists) {
         throw new AppError("Este email já existe");
      }

      const hashedPassword = await hash(password, 8);

      const user = userRepository.create({
         name,
         email,
         password: hashedPassword,
      });

      await userRepository.save(user);

      return user;
   }
}

export default CreateUserSevice;
