import { Repository, getRepository } from "typeorm";

import Category from "../entities/category";

import ICreateCategoryDTO from "@modules/categories/dtos/ICreateCategoryDTO";
import ICategoriesRepository from "@modules/categories/repositories/ICategoriesRepository";

class CategoriesRepository implements ICategoriesRepository {
    private repository: Repository<Category>;

    constructor() {
        this.repository = getRepository(Category);
    }

    async create(category: ICreateCategoryDTO): Promise<Category> {
        const newCategory = this.repository.create(category);

        await this.repository.save(newCategory);

        return newCategory;
    }

    async save(category: Category): Promise<Category> {
        return await this.repository.save(category);
    }

    async findByName(name: string): Promise<Category | undefined> {
        return await this.repository.findOne({
            where: { name }
        });
    }

    async findById(id: string): Promise<Category | undefined> {
        return await this.repository.findOne({
            where: { id }
        });
    }

    async list(): Promise<Category[]> {
        return await this.repository.find();
    }

    async delete(id: string): Promise<void> {
        await this.repository.softDelete(id);
    }

}

export default CategoriesRepository;