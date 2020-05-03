//import { isEqual } from "date-fns";
import { EntityRepository, Repository } from "typeorm";

import Appointment from "../models/Appointments";

// DTO - Data Transfer Object

/*interface CreateAppointmentDTO {
   provider: string;
   date: Date;
}
*/

@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> {
   public async findByDate(date: Date): Promise<Appointment | null> {
      /*
      const findAppointment = this.appointments.find((appointment) =>
         isEqual(date, appointment.date)
      );
      */

      // O professor usou o método "findOne"
      const findAppointment = await this.findOne({
         where: { date },
      });

      // const findAppointment = await this.findByDate(date);

      return findAppointment || null;
   }
}

export default AppointmentsRepository;
