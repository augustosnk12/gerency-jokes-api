import { PrismaJokesRepository } from "@/repositories/prisma/prisma-jokes-repository";
import { FindAllJokesUseCase } from "../jokes-use-cases/find-all-jokes-use-case";

export function makeFindAllJokesUseCase() {
  const jokesRepository = new PrismaJokesRepository();
  const findAllJokesUseCase = new FindAllJokesUseCase(
    jokesRepository
  );

  return findAllJokesUseCase;
}
