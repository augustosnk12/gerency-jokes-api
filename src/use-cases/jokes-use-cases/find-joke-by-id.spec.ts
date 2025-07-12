import { InMemoryJokeRepository } from "@/repositories/in-memory/in-memory-joke-repository";
import { FindJokeByIdUseCase } from "@/use-cases/jokes-use-cases/find-joke-by-id";
import { describe, it, beforeEach, expect } from "vitest";

let jokesRepository: InMemoryJokeRepository;
let sut: FindJokeByIdUseCase;

describe("Find Joke By Id Use Case", () => {
  beforeEach(() => {
    jokesRepository = new InMemoryJokeRepository();
    sut = new FindJokeByIdUseCase(jokesRepository);
  });

  it("should be able to find a joke by id", async () => {
    const joke = await jokesRepository.create({
      text: "Joke 1",
      answer: "Answer 1",
      category: {
        connect: {
          id: "category-1",
        },
      },
      status: "PENDING",
    });
    const jokeById = await sut.execute(joke.id);
    expect(jokeById?.id).toEqual(expect.any(String));
  });

  it("should not be able to find a joke by id", async () => {
    const joke = await jokesRepository.create({
      text: "Joke 1",
      answer: "Answer 1",
      category: {
        connect: {
          id: "category-1",
        },
      },
      status: "PENDING",
    });
    const jokeById = await sut.execute("fake-id");
    expect(jokeById).toBeNull();
  });
});
