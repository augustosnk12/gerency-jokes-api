import { InMemoryCategoryRepository } from "@/repositories/in-memory/in-memory-category-repository";
import { FindCategoryByIdUseCase } from "@/use-cases/categories-use-cases/find-category-by-id-use-case";
import { expect, describe, it, beforeEach } from "vitest";

let categoriesRepository: InMemoryCategoryRepository;
let sut: FindCategoryByIdUseCase;

describe("Find Category By Id Use Case", () => {
  beforeEach(() => {
    categoriesRepository = new InMemoryCategoryRepository();
    sut = new FindCategoryByIdUseCase(categoriesRepository);
  });

  it("should be able to find a category by id", async () => {
    const category = await categoriesRepository.create({
      name: "Category 1",
      description: "Dark Humor",
    });

    const categoryById = await sut.execute(category.id);
    expect(categoryById?.id).toEqual(expect.any(String));
  });

  it("should not be able to find a category by id", async () => {
    await categoriesRepository.create({
      name: "Category 1",
      description: "Dark Humor",
    });

    const categoryById = await sut.execute("fake-id");
    expect(categoryById).toBeNull();
  });
});
