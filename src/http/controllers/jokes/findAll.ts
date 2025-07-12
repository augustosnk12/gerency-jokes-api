import { FastifyReply, FastifyRequest } from "fastify";
import { makeFindAllJokesUseCase } from "@/use-cases/factories/make-find-all-joke-use-case";

export async function findAllJokes(_: FastifyRequest, response: FastifyReply) {
  const findAllJokesUseCase = makeFindAllJokesUseCase();
  const { jokes } = await findAllJokesUseCase.execute();

  return response.status(200).send({ jokes });
}
