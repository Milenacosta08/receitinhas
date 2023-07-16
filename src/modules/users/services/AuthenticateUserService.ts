import { inject, injectable } from "tsyringe";
import { sign } from "jsonwebtoken";
import auth from "@config/auth";

import User from "../infra/typeorm/entities/user";

import IUsersRepository from "../repositories/IUsersRepository";
import IHashProvider from "../providers/HashProvider/models/IHashProvider";

import { AppError } from "@shared/errors/AppError";

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: User;
    token: string;
}

@injectable()
class AuthenticateUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
        @inject('HashProvider')
        private hashProvider: IHashProvider
    ) { }

    public async execute({ email, password }: IRequest): Promise<IResponse> {
        const user = await this.usersRepository.findByEmail(email)

        if (!user) {
            throw new AppError('Incorrect name/password combination.', 401)
        }

        const passwordMatched = await this.hashProvider.compareHash(
            password,
            user.password,
        )

        if (!passwordMatched) {
            throw new AppError('Incorrect name/password combination.', 401)
        }

        const { secret, expires_in } = auth;

        const token = sign(
            {
                permission: user.isAdmin ? 'admin' : 'user',
            },
            secret,
            {
                subject: user.id,
                expiresIn: expires_in,
            },
        )

        return { user, token }
    }
}

export default AuthenticateUserService;