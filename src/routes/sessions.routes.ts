import { Router } from "express";

import CreateSessionsService from "../services/CreateSessionsService";

const sessionsRouter = Router();

// Programação do tipo SoC - Separation of Concerns
// As rotas devem fazer apenas isso:
// 1- receber a requisição
// 2- chamar outro arquivo
// 3- devolver uma resposta

sessionsRouter.post("/", async (request, response) => {
   const { email, password } = request.body;

   const createSession = new CreateSessionsService();

   const { user, webToken } = await createSession.execute({
      email,
      password,
   });

   delete user.password;

   return response.json({ user, webToken });
});

export default sessionsRouter;
