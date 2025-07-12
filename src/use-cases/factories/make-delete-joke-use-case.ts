import {PrismaJokesRepository} from "@/repositories/prisma/prisma-jokes-repository";
import {DeleteJokeUseCase} from "../jokes-use-cases/delete-joke-use-case";

export function makeDeleteJokeUseCase() {
    const jokesRepository = new PrismaJokesRepository()
    return new DeleteJokeUseCase(jokesRepository)
}