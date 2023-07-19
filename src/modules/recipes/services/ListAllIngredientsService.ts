import { inject, injectable } from "tsyringe";
import IIngredientsRepository from "../repositories/IIngredientsRepository";
import Ingredient from "../infra/typeorm/entities/ingredient";

@injectable()
class ListAllIngredientsService {
    constructor(
        @inject('IngredientsRepository')
        private ingredientsRepository: IIngredientsRepository
    ) { }

    public async execute(): Promise<Ingredient[]> {
        const ingredients = await this.ingredientsRepository.list();

        return ingredients;
    }
}

export default ListAllIngredientsService;