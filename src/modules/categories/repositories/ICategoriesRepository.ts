import ICreateCategoryDTO from "../dtos/ICreateCategoryDTO";
import Category from "../infra/typeorm/entities/category";

export default interface ICategoriesRepository {
    create(category: ICreateCategoryDTO): Promise<Category>;
    save(category: Category): Promise<Category>;
    findByName(name: string): Promise<Category | undefined>;
    findById(id: string): Promise<Category | undefined>;
    list(): Promise<Category[]>;
    delete(id: string): Promise<void>;
}