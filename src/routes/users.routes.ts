import { Router } from "express";
import verifyAuth from "../middlewares/verifyAuth";
import multer from "multer";
import uploadConfig from "../config/upload";

import CreateUserService from "../services/CreateUserService";
import UpdateUserAvatarService from "../services/UpdateUserAvatarService";

const usersRouter = Router();
const upload = multer(uploadConfig);

// Programação do tipo SoC - Separation of Concerns
// As rotas devem fazer apenas isso:
// 1- receber a requisição
// 2- chamar outro arquivo
// 3- devolver uma resposta

/////////////
// Criação de usuário
usersRouter.post("/", async (request, response) => {
   const { name, email, password } = request.body;

   const createUser = new CreateUserService();

   const user = await createUser.execute({
      name,
      email,
      password,
   });

   // Remove a informação "password" do objeto "user"
   delete user.password;

   return response.json(user);
});

// Verificação de Token
usersRouter.use(verifyAuth);

/////////////
// Atualizar avatar
usersRouter.patch(
   "/avatar",
   upload.single("avatar"),
   async (request, response) => {
      // Instância da classe "UpdateUserAvatarService"
      const updateUserAvatar = new UpdateUserAvatarService();

      const user = await updateUserAvatar.execute({
         id_user: request.user.id,
         filename: request.file.filename,
      });

      // Remove o item "password" de "user"
      delete user.password;

      return response.json(user);
   }
);

export default usersRouter;
