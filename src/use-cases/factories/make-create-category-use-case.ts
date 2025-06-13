import {PrismaCategoriesRepository} from "@/repositories/prisma/prisma-categories-repository";
import {CreateCategoryUseCase} from "@/use-cases/categories-use-cases/create-category-use-case";

export function makeCreateCategoryUseCase() {
    const categoriesRepository = new PrismaCategoriesRepository()
    return new CreateCategoryUseCase(categoriesRepository)
}