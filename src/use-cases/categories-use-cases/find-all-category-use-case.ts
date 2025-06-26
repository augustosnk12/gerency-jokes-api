import { CategoriesRepository } from "@/repositories/categories-repository";
import { Category } from "@prisma/client";

interface FindAllCategoryUseCaseResponse {
  categories: Category[];
}

export class FindAllCategoryUseCase {
  constructor(private categoriesRepository: CategoriesRepository) {}

  async execute(): Promise<FindAllCategoryUseCaseResponse> {
    const categories = await this.categoriesRepository.findAll() || [];

    return {
      categories,
    };
  }
}
