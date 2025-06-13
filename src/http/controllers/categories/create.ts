import {FastifyReply, FastifyRequest} from "fastify";
import {z} from "zod";
import {makeCreateCategoryUseCase} from "@/use-cases/factories/make-create-category-use-case";

export async function createCategory(request: FastifyRequest, response: FastifyReply) {
    const createCategoryBodySchema = z.object({
        name: z.string().min(2).max(50),
        description: z.string().min(10).max(255),
    })

    const {name, description} = createCategoryBodySchema.parse(request.body)

    const createCategoryUseCase = makeCreateCategoryUseCase()

    await createCategoryUseCase.execute({name, description})

    return response.status(201).send()
}