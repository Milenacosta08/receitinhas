import { Router } from 'express';

import categoriesRoutes from '@modules/categories/infra/http/routes/categories.routes';
import usersRoutes from '@modules/users/infra/http/routes/users.routes';
import ingredientsRoutes from '@modules/recipes/infra/http/routes/ingredients.routes';
import recipesRouter from '@modules/recipes/infra/http/routes/recipes.routes';

const router = Router();

router.use("/categories", categoriesRoutes);
router.use("/users", usersRoutes);
router.use("/recipes", recipesRouter);
router.use("/ingredients", ingredientsRoutes);

export { router };