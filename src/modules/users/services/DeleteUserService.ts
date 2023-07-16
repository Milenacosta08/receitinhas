import { inject, injectable } from "tsyringe";
import IUsersRepository from "../repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
    id: string;
}

@injectable()
class DeleteUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository
    ) { }

    public async execute({ id }: IRequest): Promise<void> {
        const user = await this.usersRepository.findById(id);

        if (!user) {
            throw new AppError('User not found');
        }

        await this.usersRepository.delete(id);
    }
}

export default DeleteUserService;