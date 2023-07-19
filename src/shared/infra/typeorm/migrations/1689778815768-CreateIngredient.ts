import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateIngredient1689778815768 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(
            new Table({
                name: "ingredients",
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
                        name: "recipe_id",
                        type: "uuid",
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
            'ingredients',
            new TableForeignKey({
                name: 'ingredientsRecipe',
                columnNames: ['recipe_id'],
                referencedTableName: 'recipes',
                referencedColumnNames: ['id'],
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            }),
        )
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropForeignKey('ingredients', 'ingredientsRecipe');
        await queryRunner.dropTable("ingredients");
    }


}
