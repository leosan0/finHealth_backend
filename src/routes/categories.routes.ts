import { Router } from 'express';

import { getCustomRepository } from 'typeorm';

import CreateCategoryService from '../services/CreateCategoryService';
import CategoriesRepository from '../repositories/CategoriesRepository';
import DeleteCategoryService from '../services/DeleteCategoryService';

const categoriesRouter = Router();

categoriesRouter.get('/', async (request, response) => {
  const categoriesRepository = getCustomRepository(CategoriesRepository);

  const categories = await categoriesRepository.find();

  return response.json(categories);
});

categoriesRouter.post('/', async (request, response) => {
  const { title } = request.body;

  const createCategory = new CreateCategoryService();

  const category = await createCategory.execute({
    title,
  });

  return response.json(category);
});

categoriesRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const deleteCategory = new DeleteCategoryService();

  await deleteCategory.execute(id);

  return response.status(204).send();
});

// categoriesRouter.post(
//   '/import',
//   upload.single('file'),
//   async (request, response) => {
//     const importCategories = new ImportCategoriesService();

//     const categories = await importCategories.execute(request.file.path);

//     return response.json(categories);
//   },
// );

export default categoriesRouter;
