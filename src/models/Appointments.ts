//const uuid = require("uuid4");
import {
   Entity,
   Column,
   PrimaryGeneratedColumn,
   CreateDateColumn,
   UpdateDateColumn,
   ManyToOne,
   JoinColumn,
} from "typeorm";

import User from "../models/Users";

// Classe passa a fazer parte da tabela "appointments"
@Entity("appointments")
class Appointment {
   @PrimaryGeneratedColumn("uuid")
   id: string;

   @Column()
   provider_id: string;

   @ManyToOne(() => User)
   @JoinColumn({ name: "provider_id" })
   provider: User;

   @Column("timestamp")
   date: Date;

   @CreateDateColumn()
   created_at: Date;

   @UpdateDateColumn()
   updated_at: Date;

   // Pega todos os valores menos o "id"
   /*
   constructor({ provider, date }: Omit<Appointment, "id">) {
      this.id = uuid();
      this.provider = provider;
      this.date = date;
   }
   */
}

export default Appointment;
