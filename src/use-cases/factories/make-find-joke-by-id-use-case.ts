import { PrismaJokesRepository } from "@/repositories/prisma/prisma-jokes-repository";
import { FindJokeByIdUseCase } from "../jokes-use-cases/find-joke-by-id";

export function makeFindJokeByIdUseCase() {
  const jokesRepository = new PrismaJokesRepository();
  const findJokeByIdUseCase = new FindJokeByIdUseCase(jokesRepository);

  return findJokeByIdUseCase;
}
