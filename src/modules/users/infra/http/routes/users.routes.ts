import { Router } from "express";
import { Joi, Segments, celebrate } from "celebrate";
import multer from "multer";

import uploadConfig from "@config/uploadConfig";

import ensureAuthenticated from "@shared/infra/http/middlewares/ensureAuthenticated";
import ensureVerifyUser from "@shared/infra/http/middlewares/ensureVerifyUser";
import ensureVerifyUserOrAdmin from "@shared/infra/http/middlewares/ensureVerifyUserOrAdmin";

import UsersController from "../controller/UsersController";

const usersRouter = Router()
const usersController = new UsersController()

const uploadAvatar = multer(uploadConfig.upload("./tmp"));

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
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            age: Joi.number().required(),
            about_me: Joi.string(),
            email: Joi.string().email().required(),
            password: Joi.string().required(),
            is_admin: Joi.boolean().optional()
        }
    }),
    usersController.create
);

usersRouter.put(
    '/:id',
    ensureAuthenticated,
    ensureVerifyUser,
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
            is_admin: Joi.boolean().optional()
        }
    }),
    usersController.update
);

usersRouter.patch(
    '/avatar/:id',
    ensureAuthenticated,
    ensureVerifyUser,
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required()
        }
    }),
    uploadAvatar.single("avatar"),
    usersController.updateAvatar
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
    ensureVerifyUserOrAdmin,
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required()
        }
    }),
    usersController.delete
);

export default usersRouter;