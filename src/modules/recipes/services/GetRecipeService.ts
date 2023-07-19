import { inject, injectable } from "tsyringe";
import IRecipesRepository from "../repositories/IRecipesRepository";
import Recipe from "../infra/typeorm/entities/recipe";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
    id: string;
}

@injectable()
class GetRecipeService {
    constructor(
        @inject('RecipesRepository')
        private recipesRepository: IRecipesRepository,
    ) { }

    public async execute({ id }: IRequest): Promise<Recipe> {
        const recipe = await this.recipesRepository.findByIdWithRelations(id);

        if (!recipe) {
            throw new AppError('Recipe not found');
        }

        return recipe;
    }
}

export default GetRecipeService;