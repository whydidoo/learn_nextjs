import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1679224718963 implements MigrationInterface {
    name = 'Migrations1679224718963'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "books" ("_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "author" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_b8b10d418e2873b429409b0b358" PRIMARY KEY ("_id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "password" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_46c438e5a956fb9c3e86e73e321" PRIMARY KEY ("_id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "books"`);
    }

}
