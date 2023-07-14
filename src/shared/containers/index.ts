import CategoriesRepository from '@modules/categories/infra/typeorm/repositories/CategoriesRepository';
import ICategoriesRepository from '@modules/categories/repositories/ICategoriesRepository';
import { container } from 'tsyringe';

container.registerSingleton<ICategoriesRepository>(
    'CategoriesRepository',
    CategoriesRepository
);

