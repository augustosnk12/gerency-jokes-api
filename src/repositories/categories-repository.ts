import {Category, Prisma} from "@prisma/client";

export interface CategoriesRepository {
    create(data: Prisma.CategoryCreateInput): Promise<Category>;
    findById(id: string): Promise<Category | null>;
    findAll(): Promise<Category[] | null>;
}