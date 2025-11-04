
import { CategoriesRepository } from "@/repositories/categories-repository";
import { Category } from "@prisma/client";

export class FindCategoryByNameUseCase {
  constructor(private categoriesRepository: CategoriesRepository) {}

  async execute(name: string): Promise<Category | null> {
    const category = await this.categoriesRepository.findByName(name);

    return category;
  }
}