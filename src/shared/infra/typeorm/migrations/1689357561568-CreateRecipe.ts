import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateRecipe1689357561568 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(
            new Table({
                name: "recipes",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()'
                    },
                    {
                        name: "name",
                        type: "varchar",
                    },
                    {
                        name: "time",
                        type: "varchar"
                    },
                    {
                        name: "steps",
                        type: "varchar"
                    },
                    {
                        name: "rating",
                        type: "integer",
                        isNullable: true
                    }, {
                        name: "category_id",
                        type: "uuid"
                    },
                    {
                        name: "user_id",
                        type: "uuid"
                    },
                    {
                        name: "created_at",
                        type: "timestamptz",
                        default: "now()"
                    },
                    {
                        name: "updated_at",
                        type: "timestamptz",
                        default: "now()"
                    },
                    {
                        name: "deleted_at",
                        type: "timestamptz",
                        isNullable: true
                    }
                ]
            })
        );

        await queryRunner.createForeignKey(
            'recipes',
            new TableForeignKey({
                name: 'RecipeCategory',
                columnNames: ['category_id'],
                referencedTableName: 'categories',
                referencedColumnNames: ['id'],
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            })
        )

        await queryRunner.createForeignKey(
            'recipes',
            new TableForeignKey({
                name: 'RecipeUser',
                columnNames: ['user_id'],
                referencedTableName: 'users',
                referencedColumnNames: ['id'],
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropForeignKey('recipes', 'RecipeCategory');
        await queryRunner.dropForeignKey('recipes', 'RecipeUser');
        await queryRunner.dropTable("recipes");
    }

}
