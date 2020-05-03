import {
   Entity,
   Column,
   PrimaryGeneratedColumn,
   CreateDateColumn,
   UpdateDateColumn,
} from "typeorm";
// Chave estrangeira
// ALTER TABLE `appointments` ADD CONSTRAINT `fk_provider` FOREIGN KEY ( `provider_id` )
// REFERENCES `users` ( `id` );

@Entity("users")
class Users {
   @PrimaryGeneratedColumn("uuid")
   id: string;

   @Column()
   name: string;

   @Column()
   email: string;

   @Column()
   password: string;

   @Column()
   avatar: string;

   @CreateDateColumn()
   created_at: Date;

   @UpdateDateColumn()
   updated_at: Date;
}

export default Users;
