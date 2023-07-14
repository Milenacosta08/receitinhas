import { inject, injectable } from "tsyringe";

import Category from "../infra/typeorm/entities/category";
import ICategoriesRepository from "../repositories/ICategoriesRepository";

@injectable()
class ListAllCategoriesService {
    constructor(
        @inject('CategoriesRepository')
        private categoriesRepository: ICategoriesRepository
    ) { }

    public async execute(): Promise<Category[]> {
        const categories = await this.categoriesRepository.list();
        return categories;
    }
}

export default ListAllCategoriesService;