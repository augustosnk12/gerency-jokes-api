import { JokesRepository } from "@/repositories/jokes-repository";
import { CategoriesRepository } from "@/repositories/categories-repository";
import { Joke } from "@prisma/client";
import { Prisma } from "@prisma/client";

interface CreateJokeUseCaseRequest {
  data: Prisma.JokeCreateInput;
}

interface CreateJokeUseCaseResponse {
  joke: Joke;
}

export class CreateJokeUseCase {
  constructor(
    private jokesRepository: JokesRepository,
    private categoriesRepository: CategoriesRepository
  ) {}

  async execute({
    data,
  }: CreateJokeUseCaseRequest): Promise<CreateJokeUseCaseResponse> {
    const categoryId = data.category?.connect?.id;

    if (!categoryId) {
      throw new Error("Category ID is required");
    }

    const category = await this.categoriesRepository.findById(
      categoryId
    );

    if (!category) {
      throw new Error("Category not found");
    }
    const joke = await this.jokesRepository.create(data);

    return { joke };
  }
}
