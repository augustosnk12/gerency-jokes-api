import { makeFindCategoryByIdUseCase } from "@/use-cases/factories/make-find-category-by-id-use-case";
import { FastifyReply, FastifyRequest } from "fastify";

interface FindCategoryByIdParams {
  id: string;
}

export async function findById(
  request: FastifyRequest<{ Params: FindCategoryByIdParams }>,
  response: FastifyReply
) {
  const findCategoryByIdUseCase = makeFindCategoryByIdUseCase();
  const category = await findCategoryByIdUseCase.execute(request.params.id);

  return response.status(200).send({ category });
}
