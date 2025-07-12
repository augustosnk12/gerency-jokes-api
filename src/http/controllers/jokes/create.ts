import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { makeCreateJokeUseCase } from "@/use-cases/factories/make-create-joke-use-case";

export async function createJoke(
  request: FastifyRequest,
  response: FastifyReply
) {
  const createJokeBodySchema = z.object({
    text: z.string().min(2).max(255),
    answer: z.string().min(2).max(255).optional(),
    category_id: z.string().uuid(),
  });

  const { text, answer, category_id } = createJokeBodySchema.parse(request.body);

  const createJokeUseCase = makeCreateJokeUseCase();

  await createJokeUseCase.execute({
    data: { text, answer, category: { connect: { id: category_id } }, status: "PENDING" },
  });

  return response.status(201).send();
}
