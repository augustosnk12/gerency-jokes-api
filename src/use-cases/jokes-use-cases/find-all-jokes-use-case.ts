import { Joke } from "@prisma/client";
import { JokesRepository } from "@/repositories/jokes-repository";

interface FindAllJokesUseCaseResponse {
  jokes: Joke[];
}

export class FindAllJokesUseCase {
  constructor(private jokesRepository: JokesRepository) {}

  async execute(): Promise<FindAllJokesUseCaseResponse> {
    const jokes = (await this.jokesRepository.findAll()) || [];

    return {
      jokes,
    };
  }
}
