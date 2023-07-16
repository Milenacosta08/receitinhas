import { Router } from "express";
import UsersController from "../controller/UsersController";
import { Joi, Segments, celebrate } from "celebrate";
import ensureAuthenticated from "@shared/infra/http/middlewares/ensureAuthenticated";

const usersRouter = Router()
const usersController = new UsersController()

usersRouter.post(
    '/authenticate',
    celebrate({
        [Segments.BODY]: {
            email: Joi.string().email().required(),
            password: Joi.string().required()
        }
    }),
    usersController.authenticate
);

usersRouter.post(
    '/',
    ensureAuthenticated,
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            age: Joi.number().required(),
            about_me: Joi.string(),
            email: Joi.string().email().required(),
            password: Joi.string().required(),
            isAdmin: Joi.boolean().optional()
        }
    }),
    usersController.create
);

usersRouter.put(
    '/:id',
    ensureAuthenticated,
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required()
        },
        [Segments.BODY]: {
            name: Joi.string().required(),
            age: Joi.number().required(),
            about_me: Joi.string(),
            email: Joi.string().email().required(),
            password: Joi.string().required(),
            isAdmin: Joi.boolean().optional()
        }
    }),
    usersController.update
);

usersRouter.get(
    "/",
    ensureAuthenticated,
    usersController.list
);

usersRouter.get(
    "/:id",
    ensureAuthenticated,
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required()
        }
    }),
    usersController.get
);

usersRouter.delete(
    "/:id",
    ensureAuthenticated,
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required()
        }
    }),
    usersController.delete
);

export default usersRouter;