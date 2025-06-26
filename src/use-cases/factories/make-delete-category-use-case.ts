import {PrismaCategoriesRepository} from "@/repositories/prisma/prisma-categories-repository";
import {DeleteCategoryUseCase} from "../categories-use-cases/delete-category-use-case";

export function makeDeleteCategoryUseCase() {
    const categoriesRepository = new PrismaCategoriesRepository()
    return new DeleteCategoryUseCase(categoriesRepository)
}