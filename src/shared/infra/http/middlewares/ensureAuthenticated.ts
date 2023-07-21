import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import auth from '@config/auth';

import { AppError } from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import { container } from 'tsyringe';

interface IPayload {
    sub: string;
}

export default async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization;
    const usersRepository = container.resolve<IUsersRepository>('UsersRepository');

    if (!authHeader) {
        throw new AppError("Token is missing", 401);
    }

    const [, token] = authHeader.split(" ");

    try {
        const { sub: user_id } = verify(token, auth.secret) as IPayload;

        const user_permission = await usersRepository.getPermission(user_id);

        request.user = {
            id: user_id,
            permission: user_permission
        }

        next();
    } catch {
        throw new AppError("Invalid token", 401);
    }
}