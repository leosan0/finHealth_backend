// import AppError from '../errors/AppError';
import { getCustomRepository } from 'typeorm';

import CategoriesRepository from '../repositories/CategoriesRepository';
import AppError from '../errors/AppError';

class DeleteCategoryService {
  public async execute(id: string): Promise<void> {
    const categoriesRepository = getCustomRepository(CategoriesRepository);

    const category = await categoriesRepository.findOne(id);

    if (!category) {
      throw new AppError('Category does not exist');
    }

    await categoriesRepository.remove(category);
  }
}

export default DeleteCategoryService;
