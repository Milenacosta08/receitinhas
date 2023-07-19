import ICreateRecipeDTO from "../dtos/ICreateRecipeDTO";
import Ingredient from "../infra/typeorm/entities/ingredient";
import Recipe from "../infra/typeorm/entities/recipe";

export default interface IRecipesRepository {
    create(recipe: ICreateRecipeDTO): Promise<Recipe>;
    save(recipe: Recipe): Promise<Recipe>;
    findById(id: string): Promise<Recipe | undefined>;
    findByIdWithRelations(id: string): Promise<Recipe | undefined>;
    getIngredients(idd: string): Promise<Ingredient[]>;
    list(): Promise<Recipe[]>;
    delete(id: string): Promise<void>;
}