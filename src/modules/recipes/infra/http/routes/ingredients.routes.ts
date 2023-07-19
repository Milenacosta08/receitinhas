import { Router } from "express";
import IngredientsController from "../controller/IngredientsController";
import { Joi, Segments, celebrate } from "celebrate";
import ensureAuthenticated from "@shared/infra/http/middlewares/ensureAuthenticated";

const ingredientsRouter = Router();
const ingredientsController = new IngredientsController();

ingredientsRouter.put(
    "/:id",
    ensureAuthenticated,
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required()
        },
        [Segments.BODY]: {
            name: Joi.string().required(),
        }
    }),
    ingredientsController.update
);

ingredientsRouter.get(
    "/",
    ensureAuthenticated,
    ingredientsController.list
);

ingredientsRouter.delete(
    "/:id",
    ensureAuthenticated,
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required()
        }
    }),
    ingredientsController.delete
);

export default ingredientsRouter;