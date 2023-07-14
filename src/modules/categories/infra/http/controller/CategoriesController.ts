import CreateCategoryService from "@modules/categories/services/CreateCategoryService";
import DeleteCategoryService from "@modules/categories/services/DeleteCategoryService";
import GetCategoryService from "@modules/categories/services/GetCategoryService";
import ListAllCategoriesService from "@modules/categories/services/ListAllCategoriesService";
import UpdateCategoryService from "@modules/categories/services/UpdateCategoryService";
import { Request, Response } from "express";
import { container } from "tsyringe";

class CategoriesController {

    public async create(request: Request, response: Response): Promise<Response> {
        const { name } = request.body;

        const createCategoryService = container.resolve(CreateCategoryService);

        const category = await createCategoryService.execute({ name });

        return response.status(200).json(category);
    }

    public async update(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const { name } = request.body;

        const updateCategoryService = container.resolve(UpdateCategoryService);

        const category = await updateCategoryService.execute({ id, name });

        return response.status(200).json(category);
    }

    public async list(request: Request, response: Response): Promise<Response> {
        const listAllCategoriesService = container.resolve(ListAllCategoriesService);

        const categories = await listAllCategoriesService.execute();

        return response.status(200).json(categories);
    }

    public async get(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const getCategoryService = container.resolve(GetCategoryService);

        const category = await getCategoryService.execute({ id });

        return response.status(200).json(category);
    }

    public async delete(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const deleteCategoryService = container.resolve(DeleteCategoryService);

        await deleteCategoryService.execute({ id });

        return response.status(204).send();
    }
}

export default CategoriesController;