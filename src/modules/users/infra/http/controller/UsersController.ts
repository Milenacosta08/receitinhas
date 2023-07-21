import { container } from "tsyringe";
import { Request, Response } from 'express';
import CreateUserService from "@modules/users/services/CreateUserService";
import UpdateUserService from "@modules/users/services/UpdateUserService";
import ListAllUsersService from "@modules/users/services/ListAllUsersService";
import GetUserService from "@modules/users/services/GetUserService";
import DeleteUserService from "@modules/users/services/DeleteUserService";
import AuthenticateUserService from "@modules/users/services/AuthenticateUserService";
import UpdateUserAvatarService from "@modules/users/services/UpdateUserAvatarService";

class UsersController {
    public async authenticate(request: Request, response: Response): Promise<Response> {
        const { email, password } = request.body;

        const authenticateUserService = container.resolve(AuthenticateUserService);

        const { user, token } = await authenticateUserService.execute({ email, password });

        return response.status(200).json({ user, token });
    }

    public async create(request: Request, response: Response): Promise<Response> {
        const { name, email, password, age, about_me, is_admin } = request.body;

        const createUserService = container.resolve(CreateUserService);

        const user = await createUserService.execute({ name, email, password, age, about_me, is_admin });

        return response.json(user);
    }

    public async update(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const { name, email, password, age, about_me, is_admin } = request.body;

        const updateUserService = container.resolve(UpdateUserService);

        const user = await updateUserService.execute({
            id,
            name,
            email,
            password,
            age,
            about_me,
            is_admin
        });

        return response.status(200).json(user);
    }

    public async updateAvatar(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const { filename } = request.file;

        const updateUserAvatarService = container.resolve(UpdateUserAvatarService);

        await updateUserAvatarService.execute({ user_id: id, avatar_file: filename });

        return response.status(204).send();
    }

    public async get(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const getUserService = container.resolve(GetUserService);

        const user = await getUserService.execute({ id });

        return response.status(200).json(user);
    }

    public async list(request: Request, response: Response): Promise<Response> {
        const listAllUsersService = container.resolve(ListAllUsersService);

        const users = await listAllUsersService.execute();

        return response.status(200).json(users);
    }

    public async delete(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const deleteUserService = container.resolve(DeleteUserService);

        await deleteUserService.execute({ id });

        return response.status(204).send();
    }
}

export default UsersController;