import { container } from 'tsyringe';

import '@modules/users/providers';

import CategoriesRepository from '@modules/categories/infra/typeorm/repositories/CategoriesRepository';
import ICategoriesRepository from '@modules/categories/repositories/ICategoriesRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IIngredientsRepository from '@modules/recipes/repositories/IIngredientsRepository';
import IngredientsRepository from '@modules/recipes/infra/typeorm/repositories/IngredientsRepository';
import IRecipesRepository from '@modules/recipes/repositories/IRecipesRepository';
import RecipesRepository from '@modules/recipes/infra/typeorm/repositories/RecipesRepository';

container.registerSingleton<ICategoriesRepository>(
    'CategoriesRepository',
    CategoriesRepository
);

container.registerSingleton<IUsersRepository>(
    'UsersRepository',
    UsersRepository
);

container.registerSingleton<IIngredientsRepository>(
    'IngredientsRepository',
    IngredientsRepository
);

container.registerSingleton<IRecipesRepository>(
    'RecipesRepository',
    RecipesRepository
);