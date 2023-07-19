import ICreateIngredientDTO from "@modules/recipes/dtos/ICreateIngredientDTO";
import IIngredientsRepository from "@modules/recipes/repositories/IIngredientsRepository";
import Ingredient from "../entities/ingredient";
import { Repository, getRepository } from "typeorm";
import IUpdateIngredientDTO from "@modules/recipes/dtos/IUpdateIngredientDTO";

class IngredientsRepository implements IIngredientsRepository {
    private repository: Repository<Ingredient>;


    constructor() {
        this.repository = getRepository(Ingredient);
    }

    async create(ingredient: ICreateIngredientDTO): Promise<Ingredient> {
        const newIngredient = this.repository.create(ingredient);

        await this.repository.save(newIngredient);

        return newIngredient;
    }

    async createAll(ingredients: ICreateIngredientDTO[]): Promise<Ingredient[]> {
        const newIngredients = this.repository.create(ingredients);

        await this.repository.save(newIngredients);

        return newIngredients;
    }

    async save(ingredient: Ingredient): Promise<Ingredient> {
        return await this.repository.save(ingredient);
    }
    async saveAll(ingredients: IUpdateIngredientDTO[]): Promise<Ingredient[]> {
        return await this.repository.save(ingredients);
    }

    async findByName(name: string): Promise<Ingredient | undefined> {
        return await this.repository.findOne({
            where: {
                name
            }
        });
    }

    async findById(id: string): Promise<Ingredient> {
        return await this.repository.findOne(id);
    }

    async list(): Promise<Ingredient[]> {
        return await this.repository.find();
    }

    async delete(id: string): Promise<void> {
        await this.repository.softDelete(id);
    }

    async deleteAll(ingredients: Ingredient[]): Promise<void> {
        await this.repository.softRemove(ingredients);
    }
}

export default IngredientsRepository;