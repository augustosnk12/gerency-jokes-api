import {FastifyInstance} from "fastify";
import {createCategory} from "@/http/controllers/categories/create";
import {findAllCategories} from "@/http/controllers/categories/findAll";
import {findById} from "@/http/controllers/categories/findById";
import {updateCategory} from "@/http/controllers/categories/update";
import {deleteCategory} from "@/http/controllers/categories/delete";

export async function categoriesRoutes(app: FastifyInstance) {
    app.post('/categories', createCategory)
    app.get('/categories', findAllCategories)
    app.get('/categories/:id', findById)
    app.put('/categories/:id', updateCategory)
    app.delete('/categories/:id', deleteCategory)
}