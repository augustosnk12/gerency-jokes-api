import { CategoriesRepository } from "@/repositories/categories-repository";
import { Category } from "@prisma/client";

export class FindCategoryByIdUseCase {
  constructor(private categoriesRepository: CategoriesRepository) {}

  async execute(id: string): Promise<Category | null> {
    const category = await this.categoriesRepository.findById(id);

    return category;
  }
}
