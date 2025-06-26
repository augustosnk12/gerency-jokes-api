import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeUpdateCategoryUseCase } from "@/use-cases/factories/make-update-category-use-case";

interface UpdateCategoryParams {
  id: string;
}

export async function updateCategory(
  request: FastifyRequest<{ Params: UpdateCategoryParams }>,
  response: FastifyReply
) {
  const updateCategoryBodySchema = z.object({
    name: z.string().min(2).max(50),
    description: z.string().min(5).max(255),
  });

  const { name, description } = updateCategoryBodySchema.parse(request.body);

  const updateCategoryUseCase = makeUpdateCategoryUseCase();

  const category = await updateCategoryUseCase.execute({
    id: request.params.id,
    name,
    description,
  });

  return response.status(200).send({ category });
}
