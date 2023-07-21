import ICreateUserDTO from "@modules/users/dtos/ICreateUserDTO";
import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import User from "../entities/user";
import { Repository, getRepository } from "typeorm";

class UsersRepository implements IUsersRepository {
    private repository: Repository<User>

    constructor() {
        this.repository = getRepository(User);
    }

    async create(user: ICreateUserDTO): Promise<User> {
        const newUser = this.repository.create(user);

        await this.repository.save(newUser);

        return newUser;
    }

    async save(user: User): Promise<User> {
        return await this.repository.save(user);
    }

    async findById(id: string): Promise<User> {
        return await this.repository.findOne(id);
    }

    async findByEmail(email: string): Promise<User> {
        return await this.repository.findOne({ email });
    }

    async findAll(): Promise<User[]> {
        return await this.repository.find();
    }

    async getPermission(id: string): Promise<string> {
        const user = await this.repository.findOne(id);

        return user.is_admin ? 'admin' : 'user';
    }

    async delete(id: string): Promise<void> {
        await this.repository.softDelete(id);
    }

}

export default UsersRepository;