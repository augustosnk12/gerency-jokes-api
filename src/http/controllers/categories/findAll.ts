import { makeFindAllCategoryUseCase } from "@/use-cases/factories/make-find-all-category-use-case";
import { FastifyReply, FastifyRequest } from "fastify";

export async function findAllCategories(
  _: FastifyRequest,
  response: FastifyReply
) {
  const findAllCategoriesUseCase = makeFindAllCategoryUseCase();
  const { categories } = await findAllCategoriesUseCase.execute();

  return response.status(200).send({ categories });
}
