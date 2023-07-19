import { inject, injectable } from "tsyringe";
import IIngredientsRepository from "../repositories/IIngredientsRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
    id: string;
}

@injectable()
class DeleteIngredientService {
    constructor(
        @inject('IngredientsRepository')
        private ingredientsRepository: IIngredientsRepository
    ) { }

    public async execute({ id }: IRequest): Promise<void> {
        const ingredientFound = await this.ingredientsRepository.findById(id);

        if (!ingredientFound) {
            throw new AppError('Ingredient not found');
        }

        await this.ingredientsRepository.delete(id);
    }
}

export default DeleteIngredientService;