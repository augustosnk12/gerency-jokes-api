import { InMemoryJokeRepository } from "@/repositories/in-memory/in-memory-joke-repository";
import { FindAllJokesUseCase } from "@/use-cases/jokes-use-cases/find-all-jokes-use-case";
import { describe, it, beforeEach, expect } from "vitest";

let jokesRepository: InMemoryJokeRepository;
let sut: FindAllJokesUseCase;

describe("Find All Jokes Use Case", () => {
  beforeEach(() => {
    jokesRepository = new InMemoryJokeRepository();
    sut = new FindAllJokesUseCase(jokesRepository);
  });

  it("should be able to find all jokes", async () => {
    await jokesRepository.create({
      text: "Joke 1",
      answer: "Answer 1",
      category: {
        connect: {
          id: "category-1",
        },
      },
      status: "PENDING",
    });
    await jokesRepository.create({
      text: "Joke 2",
      answer: "Answer 2",
      category: {
        connect: {
          id: "category-2",
        },
      },
      status: "PENDING",
    });
    const { jokes } = await sut.execute();
    expect(jokes).toHaveLength(2);
  });
});