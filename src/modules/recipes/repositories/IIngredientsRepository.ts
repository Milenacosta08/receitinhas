import ICreateIngredientDTO from "../dtos/ICreateIngredientDTO";
import IUpdateIngredientDTO from "../dtos/IUpdateIngredientDTO";
import Ingredient from "../infra/typeorm/entities/ingredient";

export default interface IIngredientsRepository {
    create(ingredient: ICreateIngredientDTO): Promise<Ingredient>;
    createAll(ingredients: ICreateIngredientDTO[]): Promise<Ingredient[]>
    save(ingredient: Ingredient): Promise<Ingredient>;
    saveAll(ingredients: IUpdateIngredientDTO[]): Promise<Ingredient[]>
    findByName(name: string): Promise<Ingredient | undefined>;
    findById(id: string): Promise<Ingredient | undefined>;
    list(): Promise<Ingredient[]>;
    delete(id: string): Promise<void>;
    deleteAll(ingredients: Ingredient[]): Promise<void>
}