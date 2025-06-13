import fastify from "fastify";

import { categoriesRoutes } from "./http/controllers/categories/routes";

export const app = fastify();

app.register(categoriesRoutes)
