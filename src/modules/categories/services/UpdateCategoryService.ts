import { inject, injectable } from "tsyringe";

import Category from "../infra/typeorm/entities/category";
import ICategoriesRepository from "../repositories/ICategoriesRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
    id: string;
    name: string;
}

@injectable()
class UpdateCategoryService {
    constructor(
        @inject('CategoriesRepository')
        private categoriesRepository: ICategoriesRepository
    ) { }

    public async execute({ id, name }: IRequest): Promise<Category> {
        const category = await this.categoriesRepository.findById(id);

        if (!category) {
            throw new AppError('Category not found');
        }

        const categoryUpdated = await this.categoriesRepository.save({
            ...category,
            name
        });

        return categoryUpdated;
    }
}

export default UpdateCategoryService;