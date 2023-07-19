import { Router } from "express";
import RecipesController from "../controller/RecipesController";
import ensureAuthenticated from "@shared/infra/http/middlewares/ensureAuthenticated";
import { Joi, Segments, celebrate } from "celebrate";

const recipesRouter = Router();
const recipesController = new RecipesController();

recipesRouter.post(
    "/",
    ensureAuthenticated,
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            time: Joi.string().required(),
            steps: Joi.string().required(),
            rating: Joi.number(),
            category_id: Joi.string().uuid().required(),
            user_id: Joi.string().uuid().required(),
            ingredients: Joi.array().items(
                Joi.object().keys({
                    name: Joi.string().required()
                })
            ),
        }
    }),
    recipesController.create
);

recipesRouter.put(
    "/:id",
    ensureAuthenticated,
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required()
        },
        [Segments.BODY]: {
            name: Joi.string().required(),
            time: Joi.string().required(),
            steps: Joi.string().required(),
            rating: Joi.number(),
            category_id: Joi.string().uuid().required(),
            user_id: Joi.string().uuid().required(),
            ingredients: Joi.array().items(
                Joi.object().keys({
                    id: Joi.string().uuid(),
                    name: Joi.string().required()
                })
            ),
        }
    }),
    recipesController.update
);

recipesRouter.get(
    "/",
    ensureAuthenticated,
    recipesController.list
);

recipesRouter.get(
    "/:id",
    ensureAuthenticated,
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required()
        }
    }),
    recipesController.getRecipe
);

recipesRouter.delete(
    "/:id",
    ensureAuthenticated,
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required()
        }
    }),
    recipesController.delete
);

export default recipesRouter;