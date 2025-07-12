import { expect, describe, it, beforeEach } from "vitest";

import { InMemoryJokeRepository } from "@/repositories/in-memory/in-memory-joke-repository";
import { CreateJokeUseCase } from "@/use-cases/jokes-use-cases/create-joke-use-case";
import { InMemoryCategoryRepository } from "@/repositories/in-memory/in-memory-category-repository";
import { CreateCategoryUseCase } from "@/use-cases/categories-use-cases/create-category-use-case";

let jokesCategory: InMemoryJokeRepository;
let sut: CreateJokeUseCase;

let categoriesRepository: InMemoryCategoryRepository;
let createCategory: CreateCategoryUseCase;

describe("Create Joke Use Case", () => {
  beforeEach(() => {
    categoriesRepository = new InMemoryCategoryRepository();
    createCategory = new CreateCategoryUseCase(categoriesRepository);
    jokesCategory = new InMemoryJokeRepository();
    sut = new CreateJokeUseCase(jokesCategory, categoriesRepository);
  });

  it("should be able to create a joke", async () => {
    const category = await createCategory.execute({
      name: "Category 1",
      description: "Dark Humor",
    });

    const { joke } = await sut.execute({
      data: {
        text: "Joke 1",
        answer: "Answer 1",
        category: {
          connect: {
            id: category.category.id,
          },
        },
        status: "PENDING",
      },
    });
    expect(joke.id).toEqual(expect.any(String));
    expect(joke.categoryId).toEqual(category.category.id);
  });

  it("should not be able to create a joke with a non existing category", async () => {
    await expect(() =>
      sut.execute({
        data: {
          text: "Joke 1",
          answer: "Answer 1",
          category: {
            connect: {
              id: "non-existing-category-id",
            },
          },
          status: "PENDING",
        },
      })
    ).rejects.toThrow();
  });
});
