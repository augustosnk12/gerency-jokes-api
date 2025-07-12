import { Joke } from "@prisma/client";
import { JokesRepository } from "@/repositories/jokes-repository";

export class FindJokeByIdUseCase {
  constructor(private jokesRepository: JokesRepository) {}

  async execute(id: string): Promise<Joke | null> {
    const joke = await this.jokesRepository.findById(id);

    return joke;
  }
}