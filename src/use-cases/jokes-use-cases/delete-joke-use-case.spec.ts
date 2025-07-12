import { InMemoryJokeRepository } from "@/repositories/in-memory/in-memory-joke-repository";
import { DeleteJokeUseCase } from "./delete-joke-use-case";
import { expect, describe, it, beforeEach } from "vitest";

let jokesRepository: InMemoryJokeRepository;
let sut: DeleteJokeUseCase;

describe("Delete Joke Use Case", () => {
  beforeEach(() => {
    jokesRepository = new InMemoryJokeRepository();
    sut = new DeleteJokeUseCase(jokesRepository);
  });

  it("should be able to delete a joke", async () => {
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
    await sut.execute({ id: joke.id });
    const jokeById = await jokesRepository.findById(joke.id);
    expect(jokeById).toBeNull();
  });
});
