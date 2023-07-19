import { inject, injectable } from "tsyringe";
import IIngredientsRepository from "../repositories/IIngredientsRepository";
import Ingredient from "../infra/typeorm/entities/ingredient";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
    id: string;
    name: string;
}

@injectable()
class UpdateIngredientService {
    constructor(
        @inject('IngredientsRepository')
        private ingredientsRepository: IIngredientsRepository
    ) { }

    public async execute({
        id,
        name
    }: IRequest): Promise<Ingredient> {
        const ingredientFound = await this.ingredientsRepository.findById(id);

        if (!ingredientFound) {
            throw new AppError('Ingredient not found');
        }

        const ingredient = await this.ingredientsRepository.save({
            ...ingredientFound,
            name
        });

        return ingredient;
    }
}

export default UpdateIngredientService;