import { CategoriesRepository } from "@/repositories/categories-repository";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export class PrismaCategoriesRepository implements CategoriesRepository {
  async create(data: Prisma.CategoryCreateInput) {
    const category = await prisma.category.create({ data });

    return category;
  }

  async findById(id: string) {
    return prisma.category.findUnique({ where: { id } });
  }

  async findAll() {
    const categories = await prisma.category.findMany();

    return categories;
  }

  async update(id: string, data: Prisma.CategoryUpdateInput) {
    const category = await prisma.category.update({
      where: { id },
      data,
    });

    return category;
  }

  async delete(id: string) {
    await prisma.category.delete({ where: { id } });
  }

  async findByName(name: string) {
    return prisma.category.findFirstOrThrow({ 
      where: { 
        name: {
          equals: name,
          mode: 'insensitive'
        }
      } 
    });
  }
}
