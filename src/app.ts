import fastify from "fastify";
import { ZodError } from "zod";
import { env } from "./env";
import { categoriesRoutes } from "./http/controllers/categories/routes";

export const app = fastify();

app.register(categoriesRoutes);

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: "Validation error.", issues: error.format() });
  }

  // if (env.NODE_ENV !== 'production') {
  console.error({error, zod: error instanceof ZodError});
  // } else {
  // TODO: Here we should log to a external tool like DataDog/NewRelic/Sentry
  // }

  return reply.status(500).send({ message: "Internal server error." });
});
