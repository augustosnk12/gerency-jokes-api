import { expect, describe, it, beforeEach } from "vitest";

import { InMemoryCategoryRepository } from "@/repositories/in-memory/in-memory-category-repository";
import { DeleteCategoryUseCase } from "./delete-category-use-case";

let categoriesRepository: InMemoryCategoryRepository;
let sut: DeleteCategoryUseCase;

describe("Delete Category Use Case", () => {
  beforeEach(() => {
    categoriesRepository = new InMemoryCategoryRepository();
    sut = new DeleteCategoryUseCase(categoriesRepository);
  });

  it("should be able to delete a category", async () => {
    const category = await categoriesRepository.create({
      name: "Category 1",
      description: "Dark Humor",
    });
    await sut.execute({ id: category.id });
    const categoryById = await categoriesRepository.findById(category.id);
    expect(categoryById).toBeNull();
  });
});
