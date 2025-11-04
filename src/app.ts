import fastify from "fastify";
import { ZodError } from "zod";
import { categoriesRoutes } from "./http/controllers/categories/routes";
import { jokesRoutes } from "./http/controllers/jokes/routes";

export const app = fastify();

app.register(categoriesRoutes);
app.register(jokesRoutes);

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: "Validation error.", issues: error.format() });
  }

  console.error({error, zod: error instanceof ZodError});

  return reply.status(500).send({ message: "Internal server error." });
});
