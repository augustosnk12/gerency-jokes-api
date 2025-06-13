import {Category, Prisma} from "@prisma/client";
import {CategoriesRepository} from "@/repositories/categories-repository";

export class InMemoryCategoryRepository implements CategoriesRepository {
    public categories: Category[] = [];

    async create(data: Prisma.CategoryCreateInput) {
        const category = {
            id: 'category-1',
            name: data.name,
            description: data.description
        }

        this.categories.push(category);

        return category
    }

    async findById(id: string) {
        return null
    }
    async findAll() {
        return null;
    }

}