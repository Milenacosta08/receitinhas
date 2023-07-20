import { inject, injectable } from "tsyringe";
import IUsersRepository from "../repositories/IUsersRepository";
import User from "../infra/typeorm/entities/user";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
    id: string;
    name: string;
    age: number;
    about_me?: string;
    email: string;
    password: string;
    is_admin?: boolean;
}

@injectable()
class UpdateUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) { }

    public async execute({
        id,
        name,
        age,
        about_me,
        email,
        password,
        is_admin
    }: IRequest): Promise<User> {
        const user = await this.usersRepository.findById(id);

        if (!user) {
            throw new AppError('User not found.');
        }

        const userUpdated = await this.usersRepository.save({
            ...user,
            name,
            age,
            about_me,
            email,
            password,
            is_admin
        });

        return userUpdated;
    }
}

export default UpdateUserService;