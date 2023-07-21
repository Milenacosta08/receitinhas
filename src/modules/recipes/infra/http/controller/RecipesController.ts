import { container } from 'tsyringe';
import { Request, Response } from 'express';
import CreateRecipeService from '@modules/recipes/services/CreateRecipeService';
import ListAllRecipesService from '@modules/recipes/services/ListAllRecipesService';
import GetRecipeService from '@modules/recipes/services/GetRecipeService';
import UpdateRecipeService from '@modules/recipes/services/UpdateRecipeService';
import DeleteRecipeService from '@modules/recipes/services/DeleteRecipeService';

class RecipesController {
    public async create(request: Request, response: Response): Promise<Response> {
        const { name, time, steps, rating, category_id, user_id, ingredients } = request.body;

        const createRecipeService = container.resolve(CreateRecipeService);

        const recipe = await createRecipeService.execute({
            name,
            time,
            steps,
            rating,
            category_id,
            user_id,
            ingredients
        });

        return response.status(201).json(recipe);
    }

    public async update(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const { name, time, steps, rating, category_id, user_id, ingredients } = request.body;

        const updateRecipeService = container.resolve(UpdateRecipeService);

        const recipe = await updateRecipeService.execute({
            id,
            name,
            time,
            steps,
            rating,
            category_id,
            user_id,
            ingredients
        });

        return response.status(200).json(recipe);
    }

    public async list(request: Request, response: Response): Promise<Response> {
        const listAllRecipesService = container.resolve(ListAllRecipesService);

        const recipes = await listAllRecipesService.execute();

        return response.status(200).json(recipes);
    }

    public async getRecipe(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const getRecipeService = container.resolve(GetRecipeService);

        const recipe = await getRecipeService.execute({ id });

        return response.status(200).json(recipe);
    }

    public async delete(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const deleteRecipeService = container.resolve(DeleteRecipeService);

        await deleteRecipeService.execute({ id });

        return response.status(204).send();
    }
}

export default RecipesController;