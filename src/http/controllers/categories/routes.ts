import {FastifyInstance} from "fastify";
import {createCategory} from "@/http/controllers/categories/create";

export async function categoriesRoutes(app: FastifyInstance) {
    app.post('/categories', createCategory)
}