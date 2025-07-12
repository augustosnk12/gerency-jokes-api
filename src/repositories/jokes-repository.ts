import { Joke, Prisma } from "@prisma/client";

export interface JokesRepository {
  create(data: Prisma.JokeCreateInput): Promise<Joke>;
  findAll(): Promise<Joke[]>;
  findById(id: string): Promise<Joke | null>;
  delete(id: string): Promise<void>;
}
