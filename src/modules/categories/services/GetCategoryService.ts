import { inject, injectable } from "tsyringe";
import Category from "../infra/typeorm/entities/category";
import ICategoriesRepository from "../repositories/ICategoriesRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
    id: string;
}

@injectable()
class GetCategoryService {
    constructor(
        @inject('CategoriesRepository')
        private categoriesRepository: ICategoriesRepository
    ) { }

    public async execute({ id }: IRequest): Promise<Category> {
        const category = await this.categoriesRepository.findById(id);

        if (!category) {
            throw new AppError('Category not found');
        }

        return category;
    }
}

export default GetCategoryService;