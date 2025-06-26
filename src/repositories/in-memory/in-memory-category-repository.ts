import { Category, Prisma } from "@prisma/client";
import { CategoriesRepository } from "@/repositories/categories-repository";

export class InMemoryCategoryRepository implements CategoriesRepository {
  public categories: Category[] = [];

  async create(data: Prisma.CategoryCreateInput) {
    const category = {
      id: "category-1",
      name: data.name,
      description: data.description,
    };

    this.categories.push(category);

    return category;
  }

  async findById(id: string) {
    const category = this.categories.find((category) => category.id === id);
    return category || null;
  }

  async findAll() {
    return this.categories;
  }

  async update(id: string, data: Prisma.CategoryUpdateInput) {
    const category = this.categories.find((category) => category.id === id);

    if (category) {
      category.name = data.name as string;
      category.description = data.description as string;
      return category;
    }

    return category;
  }

  async delete(id: string) {
    this.categories = this.categories.filter((category) => category.id !== id);
  }
}
