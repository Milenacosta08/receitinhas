import { inject, injectable } from "tsyringe";
import ICategoriesRepository from "../repositories/ICategoriesRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
    id: string
}

@injectable()
class DeleteCategoryService {
    constructor(
        @inject('CategoriesRepository')
        private categoriesRepository: ICategoriesRepository
    ) { }

    public async execute({ id }: IRequest): Promise<void> {
        const category = await this.categoriesRepository.findById(id);

        if (!category) {
            throw new AppError('Category not found');
        }

        await this.categoriesRepository.delete(id);
    }
}

export default DeleteCategoryService;