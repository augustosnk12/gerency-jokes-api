import { JokesRepository } from "@/repositories/jokes-repository";

interface DeleteJokeUseCaseRequest {
  id: string;
}

export class DeleteJokeUseCase {
  constructor(private jokesRepository: JokesRepository) {}

  async execute({ id }: DeleteJokeUseCaseRequest): Promise<void> {
    await this.jokesRepository.delete(id);
  }
}
