import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUser1689300793503 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'users',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()'
                    },
                    {
                        name: 'name',
                        type: 'varchar'
                    },
                    {
                        name: 'age',
                        type: 'integer'
                    },
                    {
                        name: 'about_me',
                        type: 'varchar',
                        isNullable: true
                    },
                    {
                        name: 'email',
                        type: 'varchar',
                    },
                    {
                        name: 'password',
                        type: 'varchar'
                    },
                    {
                        name: 'is_admin',
                        type: 'boolean',
                        default: false
                    },
                    {
                        name: 'created_at',
                        type: 'timestamptz',
                        default: 'now()'
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamptz',
                        default: 'now()'
                    },
                    {
                        name: 'deleted_at',
                        type: 'timestamptz',
                        isNullable: true
                    }
                ]
            })
        );

        await queryRunner.query(`INSERT INTO users (name, age, is_admin,email, password) VALUES ('Admin', 21, true,'admin@gmail.com', '$2b$10$LztA7uut9PY9p0zZDaqcde9thJ/H/kL3tujel5ixMZs9Cmh5bnuKW')`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM users WHERE email = 'admin@gmail.com')`);
        await queryRunner.dropTable('users');
    }

}
