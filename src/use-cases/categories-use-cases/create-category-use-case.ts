import {CategoriesRepository} from "@/repositories/categories-repository";
import {Category} from "@prisma/client";

interface CreateCategoryUseCaseRequest {
    name: string;
    description: string;
}

interface CreateCategoryUseCaseResponse {
    category: Category;
}

export class CreateCategoryUseCase {
    constructor(private categoriesRepository: CategoriesRepository) {
    }

    async execute(data: CreateCategoryUseCaseRequest): Promise<CreateCategoryUseCaseResponse> {
        const category = await this.categoriesRepository.create(data);

        return {category};
    }
}