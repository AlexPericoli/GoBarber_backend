import { startOfHour } from "date-fns";
import { getCustomRepository } from "typeorm";

import AppError from "../errors/AppError";
import Appointment from "../models/Appointments";
import AppointmentRepository from "../repositories/AppointmentsRepository";

interface RequestDTO {
   provider_id: string;
   date: Date;
}

class CreateAppointmentService {
   // RequestDTO = interface
   // Appointment = retorno da function
   public async execute({
      provider_id,
      date,
   }: RequestDTO): Promise<Appointment> {
      const appointmentRepository = getCustomRepository(AppointmentRepository);

      const appointmentDate = startOfHour(date);

      // Verifica se o horário já existe
      const findAppointConflict = await appointmentRepository.findByDate(
         appointmentDate
      );

      if (findAppointConflict) {
         throw new AppError("Horário já reservado");
      }

      // Utiliza a classe Appointment para criar uma nova instância de Appointment
      const appointment = appointmentRepository.create({
         provider_id,
         date: appointmentDate,
      });

      // Salva o agendamento no database
      await appointmentRepository.save(appointment);

      return appointment;
   }
}

export default CreateAppointmentService;
