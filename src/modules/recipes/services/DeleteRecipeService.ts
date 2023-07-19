import { inject, injectable } from "tsyringe";
import IRecipesRepository from "../repositories/IRecipesRepository";
import IIngredientsRepository from "../repositories/IIngredientsRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
    id: string;
}

@injectable()
class DeleteRecipeService {
    constructor(
        @inject('RecipesRepository')
        private recipesRepository: IRecipesRepository,
        @inject('IngredientsRepository')
        private ingredientsRepository: IIngredientsRepository,
    ) { }

    public async execute({ id }: IRequest): Promise<void> {
        const recipe = await this.recipesRepository.findById(id);

        if (!recipe) {
            throw new AppError('Recipe not found');
        }

        const ingredientsRecipe = await this.recipesRepository.getIngredients(id);

        await this.ingredientsRepository.deleteAll(ingredientsRecipe);

        await this.recipesRepository.delete(id);
    }
}

export default DeleteRecipeService;