import { inject, injectable } from "tsyringe";
import ICategoriesRepository from "../repositories/ICategoriesRepository";
import Category from "../infra/typeorm/entities/category";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
    name: string;
}

@injectable()
class CreateCategoryService {
    constructor(
        @inject("CategoriesRepository")
        private categoriesRepository: ICategoriesRepository
    ) { }

    public async execute({ name }: IRequest): Promise<Category> {
        const categoryExists = await this.categoriesRepository.findByName(name);

        if (categoryExists) {
            throw new AppError("Category already exists");
        }

        const category = await this.categoriesRepository.create({ name });

        return category;
    }
}

export default CreateCategoryService;