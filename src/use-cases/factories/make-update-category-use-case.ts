import {PrismaCategoriesRepository} from "@/repositories/prisma/prisma-categories-repository";
import {UpdateCategoryUseCase} from "@/use-cases/categories-use-cases/update-category-use-case";

export function makeUpdateCategoryUseCase() {
    const categoriesRepository = new PrismaCategoriesRepository()
    return new UpdateCategoryUseCase(categoriesRepository)
}