import { inject, injectable } from "tsyringe";
import IUsersRepository from "../repositories/IUsersRepository";
import User from "../infra/typeorm/entities/user";

@injectable()
class ListAllUsersService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) { }

    public async execute(): Promise<User[]> {
        const users = await this.usersRepository.findAll();

        return users;
    }
}

export default ListAllUsersService;