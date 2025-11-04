import { InMemoryCategoryRepository } from "@/repositories/in-memory/in-memory-category-repository";
import { FindCategoryByNameUseCase } from "@/use-cases/categories-use-cases/find-category-by-name-use-case";
import { expect, describe, it, beforeEach } from "vitest";

let categoriesRepository: InMemoryCategoryRepository;
let sut: FindCategoryByNameUseCase;

describe("Find Category By Name Use Case", () => {
  beforeEach(() => {
    categoriesRepository = new InMemoryCategoryRepository();
    sut = new FindCategoryByNameUseCase(categoriesRepository);
  });

  it("should be able to find a category by name", async () => {
    const createdCategory = await categoriesRepository.create({
      name: "Dark Humor",
      description: "Funny dark humor jokes",
    });

    const category = await sut.execute(createdCategory.name);
    
    expect(category).toEqual(
      expect.objectContaining({
        name: "Dark Humor",
        description: "Funny dark humor jokes",
      })
    );
  });

  it("should return null when category is not found", async () => {
    await categoriesRepository.create({
      name: "Dark Humor",
      description: "Funny dark humor jokes",
    });

    const category = await sut.execute("Non-existent Category");
    expect(category).toBeNull();
  });
});
