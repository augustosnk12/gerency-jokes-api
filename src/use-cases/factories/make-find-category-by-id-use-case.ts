import { PrismaCategoriesRepository } from "@/repositories/prisma/prisma-categories-repository";
import { FindCategoryByIdUseCase } from "../categories-use-cases/find-category-by-id-use-case";

export function makeFindCategoryByIdUseCase() {
  const categoriesRepository = new PrismaCategoriesRepository();
  const findCategoryByIdUseCase = new FindCategoryByIdUseCase(
    categoriesRepository
  );

  return findCategoryByIdUseCase;
}
