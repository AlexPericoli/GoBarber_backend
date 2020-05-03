import { Router } from "express";
import { getCustomRepository } from "typeorm";
import { parseISO } from "date-fns";

import verifyAuth from "../middlewares/verifyAuth";

import AppointmentRepository from "../repositories/AppointmentsRepository";
import CreateAppointmentService from "../services/CreateAppointmentService";

const appointmentsRouter = Router();

// Verificação de Token
appointmentsRouter.use(verifyAuth);

// Programação do tipo SoC - Separation of Concerns
// As rotas devem fazer apenas isso:
// 1- receber a requisição
// 2- chamar outro arquivo
// 3- devolver uma resposta

/////////////
// Rota de listagem
appointmentsRouter.get("/", async (request, response) => {
   const appointmentRepository = getCustomRepository(AppointmentRepository);
   const appointments = await appointmentRepository.find();

   return response.json(appointments);
});

/////////////
// Rota de criação
appointmentsRouter.post("/", async (request, response) => {
   // Receber a requisição
   const { provider_id, date } = request.body;

   const parsedDate = parseISO(date);

   // Chamar outro arquivo
   const createAppointment = new CreateAppointmentService();
   const appointment = await createAppointment.execute({
      provider_id,
      date: parsedDate,
   });

   // Devolver uma resposta
   return response.json(appointment);
});

export default appointmentsRouter;
