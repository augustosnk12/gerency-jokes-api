import { Joke, JokeStatus } from "@prisma/client";
import { Prisma } from "@prisma/client";
import { JokesRepository } from "@/repositories/jokes-repository";

export class InMemoryJokeRepository implements JokesRepository {
  public jokes: Joke[] = [];

  async create(data: Prisma.JokeCreateInput) {
    const joke = {
      id: "joke-1",
      text: data.text,
      answer: data.answer as string | null,
      categoryId: data.category.connect?.id as string,
      status: data.status as JokeStatus,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.jokes.push(joke);

    return joke;
  }

  async findAll() {
    return this.jokes;
  }

  async findById(id: string) {
    return this.jokes.find((joke) => joke.id === id) || null;
  }

  async delete(id: string) {
    this.jokes = this.jokes.filter((joke) => joke.id !== id);
  }
}
