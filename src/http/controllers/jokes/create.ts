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
    category_id: z.string().uuid().optional(),
  });

  const { text, answer, category_id } = createJokeBodySchema.parse(request.body);

  const createJokeUseCase = makeCreateJokeUseCase();

  const data: any = {
    text,
    answer,
    status: "PENDING"
  };

  if (category_id) {
    data.category = { connect: { id: category_id } };
  }

  await createJokeUseCase.execute({
    data,
  });

  return response.status(201).send();
}
