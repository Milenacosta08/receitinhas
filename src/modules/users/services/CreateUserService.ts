import { inject, injectable } from "tsyringe";
import IUsersRepository from "../repositories/IUsersRepository";
import User from "../infra/typeorm/entities/user";
import { AppError } from "@shared/errors/AppError";
import IHashProvider from "../providers/HashProvider/models/IHashProvider";

interface IRequest {
    name: string;
    age: number;
    about_me?: string;
    email: string;
    password: string;
    is_admin?: boolean;
}

@injectable()
class CreateUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
        @inject('HashProvider')
        private hashProvider: IHashProvider
    ) { }

    public async execute({
        name,
        age,
        about_me,
        email,
        password,
        is_admin = false
    }: IRequest): Promise<User> {
        const userFound = await this.usersRepository.findByEmail(email);

        if (userFound) {
            throw new AppError('Email address already used.');
        }

        const hashedPassword = await this.hashProvider.generateHash(password);

        const user = await this.usersRepository.create({
            name,
            age,
            about_me,
            email,
            password: hashedPassword,
            is_admin
        });

        return user;
    }
}

export default CreateUserService;