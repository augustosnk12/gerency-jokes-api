import { CategoriesRepository } from "@/repositories/categories-repository";

interface DeleteCategoryUseCaseRequest {
  id: string;
}

export class DeleteCategoryUseCase {
  constructor(private categoriesRepository: CategoriesRepository) {}

  async execute({ id }: DeleteCategoryUseCaseRequest): Promise<void> {
    await this.categoriesRepository.delete(id);
  }
}
