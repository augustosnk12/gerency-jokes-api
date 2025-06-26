import { CategoriesRepository } from "@/repositories/categories-repository";
import { Category } from "@prisma/client";

interface UpdateCategoryUseCaseRequest {
  id: string;
  name: string;
  description: string;
}

interface UpdateCategoryUseCaseResponse {
  category: Category | undefined;
}

export class UpdateCategoryUseCase {
  constructor(private categoriesRepository: CategoriesRepository) {}

  async execute(
    data: UpdateCategoryUseCaseRequest
  ): Promise<UpdateCategoryUseCaseResponse> {
    const category = await this.categoriesRepository.update(data.id, data);

    return { category };
  }
}
