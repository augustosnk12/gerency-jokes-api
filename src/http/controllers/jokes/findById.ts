import { FastifyReply, FastifyRequest } from "fastify";
import { makeFindJokeByIdUseCase } from "@/use-cases/factories/make-find-joke-by-id-use-case";

interface FindJokeByIdParams {
  id: string;
}

export async function findById(
  request: FastifyRequest<{ Params: FindJokeByIdParams }>,
  response: FastifyReply
) {
  const findJokeByIdUseCase = makeFindJokeByIdUseCase();
  const joke = await findJokeByIdUseCase.execute(request.params.id);

  return response.status(200).send({ joke });
}
