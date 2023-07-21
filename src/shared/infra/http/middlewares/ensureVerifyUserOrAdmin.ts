import { NextFunction, Request, Response } from "express";
import { AppError } from "@shared/errors/AppError";

export default function (request: Request, response: Response, next: NextFunction) {

    const { permission, id } = request.user;
    const { id: user_id } = request.params;

    if (permission !== 'admin' && user_id !== id) {
        throw new AppError("You don't have permission to do this action.", 401);
    }

    next();
}