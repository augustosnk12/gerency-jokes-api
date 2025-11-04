import {Category, Prisma} from "@prisma/client";

export interface CategoriesRepository {
    create(data: Prisma.CategoryCreateInput): Promise<Category>;
    findById(id: string): Promise<Category | null>;
    findAll(): Promise<Category[] | null>;
    update(id: string, data: Prisma.CategoryUpdateInput): Promise<Category | undefined>;
    delete(id: string): Promise<void>;
    findByName(name: string): Promise<Category | null>;
}