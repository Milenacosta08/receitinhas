import { Router } from "express";
import CategoriesController from "../controller/CategoriesController";
import { Joi, Segments, celebrate } from "celebrate";
import ensureAuthenticated from "@shared/infra/http/middlewares/ensureAuthenticated";

const categoriesRouter = Router();
const categoriesController = new CategoriesController();

categoriesRouter.post(
    '/',
    ensureAuthenticated,
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required()
        }
    }),
    categoriesController.create
)

categoriesRouter.put(
    '/:id',
    ensureAuthenticated,
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required()
        },
        [Segments.BODY]: {
            name: Joi.string().required()
        }
    }),
    categoriesController.update
)

categoriesRouter.get(
    '/',
    categoriesController.list
)

categoriesRouter.get(
    '/:id',
    ensureAuthenticated,
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required()
        }
    }),
    categoriesController.get
)

categoriesRouter.delete(
    '/:id',
    ensureAuthenticated,
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required()
        }
    }),
    categoriesController.delete
)

export default categoriesRouter;