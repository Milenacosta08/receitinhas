import { inject, injectable } from "tsyringe";
import IRecipesRepository from "../repositories/IRecipesRepository";
import Recipe from "../infra/typeorm/entities/recipe";
import { AppError } from "@shared/errors/AppError";
import IIngredientsRepository from "../repositories/IIngredientsRepository";
import Ingredient from "../infra/typeorm/entities/ingredient";

interface IRequest {
    id: string;
    name: string;
    time: string;
    steps: string;
    rating: number;
    category_id: string;
    user_id: string;
    ingredients: [{
        id?: string,
        name: string;
    }]
}

@injectable()
class UpdateRecipeService {
    constructor(
        @inject('RecipesRepository')
        private recipesRepository: IRecipesRepository,
        @inject('IngredientsRepository')
        private ingredientsRepository: IIngredientsRepository
    ) { }

    public async execute({
        id,
        name,
        time,
        steps,
        rating,
        category_id,
        user_id,
        ingredients
    }: IRequest): Promise<Recipe> {
        const recipe = await this.recipesRepository.findByIdWithRelations(id)

        if (!recipe) {
            throw new AppError('Recipe not found')
        }

        const existentsIngredients = ingredients.filter((ingredient) => ingredient.id !== undefined);

        const ingredientsToDelete = recipe.ingredients.filter(
            (ingredient) => !existentsIngredients.find((ingredientFind) => ingredientFind.id === ingredient.id),
        );

        await this.ingredientsRepository.deleteAll(ingredientsToDelete);

        const ingredientsToUpdate = existentsIngredients.filter(
            ingredient => !ingredientsToDelete.find(ingredientToDelete => ingredientToDelete.id === ingredient.id)
        );

        const newIngredients = ingredients.filter((ingredient) => ingredient.id === undefined);

        const newIngredientsFormatted = newIngredients.map((ingredient) => {
            return {
                name: ingredient.name,
                recipe_id: recipe.id
            }
        });

        const recipeUpdated = await this.recipesRepository.save({
            ...recipe,
            name,
            time,
            steps,
            category_id,
            user_id,
            rating,
            ingredients: [...ingredientsToUpdate, ...newIngredientsFormatted] as Ingredient[]
        });

        return recipeUpdated;
    }
}

export default UpdateRecipeService;