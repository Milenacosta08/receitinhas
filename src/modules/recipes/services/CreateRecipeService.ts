import { inject, injectable } from "tsyringe";
import IRecipesRepository from "../repositories/IRecipesRepository";
import Recipe from "../infra/typeorm/entities/recipe";

interface IRequest {
    name: string;
    time: string;
    steps: string;
    rating?: number;
    category_id: string;
    user_id: string;
    ingredients: {
        name: string;
        quantity: string;
    }[]
}

@injectable()
class CreateRecipeService {
    constructor(
        @inject('RecipesRepository')
        private recipesRepository: IRecipesRepository,
    ) { }

    public async execute({
        name,
        time,
        steps,
        rating,
        category_id,
        user_id,
        ingredients
    }: IRequest): Promise<Recipe> {
        const recipe = await this.recipesRepository.create({
            name,
            time,
            steps,
            rating,
            category_id,
            user_id,
            ingredients
        });

        return recipe;
    }
}

export default CreateRecipeService;