import { FastifyReply, FastifyRequest } from "fastify";
import { makeDeleteJokeUseCase } from "@/use-cases/factories/make-delete-joke-use-case";

interface DeleteJokeParams {
  id: string;
}

export async function deleteJoke(
  request: FastifyRequest<{ Params: DeleteJokeParams }>,
  response: FastifyReply
) {
  const deleteJokeUseCase = makeDeleteJokeUseCase();
  await deleteJokeUseCase.execute({ id: request.params.id });

  return response.status(200).send();
}
