import { PrismaJokesRepository } from "@/repositories/prisma/prisma-jokes-repository";
import { CreateJokeUseCase } from "@/use-cases/jokes-use-cases/create-joke-use-case";
import { PrismaCategoriesRepository } from "@/repositories/prisma/prisma-categories-repository";

export function makeCreateJokeUseCase() {
  const jokesRepository = new PrismaJokesRepository();
  const categoriesRepository = new PrismaCategoriesRepository();
  return new CreateJokeUseCase(jokesRepository, categoriesRepository);
}
