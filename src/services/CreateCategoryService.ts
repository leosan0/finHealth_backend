import { getRepository } from 'typeorm';

import Category from '../models/Category';

interface RequestDTO {
  title: string;
}

class CreateCategoryService {
  public async execute({ title }: RequestDTO): Promise<Category> {
    const categoryRepository = getRepository(Category);

    let category = await categoryRepository.findOne({
      where: {
        title,
      },
    });

    if (!category) {
      category = categoryRepository.create({
        title,
      });

      await categoryRepository.save(category);
    }

    return category;
  }
}

export default CreateCategoryService;
