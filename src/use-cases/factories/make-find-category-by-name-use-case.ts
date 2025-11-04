import { PrismaCategoriesRepository } from "@/repositories/prisma/prisma-categories-repository";
import { FindCategoryByNameUseCase } from "@/use-cases/categories-use-cases/find-category-by-name-use-case";

export function makeFindCategoryByNameUseCase() {
  const categoriesRepository = new PrismaCategoriesRepository();
  return new FindCategoryByNameUseCase(categoriesRepository);
}
