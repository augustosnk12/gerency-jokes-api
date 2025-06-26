import { expect, describe, it, beforeEach } from "vitest";

import { InMemoryCategoryRepository } from "@/repositories/in-memory/in-memory-category-repository";
import { UpdateCategoryUseCase } from "@/use-cases/categories-use-cases/update-category-use-case";

let categoriesRepository: InMemoryCategoryRepository;
let sut: UpdateCategoryUseCase;

describe("Update Category Use Case", () => {
  beforeEach(() => {
    categoriesRepository = new InMemoryCategoryRepository();
    sut = new UpdateCategoryUseCase(categoriesRepository);
  });

  it("should be able to update a category", async () => {
    const category = await categoriesRepository.create({
      name: "Category 1",
      description: "Dark Humor",
    });
    const updatedCategory = await sut.execute({
      id: category.id,
      name: "Category 2",
      description: "Dark Humor",
    });
    expect(updatedCategory?.category?.name).toEqual("Category 2");
  });

  it("should not be able to update a category", async () => {
    const category = await categoriesRepository.create({
      name: "Category 1",
      description: "Dark Humor",
    });
    const updatedCategory = await sut.execute({
      id: "fake-id",
      name: "Category 2",
      description: "Dark Humor",
    });
    expect(updatedCategory?.category).toBeUndefined();
  });
});
