import { FastifyInstance } from "fastify";
import { createJoke } from "@/http/controllers/jokes/create";
import { findAllJokes } from "@/http/controllers/jokes/findAll";
import { findById } from "@/http/controllers/jokes/findById";
import { deleteJoke } from "./delete";

export async function jokesRoutes(app: FastifyInstance) {
  app.post("/jokes", createJoke);
  app.get("/jokes", findAllJokes);
  app.get("/jokes/:id", findById);
  app.delete("/jokes/:id", deleteJoke);
}
