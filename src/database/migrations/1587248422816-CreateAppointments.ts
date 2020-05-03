import {
   MigrationInterface,
   QueryRunner,
   Table,
   TableForeignKey,
} from "typeorm";

export class CreateAppointments1587248422816 implements MigrationInterface {
   public async up(queryRunner: QueryRunner): Promise<any> {
      await queryRunner.createTable(
         new Table({
            name: "appointments",
            columns: [
               {
                  name: "id",
                  type: "varchar",
                  isPrimary: true,
                  generationStrategy: "uuid",
               },
               {
                  name: "provider_id",
                  type: "varchar",
               },
               {
                  name: "date",
                  type: "timestamp",
                  isNullable: false,
               },
               {
                  name: "created_at",
                  type: "timestamp",
                  default: "now()",
               },
               {
                  name: "updated_at",
                  type: "timestamp",
                  default: "now()",
               },
            ],
         })
      );

      /*
      const foreignKey = new TableForeignKey({
         columnNames: ["provider_id"],
         referencedColumnNames: ["id"],
         referencedTableName: "users",
      });
      await queryRunner.createForeignKey("appointments", foreignKey);

      await queryRunner.createForeignKey(
         "appointments",
         new TableForeignKey({
            columnNames: ["provider_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "users",
         })
      );
      */
   }

   public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable("appointments");
   }
}
