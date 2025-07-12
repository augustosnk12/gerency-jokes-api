import { JokesRepository } from "@/repositories/jokes-repository";
import { Prisma } from "@prisma/client";
import { Joke } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export class PrismaJokesRepository implements JokesRepository {
  async create(data: Prisma.JokeCreateInput): Promise<Joke> {
    const joke = await prisma.joke.create({ data });

    return joke;
  }

  async findAll(): Promise<Joke[]> {
    const jokes = await prisma.joke.findMany();

    return jokes;
  }

  async findById(id: string): Promise<Joke | null> {
    const joke = await prisma.joke.findUnique({ where: { id } });

    return joke;
  }

  async delete(id: string): Promise<void> {
    await prisma.joke.delete({ where: { id } });
  }
}
