import { FastifyReply, FastifyRequest } from "fastify";
import { makeDeleteCategoryUseCase } from "@/use-cases/factories/make-delete-category-use-case";

interface DeleteCategoryParams {
  id: string;
}

export async function deleteCategory(
  request: FastifyRequest<{ Params: DeleteCategoryParams }>,
  response: FastifyReply
) {
  const deleteCategoryUseCase = makeDeleteCategoryUseCase();
  await deleteCategoryUseCase.execute({ id: request.params.id });

  return response.status(200).send();
}
