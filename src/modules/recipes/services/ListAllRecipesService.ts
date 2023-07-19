import { inject, injectable } from "tsyringe";
import IRecipesRepository from "../repositories/IRecipesRepository";
import Recipe from "../infra/typeorm/entities/recipe";

@injectable()
class ListAllRecipesService {
    constructor(
        @inject('RecipesRepository')
        private recipesRepository: IRecipesRepository,
    ) { }

    public async execute(): Promise<Recipe[]> {
        const recipes = await this.recipesRepository.list();

        return recipes;
    }
}

export default ListAllRecipesService;