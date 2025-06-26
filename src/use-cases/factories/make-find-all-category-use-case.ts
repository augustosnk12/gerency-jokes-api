import { PrismaCategoriesRepository } from "@/repositories/prisma/prisma-categories-repository";
import { FindAllCategoryUseCase } from "../categories-use-cases/find-all-category-use-case";

export function makeFindAllCategoryUseCase() {
  const categoriesRepository = new PrismaCategoriesRepository();
  const findAllCategoryUseCase = new FindAllCategoryUseCase(
    categoriesRepository
  );

  return findAllCategoryUseCase;
}
