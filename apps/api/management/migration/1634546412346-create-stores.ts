import { MigrationInterface, QueryRunner } from 'typeorm'

export class createStores1634546412346 implements MigrationInterface {
  name = 'createStores1634546412346'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "stores" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "imageURL" character varying, "address" character varying NOT NULL, "phone" character varying NOT NULL, "description" character varying, "holidays" text, CONSTRAINT "PK_7aa6e7d71fa7acdd7ca43d7c9cb" PRIMARY KEY ("id"))`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "stores"`)
  }
}
