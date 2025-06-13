import {CategoriesRepository} from "@/repositories/categories-repository";
import {Prisma} from "@prisma/client";
import {prisma} from "@/lib/prisma";

export class PrismaCategoriesRepository implements CategoriesRepository {
    async create(data: Prisma.CategoryCreateInput) {
        const category = await prisma.category.create({data});

        return category
    }

    async findById(id: string) {
        return null
    }

    async findAll() {
        return null
    }
}