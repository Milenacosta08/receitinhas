import DeleteIngredientService from "@modules/recipes/services/DeleteIngredientService";
import ListAllIngredientsService from "@modules/recipes/services/ListAllIngredientsService";
import UpdateIngredientService from "@modules/recipes/services/UpdateIngredientService";
import { Request, Response } from "express";
import { container } from "tsyringe";

class IngredientsController {

    public async update(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const { name } = request.body;

        const updateIngredientService = container.resolve(UpdateIngredientService);

        const ingredient = await updateIngredientService.execute({
            id,
            name,
        });

        return response.status(200).json(ingredient);
    }

    public async list(request: Request, response: Response): Promise<Response> {
        const listIngredientsService = container.resolve(ListAllIngredientsService);

        const ingredients = await listIngredientsService.execute();

        return response.status(200).json(ingredients);
    }

    public async delete(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const deleteIngredientService = container.resolve(DeleteIngredientService);

        await deleteIngredientService.execute({
            id
        });

        return response.status(204).send();
    }
}

export default IngredientsController;