import { AppError } from "@shared/errors/AppError";
import { NextFunction, Request, Response } from "express";


// verificar se user logado pode alterar os dados de outro user
export default function ensureVerifyUser(request: Request, response: Response, next: NextFunction) {
    const { id: user_id } = request.params;
    const { id } = request.user;

    if (id !== user_id) {
        throw new AppError("You don't have permission to do this action.", 401);
    }

    next();
}