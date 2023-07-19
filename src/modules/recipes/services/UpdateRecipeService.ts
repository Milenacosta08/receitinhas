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
        const recipe = await this.recipesRepository.findById(id);

        if (!recipe) {
            throw new AppError('Recipe not found');
        }

        const ingredientsRecipe = await this.recipesRepository.getIngredients(id);

        const existentsIngredients = ingredients.filter((ingredient) => ingredient.id !== undefined);

        const ingredientsToDelete = ingredientsRecipe.filter(
            (ingredient) => !existentsIngredients.find((ingredientFind) => ingredientFind.id === ingredient.id),
        );
        console.log("ingredientsToDelete", ingredientsToDelete);

        await this.ingredientsRepository.deleteAll(ingredientsToDelete);

        const ingredientsToUpdate = existentsIngredients.filter(
            ingredient => !ingredientsToDelete.find(ingredientToDelete => ingredientToDelete.id === ingredient.id)
        );
        console.log("ingredientsToUpdate", ingredientsToUpdate);
        const newIngredients = ingredients.filter((ingredient) => ingredient.id === undefined);

        const newIngredientsFormatted = newIngredients.map((ingredient) => {
            return {
                name: ingredient.name,
                recipe_id: recipe.id
            }
        });
        console.log("newIngredientsFormatted", newIngredientsFormatted)

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

        console.log("recipeUpdated", recipeUpdated)

        return recipeUpdated;
    }
}

export default UpdateRecipeService;