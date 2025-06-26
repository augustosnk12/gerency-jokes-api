import { InMemoryCategoryRepository } from "@/repositories/in-memory/in-memory-category-repository";
import { FindAllCategoryUseCase } from "@/use-cases/categories-use-cases/find-all-category-use-case";
import { expect, describe, it, beforeEach } from "vitest";

let categoriesRepository: InMemoryCategoryRepository;
let sut: FindAllCategoryUseCase;

describe("Find All Category Use Case", () => {
  beforeEach(() => {
    categoriesRepository = new InMemoryCategoryRepository();
    sut = new FindAllCategoryUseCase(categoriesRepository);
  });

  it("should be able to find all categories", async () => {
    await categoriesRepository.create({
      name: "Category 1",
      description: "Dark Humor",
    });
    await categoriesRepository.create({
      name: "Category 2",
      description: "Dark Humor",
    });
    const { categories } = await sut.execute();
    expect(categories).toHaveLength(2);
  });

  it('should have found any categories', async () => {
    const { categories } = await sut.execute();
    expect(categories).toHaveLength(0);
  })
});
