import ICreateRecipeDTO from "@modules/recipes/dtos/ICreateRecipeDTO";
import IRecipesRepository from "@modules/recipes/repositories/IRecipesRepository";
import Ingredient from "../entities/ingredient";
import Recipe from "../entities/recipe";
import { Repository, getRepository } from "typeorm";

class RecipesRepository implements IRecipesRepository {
    private repository: Repository<Recipe>;

    constructor() {
        this.repository = getRepository(Recipe);
    }

    async create(recipe: ICreateRecipeDTO): Promise<Recipe> {
        const newRecipe = this.repository.create(recipe);

        await this.repository.save(newRecipe);

        return newRecipe;
    }

    async save(recipe: Recipe): Promise<Recipe> {
        return await this.repository.save(recipe);
    }

    async findById(id: string): Promise<Recipe | undefined> {
        return await this.repository.findOne(id);
    }

    async findByIdWithRelations(id: string): Promise<Recipe | undefined> {
        return await this.repository.findOne(id, {
            relations: ['ingredients']
        });
    }

    async getIngredients(id: string): Promise<Ingredient[]> {
        const recipe = await this.repository.findOne(id, { relations: ['ingredients'] });

        return recipe.ingredients;
    }

    async list(): Promise<Recipe[]> {
        return await this.repository.find();
    }

    async delete(id: string): Promise<void> {
        await this.repository.softDelete(id);
    }

}

export default RecipesRepository;